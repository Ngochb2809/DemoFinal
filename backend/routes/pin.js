const express = require('express');
const router = express.Router();
const Category = require("../models/Category");
const Pin = require("../models/Pin");
const Package = require("../models/Package");
const { verifyToken , checkAdmin} = require("../middlewares/auth");
//create a pin
router.post("/pinCreate", async (req, res) => {
    const newPin = new Pin(req.body);
    try {
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all pins
router.get("/pins", async (req, res) => {
    try {
        const pins = await Pin.find();
        res.status(200).json(pins);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/pin/delete/:id', verifyToken, checkAdmin, async (req, res) => {
    try {
        const pin = req.params.id;
        const deletedPin = await Pin.findByIdAndDelete(pin);

        if (!deletedPin) {
            res.status(404).json({ success: false, error: "Pin not found" });
            return;
        }
        res.status(200).json({ success: true, message: "pin deleted successfully" });
    } catch (error) {
        console.error("Error while deleting category:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

router.get("/categories", async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get("/category/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        const pinscategory = await Pin.find({category: categoryId});
        res.status(200).json(pinscategory);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/pin/comment/:id', verifyToken, async (req, res, next) => {
    const accountId = req.accountId._id;
    const { comment } = req.body;
    const pinId = req.params.id;
    const pinrating = await Pin.findById(pinId);
    const pinrate = req.body.rate;
    try {
        const existingComment = await Pin.findById(pinId, {
            comments: { $elemMatch: { postedBy: accountId } } // Check comments array for user's id
        });
      
        // if (existingComment.comments.length > 0) {
        //     return res.status(400).json({ success: false, message: 'You have already rated on this pin.' });
        // }

        // pinrating.totalrating = pinrating.totalrating + pinrate;
        // pinrating.totalpeoplerating = pinrating.totalpeoplerating + 1;
        // pinrating.averagerate = pinrating.totalrating / pinrating.totalpeoplerating;
        
        // await pinrating.save();

        const pinComment = await Pin.findByIdAndUpdate(req.params.id, {
          $push: { comments: { text: comment, postedBy: accountId } }
        },
          { new: true }
        );
        const pin = await Pin.findById(pinComment._id).populate('comments.postedBy', 'username email');
        res.status(200).json({success: true, pin});
    } catch (err) {
        res.status(500).json(err);
    }
});



//Nếu lỗi thì dùng api dưới

router.put('/pin/rate/:id', verifyToken, async (req, res) => {
    try {
        debugger;
        const pinId = req.params.id;
        const pin = await Pin.findById(pinId);
        
        const accountId = req.user._id; // Assuming accountId is obtained from the token
        console,log(accountId);
        const existingRating = pin.ratings.find(rating => rating.postedBy.toString() === accountId);
        console.log(existingRating);
        if (existingRating) {
            return res.status(400).json({ success: false, message: 'You have already rated on this pin.' });
        }

        const pinrate = req.body.rate;
        pin.totalrating = pin.totalrating + pinrate;
        pin.totalpeoplerating = pin.totalpeoplerating + 1;
        pin.averagerate = pin.totalrating / pin.totalpeoplerating;

        // Add the new rating to the ratings array
        pin.ratings.push({ rate: pinrate, postedBy: accountId });

        await pin.save();
        res.json({ success: true, message: "Pin updated successfully" });

    } catch (err) {
        res.status(500).json(err);
    }
});


router.get("pin/package/:id", async (req, res) => {
    try {
        const pinId = req.params.id;
        const pin = await Pin.findById(pinId);
        const packages = await Package.find();

        const PackageId = req.body.selectedPackage;
        const selectedPackage = await Package.findById(PackageId);

        const addTime = selectedPackage.time;
        const timeToAddInMilliseconds = addTime * 60 * 60 * 1000;

        pin.time = new Date();
        pin.time = pin.time.getTime() + timeToAddInMilliseconds;

        await pin.save();

        res.status(200).json(packages);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/popular", async (req, res) => {
    try {
        const pin = await Pin.find();
        if (pin) {
            const now = new Date();
            const pinData = await pin.filter(Pin => Pin.time >= now.getTime());
            if (pinData) {
                res.status(200).json({success: true, pinData});
            } else {
                res.status(404).json({success: false, error: "No popular restaurant"});
                return;
            }
        } else {
            res.status(404).json({success: false, error: "No restaurant"});
                return;
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
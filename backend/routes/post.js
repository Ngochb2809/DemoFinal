const express = require('express');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const BloggerModel = require('../models/Blogger');

const router = express.Router();

const { verifyToken, checkBlogger } = require('../middlewares/auth');


router.post('/post', verifyToken, checkBlogger , uploadMiddleware.single('file'), async (req,res) => {
  const {originalname,path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath);

    const accountId = req.data._id;
    const blogger = await BloggerModel.findOne({accountId: accountId})
    const {title,summary,content} = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover:newPath,
      author:blogger.id,
    });
    res.json(postDoc);

});

router.put('/post', verifyToken, checkBlogger , uploadMiddleware.single('file'), async (req,res) => {
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  }
    const accountId = req.data._id;
    const blogger = await BloggerModel.findOne({accountId: accountId})
    const {id,title,summary,content} = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(blogger.name);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
    res.json(postDoc);

});

router.get('/post', async (req,res) => {
  res.json(
    await Post.find()
      .populate('author', ['email'])
      .sort({createdAt: -1})
      .limit(20)
  );
});

router.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['email']);
  res.json(postDoc);
})


module.exports = router;
const express = require('express');
const router = express.Router();
const Map = require('../models/Map');

router.get('/map-config', (req, res) => {
    const mapConfig  = {
        // Your map configuration (center, zoom, etc.)
        center: { lat: 40.7128, lng: -74.0059 }, // Example coordinates (New York City)
        zoom: 11,
      };
      res.json(mapConfig);
});

module.exports = router;
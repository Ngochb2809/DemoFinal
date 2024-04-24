const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const MapSchema = new Schema({
  lat: {type: Number, required: true},
  lng: {type: Number, required: true},
  name: {type: String, required: true},
  image: {type: String, required: true},
  addreress: {type: String, required: true},
  information: {type: String, required: true},
  contact: {type: String, required: true},
});

const MapModel = model('Map', MapSchema);

module.exports = MapModel;
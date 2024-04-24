const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const AccountSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {
    type: String,
    required: true
  }
});

const AccountModel = model('Account', AccountSchema);

module.exports = AccountModel;
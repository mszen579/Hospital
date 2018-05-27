var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

var AdminSchema = new Schema({

    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      jobTitle: {
        type: String,
        required: false
      }

},{ timestamps: true });

//hashing
AdminSchema.methods.hashPassword = function(password) {
    return bcrypt.hashSync(password, 12);
  };
  AdminSchema.methods.comparePassword = function(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  };

module.exports = mongoose.model('Admin', AdminSchema);

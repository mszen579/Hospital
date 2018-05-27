var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FormSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    callName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    postCode: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    mobile: {
        type: String,
        required: false
    },
    occupation: {
        type: String,
        required: false
    },
    believe: {
        type: String,
        required: false
    },
    marigeStatus: {
        type: String,
        required: false
    },
    availability: {
        type: String,
        required: false
    },


    motivation: {
        type: String,
        required: false
    },
    experience: {
        type: String,
        required: false
    },
    healthExper: {
        type: String,
        required: false
    },
    emotionalExper: {
        type: String,
        required: false
    },
    compassion: {
        type: String,
        required: false
    },
    workPreferences: {
        type: String,
        required: false
    },
    workExpectations: {
        type: String,
        required: false
    },
},{ timestamps: true })

module.exports = mongoose.model('Form', FormSchema);
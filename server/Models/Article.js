var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    Video: {
        type: String,
        required: false
    },
    profilePic: {
        type: String,
        required: false
    },
    ShortDescription: {
        type: String,
        required: true
    },
},{ timestamps: true })

module.exports = mongoose.model('Article', ArticleSchema);

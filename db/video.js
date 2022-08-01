const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    x: { type: String },
    videoID: { type: String }
})

module.exports = mongoose.model('Video', videoSchema)
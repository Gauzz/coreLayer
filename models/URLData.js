const mongoose = require('mongoose');
const URLDataSchema = new mongoose.Schema({
    url: { type: String },
    author: { type: String },
    publisher: { type: String },
    isDeleted: { type: Boolean, default: false },
    tags: [{ type: String }],
    lastModified: { type: Date, default: Date.now() }
}, {
    strict: true
});

module.exports = mongoose.model('URLData', URLDataSchema);
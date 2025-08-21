const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: String,
    body: String,
    createAt: { type: Date, default: Date.now },
    category: { type: String}, 
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    answers: [
        {
            body: String,
            author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        }
    ]
});

module.exports = mongoose.model('Question', questionSchema);
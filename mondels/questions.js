const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: String,
    body: String,
    category: { type: String, required: true }, 
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    answers: [
        {
            body: String,
            author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        }
    ]
});

module.exports = mongoose.model('Question', questionSchema);
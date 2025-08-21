const express = require('express');
const router = express.Router();

const Question = require('../models/questions');

// Get questions
router.get('/search', async (req, res) => {
    const questions = await Question.find().populate('author', 'username');
    res.json(questions);
});


// Create question
router.post('/create', async (req, res) => {
    const { title, body, category } = req.body
    const question = new Question({
        title: title,
        body: body,
        category: category,
        author: req.user._id,
        answer: null
    });
    await question.save();
    res.json(question);
});

// Answer question
router.post('/answers/:id/answers', async (req, res) => {
    const question = await Question.findById(req.params.id);
    question.answers.push({ body: req.body.body, author: req.user.id });
    await question.save();
    res.json(question);
});



module.exports = router;
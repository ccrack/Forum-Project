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
    const { title, body, category} = req.body
    const question = new Question({
        title: title,
        body: body,
        category: category,
        author: res.user.id,
        answer: null
    });
    await question.save();
    res.json(question);
});

// get question by categories
router.get("/search/:category", async (req, res) => {
    try {
        const { category } = req.params;
        const questions = await Question.find({ category })
            .populate("author", "username") // only username from author
            .populate("answers.author", "username") // same for answers
            .sort({ createAt: -1 }); // latest first
        res.json({ category, questions });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch questions" });
    }
});

// Answer question
router.post('/answers/:id/answers', async (req, res) => {
    const question = await Question.findById(req.params.id);
    question.answers.push({ body: req.body.body, author: req.user.id });
    await question.save();
    res.json(question);
});



module.exports = router;
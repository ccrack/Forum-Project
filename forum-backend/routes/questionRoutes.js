const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Question = require('../models/questions');

// Get questions
router.get('/search', async (req, res) => {
    const questions = await Question.find().populate('author', 'username');
    res.json(questions);
});

function auth(req, res, next) {
    const authHeader = req.headers.authorization;
   
    if (!authHeader) return res.status(401).json({ error: "No token" });
 
    const token = authHeader.split(" ")[0]; // split "Bearer token"
   
    if (!token) return res.status(401).json({ error: "Malformed token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;   // must contain _id
        console.log(decoded)
        next();
    } catch (err) {
        res.status(403).json({ error: "Invalid token" });
    }
}

// Create question
router.post('/create', auth, async (req, res) => {
    
    const { title, body, category } = req.body
    try {
        const question = new Question({
            title: title,
            body: body,
            category: category,
            author: req.user.id,
            answer: null
        });
        await question.save();
        res.json(question);
    } catch (err) {
        if (err.response) {
            console.error("Backend error:", err.response.data); 
        } else {
            console.error("Error creating question:", err);
        }
    }
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
router.post('/answers/:id/answers', auth, async (req, res) => {
    const question = await Question.findById(req.params.id);
    console.log(req.params.id)
    question.answers.push({ body: req.body.body, author: req.user.id });
    await question.save();
    res.json(question);
});



module.exports = router;
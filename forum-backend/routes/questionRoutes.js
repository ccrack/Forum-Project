const express = require('express');
const router = express.Router();

// get questions
router.get('/', (req, res) => {
    res.send({data: "questions sent"});
});

// post questions
router.post('/', (req, res) => {
    res.send({data: "questions registered"});
});

module.exports = router;
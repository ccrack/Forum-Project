const express = require('express');
const router = express.Router();


// login
router.get('/', (req, res) => {
    res.send({data: "user login"});
});

// Register
router.post('/', (req, res) => {
    res.send({data: "user register"});
});

module.exports = router;
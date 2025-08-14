const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// refference to models object
const Questions = require('../models/questions');
const Users = require('../models/users');


// login
router.get('/', (req, res) => {
    res.send({ data: "user login" });
});

// Register
router.post('/', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new Users(
        {
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });

    await user.save();
    res.json({ message: 'user registered' });
});

module.exports = router;
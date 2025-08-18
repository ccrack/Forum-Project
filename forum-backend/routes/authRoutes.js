const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// refference to models object
const Users = require('../models/users');


// login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ username: username });

    if (!user) return res.status(400).json({ error: 'User not found' });
    if (!await bcrypt.compare(password, user.password))
        return res.status(400).json({ error: 'Wrong password' });

    // create payload
    const payload = {
        id: user._id,
        username: user.username
    }

    //sign token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log(user._id)
    res.json({ message: "Login successful", token });

});


// Register
router.post('/register', async (req, res) => {
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
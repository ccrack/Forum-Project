const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const questionRouter = require('./routes/questionRoutes');
const userRouter = require('./routes/authRoutes');


// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("My app running...");
});


app.use('/api/questions', questionRouter);
app.use('/api/users', userRouter);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
})
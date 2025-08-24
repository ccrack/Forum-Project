const mongoose = require('mongoose');


const connectDB = async () => {
     
    try {
        // Connect to MongoDB
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`✅ MongoDB Atlas connected successfully: ${conn.connection.host}`);
    } catch (err) {
        console.error(`MongoDB Atlas connection error: ${err.message}`);
        process.exit(1); // Stop app if DB connection fails
    }
};

module.exports = connectDB;
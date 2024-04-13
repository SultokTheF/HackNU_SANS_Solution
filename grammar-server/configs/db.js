const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // MongoDB connection URI
        const uri = 'mongodb://localhost:27017/HackNU';

        // Connect to MongoDB using Mongoose
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

module.exports = connectDB;

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: String,
    correctAnswer: String,
    incorrectAnswer: String
});

const lessonSchema = new mongoose.Schema({
    title: String,
    description: String,
    youtubeLink: String,
    textContent: String,
    questions: [questionSchema]
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
const Lesson = require('../models/LessonModel');

// Get all lessons
exports.getAllLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find();
        res.json(lessons);
    } catch (err) {
        console.error('Error fetching lessons:', err);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Get lesson by ID
exports.getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        if (!lesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }
        res.json(lesson);
    } catch (err) {
        console.error('Error fetching lesson:', err);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Create a new lesson
exports.createLesson = async (req, res) => {
    try {
        const newLesson = new Lesson(req.body);
        await newLesson.save();
        res.status(201).json(newLesson);
    } catch (err) {
        console.error('Error creating lesson:', err);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Update lesson by ID
exports.updateLesson = async (req, res) => {
    try {
        const updatedLesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }
        res.json(updatedLesson);
    } catch (err) {
        console.error('Error updating lesson:', err);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Delete lesson by ID
exports.deleteLesson = async (req, res) => {
    try {
        const deletedLesson = await Lesson.findByIdAndDelete(req.params.id);
        if (!deletedLesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }
        res.json({ message: 'Lesson deleted successfully' });
    } catch (err) {
        console.error('Error deleting lesson:', err);
        res.status(500).json({ error: 'Server Error' });
    }
};

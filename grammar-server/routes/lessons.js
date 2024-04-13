const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

// Define routes for lesson management
router.get('/', lessonController.getAllLessons);
router.get('/:id', lessonController.getLessonById);
router.post('/', lessonController.createLesson);
router.put('/:id', lessonController.updateLesson);
router.delete('/:id', lessonController.deleteLesson);

module.exports = router;

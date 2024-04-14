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

// Creation of a new lesson.
exports.createLesson = async (req, res) => {
    try {
        const { title, description, youtubeLink, textContent } = req.body;

        // Extract video ID from the YouTube link
        const videoId = extractVideoId(youtubeLink);

        // Construct the YouTube embed URL
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;

        // Extract questions, correct answers, and incorrect answers from the request body
        const questions = req.body.questions || [];
        const correctAnswers = req.body.correctAnswers || [];
        const incorrectAnswers = req.body.incorrectAnswers || [];

        // Create an array to hold the question objects
        const questionObjects = [];

        // Iterate over the questions array from the request body
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const correctAnswer = correctAnswers[i];
            const incorrectAnswer = incorrectAnswers[i];

            // Create a new question object
            const questionObject = {
                question,
                correctAnswer,
                incorrectAnswer
            };

            // Push the question object to the array
            questionObjects.push(questionObject);
        }

        // Create a new lesson object with the extracted fields and the array of question objects
        const newLesson = new Lesson({
            title,
            description,
            youtubeLink: embedUrl, // Assign the embedded YouTube URL
            textContent,
            questions: questionObjects // Assign the array of question objects
        });

        // Save the new lesson to the database
        await newLesson.save();
        
        // Redirect to the grammar page after successfully creating the lesson
        res.redirect('/grammar');
    } catch (err) {
        // Handle errors
        console.error('Error creating lesson:', err);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Function to extract video ID from YouTube link
function extractVideoId(youtubeLink) {
    // Extract the video ID using a regular expression
    const match = youtubeLink.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);

    // If a match is found, return the video ID
    if (match && match[1]) {
        return match[1];
    } else {
        // If no match is found, throw an error
        throw new Error('Invalid YouTube link');
    }
}







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

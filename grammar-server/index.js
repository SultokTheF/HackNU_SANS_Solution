const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./configs/db.js');
const Lesson = require('./models/LessonModel.js');
const lessonAPI = require('./routes/lessons.js')
const app = express();

connectDB();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Route to serve the grammar page
app.get('/grammar', async (req, res) => {
    try {
        // Fetch courses (lessons) from the database
        const courses = await Lesson.find();

        // Render the EJS file and pass the courses to it
        res.render(path.join(__dirname, '..', 'client', 'pages', 'grammarPage.ejs'), { courses });
    } catch (err) {
        console.error('Error fetching courses:', err);
        res.status(500).send('Server Error');
    }
});

app.get('/lesson/:id', async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        res.render(path.join(__dirname, '..', 'client', 'pages', 'quizPage.ejs'), { lesson });
    } catch (err) {
        console.error('Error fetching lesson:', err);
        res.status(500).json({ error: 'Server Error' });
    }
});

app.get('/grammar/add', async (req, res) => {
    res.render(path.join(__dirname, '..', 'client', 'pages', 'lessonAdditionPage.ejs'));
})

app.use('/api/lessons', lessonAPI)

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`NodeJS server running on port ${PORT}`));

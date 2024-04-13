const express = require('express');
const path = require('path');
const connectDB = require('./configs/db.js');
const Lesson = require('./models/LessonModel.js');
const lessonAPI = require('./routes/lessons.js')
const app = express();

connectDB();
app.set('view engine', 'ejs');

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

app.use('/api/lessons', lessonAPI)

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`NodeJS server running on port ${PORT}`));

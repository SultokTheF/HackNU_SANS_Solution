// app.js
const express = require('express');
const path = require('path');
const pool = require('./db');
const app = express();

app.set('view engine', 'ejs');

// Route to serve the grammar page
app.get('/grammar', async (req, res) => {
    // Passing info from db to ejs(html) file.
    res.render(path.join(__dirname, '..', 'client', 'pages', 'grammarPage.ejs'), {})
});

app.get('/grammar/lessons/:id', async (req, res) => {
    const lessonID = req.params.id;
    // Здесь должен получить материал и вопросы урока c помощью id из дб
    res.render(path.join(__dirname, '..', 'client', 'pages', 'quizPage.ejs'), {})
})

app.get('')

// Route to handle adding a lesson
app.post('/add-lesson', async (req, res) => {
    try {
        // Add your logic to add a lesson to the database
        // Example:
        // const { title, content } = req.body;
        // const newLesson = await pool.query('INSERT INTO lessons (title, content) VALUES ($1, $2) RETURNING *', [title, content]);
        // res.json(newLesson.rows[0]);
    res.send('Lesson added successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`NodeJS server running on port ${PORT}`));

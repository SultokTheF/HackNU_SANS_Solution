const express = require('express');
const app = express();

app.get('/grammar', async (req, res) => {
    res.send('All done')
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`NodeJS server is running on ${PORT}`);
});
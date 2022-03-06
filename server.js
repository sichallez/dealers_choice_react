const { syncAndSeed, SkiResorts } = require('./db');

// Require module express
const express = require('express');
const app = express();

// Add a GET API route
app.get('/api/ski_resorts', async(req, res, next) => {
    try {
        const resorts = await SkiResorts.findAll();
        res.send(resorts);
    }
    catch (err) {
        next(err);
    }
});

app.get('/api/ski_resorts/:id', async(req, res, next) => {
    try {
        const resort = await SkiResorts.findByPk(req.params.id);
        res.send(resort);
    }
    catch (err) {
        next(err);
    }
});

// Require path module
const path = require('path');

// Add static routes of my front-end js file to my server path
app.use('/client', express.static(path.join(__dirname, '/client')));

// Add a GET / route to return an index.html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// Add a Delete route
app.delete('/api/ski_resorts/:id', async(req, res, next) => {
    try {
        const resort = await SkiResorts.findByPk(req.params.id);
        await resort.destroy();
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});

// Database initilization, seeding the data
const init = async() => {
    try {
        await syncAndSeed();

        const port = process.env.PORT || 1111;
        app.listen(port, () => console.log(`listen on port ${port}`)); 
    }
    catch (err) {
        console.log(err);
    }
};

init();
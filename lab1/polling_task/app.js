const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    next();
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/data', (req, res) => {
    let clientTime = req.query.lastModified;
    let fileTime = fs.statSync('myfile.txt').mtimeMs;

    while (clientTime >= fileTime) {
        setTimeout(() => {}, 1000); 
        fileTime = fs.statSync('myfile.txt').mtimeMs;
    }

    let fileContent = fs.readFileSync('myfile.txt', 'utf-8');
    let message = {
        data: fileContent,
        clientTime: clientTime,
        serverTime: fileTime
    };

    res.json(message);
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

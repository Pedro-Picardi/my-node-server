const http = require('http');
const fs = require('fs');
const path = require('path');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const express = require('express');

const PORT = 8080;
const app = express();

// Enable LiveReload
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname + "/index.html");
app.use(connectLiveReload());

// Serve static files
app.get("/", (req, res) => {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

// Notify LiveReload on changes
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});
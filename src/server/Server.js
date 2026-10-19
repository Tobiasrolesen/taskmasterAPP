// Express-opsætning: middleware, statiske filer og routes.
const path = require('path');
const express = require('express');
const RequestLogger = require('../logging/RequestLogger');

class Server {
    constructor(port, taskController) {
        this.port = port;
        this.app = express();

        this.app.use(express.json());
        this.app.use(RequestLogger.middleware);
        this.app.use(express.static(path.join(__dirname, '..', '..', 'public')));

        this.app.get('/api/tasks', (req, res) => taskController.getAll(req, res));
        this.app.post('/api/tasks', (req, res) => taskController.create(req, res));
        this.app.delete('/api/tasks/:id', (req, res) => taskController.delete(req, res));
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Taskmaster kører på http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;

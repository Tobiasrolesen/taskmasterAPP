// Lag 1 (indgang): Express-opsætning, middleware og montering af routes.
const path = require('path');
const express = require('express');
const RequestLogger = require('../logging/RequestLogger');

class Server {
    constructor(port, taskRouter) {
        this.port = port;
        this.app = express();

        this.app.use(express.json());
        this.app.use(RequestLogger.middleware);
        this.app.use(express.static(path.join(__dirname, '..', '..', 'public')));
        this.app.use('/api/tasks', taskRouter);
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Taskmaster kører på http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;

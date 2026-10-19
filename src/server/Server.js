//Express-opsætning: middleware, statiske filer og routes.
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

        this.app.use('/api', (req, res) => {
            res.status(404).json({error: 'Endpoint does not exist'});
        });

        this.app.use((error, req, res, next) => {
            console.error(error);
            const status = error.status || 500;
            const message = status < 500 ? 'Unknown Request' : 'Server error, try again later.';
            res.status(status).json({error: message});
        });
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Taskmaster is running at: http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;

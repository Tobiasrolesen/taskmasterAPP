// Lag 2 (routes): mapper URL + HTTP-metode til en controller-metode.
const express = require('express');

function createTaskRoutes(taskController) {
    const router = express.Router();

    router.get('/', (req, res) => taskController.getAll(req, res));
    router.post('/', (req, res) => taskController.create(req, res));
    router.delete('/:id', (req, res) => taskController.delete(req, res));

    return router;
}

module.exports = createTaskRoutes;

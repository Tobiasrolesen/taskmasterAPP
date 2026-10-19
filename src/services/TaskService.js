// Service: logikken - hent, opret og slet tasks. Kender intet til HTTP (req/res).
// Husk mønstret: læs -> ændr -> skriv.
const crypto = require('crypto');
const Task = require('../models/Task');

class TaskService {
    constructor(fileHandler) {
        this.fileHandler = fileHandler;
    }

    async getAllTasks() {
        // TODO: læs og returnér listen via this.fileHandler.read()
    }

    async createTask(text) {
        // TODO: lav new Task(crypto.randomUUID(), text), læs listen, tilføj, skriv, returnér den nye task
    }

    async deleteTask(id) {
        // TODO: læs listen, filtrér task med id væk, skriv. Returnér true hvis noget blev slettet
    }
}

module.exports = TaskService;

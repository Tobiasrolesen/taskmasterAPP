// Lag 4 (service): forretningslogik - validering, oprettelse af Task-objekter osv.
// Kender intet til HTTP (req/res) og intet til filer.
const Task = require('../models/Task');

class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    async getAllTasks() {
        // TODO: returnér alle tasks fra repository
    }

    async createTask(text) {
        // TODO: valider teksten, lav en ny Task (crypto.randomUUID()), gem via repository
    }

    async deleteTask(id) {
        // TODO: slet via repository, returnér true/false alt efter om den fandtes
    }
}

module.exports = TaskService;

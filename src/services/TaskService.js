// Service: logikken - hent, opret og slet tasks. Kender intet til HTTP (req/res).
// Husk mønstret: læs -> ændr -> skriv.
const crypto = require('crypto');
const Task = require('../models/Task');

class TaskService {
    constructor(fileService) {
        this.fileService = fileService;
    }

    async getAllTasks() {
        //Vi læser filen via vores fileService. Await bruges da det kan tage tid at læse en fil
        return await this.fileService.read();
    }

    async createTask(text) {
        //Ny opgave med unikt id. done og createdAt sættes automatisk i Task-modellen
        const task = new Task(crypto.randomUUID(), text);
        const tasks = await this.fileService.read();
        tasks.push(task);
        await this.fileService.write(tasks);
        //Vi returnerer kun den nye opgave, så frontend kan vise den
        return task;
    }

    async deleteTask(id) {
        const tasks = await this.fileService.read();
        //filter laver en ny liste med alle opgaver undtagen den med det givne id
        const remaining = tasks.filter((task) => task.id !== id);
        //Er listen lige lang, fandtes opgaven ikke - controlleren sender så 404
        if (remaining.length === tasks.length) {
            return false;
        }
        await this.fileService.write(remaining);
        return true;
    }
}

module.exports = TaskService;

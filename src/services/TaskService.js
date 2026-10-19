//Service: logikken - hent, opret og slet tasks. Kender intet til HTTP (req/res).
const crypto = require('crypto');
const Task = require('../models/Task');

class TaskService {
    constructor(fileService) {
        this.fileService = fileService;
        //Kø: hver ændring venter på den forige så vi fx kan tilføje 2 tasks samme tid uden en forsvinder. (Race condiction)
        this.queue = Promise.resolve();
    }

    //Sætter en ændring i kø så kun en kan læse -> ændre -> skriv af gangen
    enqueue(work) {
        const result = this.queue.then(work);

        //Hvis en ændring fejler skal køen ikke stoppe den skal fortsætte med de næste i køen.
        this.queue = result.catch(() => {
        });
        return result;
    }

    async getAllTasks() {
        //Vi læser filen via vores fileService. Await bruges da det kan tage tid at læse en fil
        return await this.fileService.read();
    }

    async createTask(text) {
        //Pakkes ind så vi arbejder i køen
        return this.enqueue(async () => {
            //Ny opgave med unikt id. done og createdAt sættes automatisk i Task-modellen
            const task = new Task(crypto.randomUUID(), text);
            const tasks = await this.fileService.read();
            tasks.push(task);
            await this.fileService.write(tasks);
            //Vi returnerer kun den nye opgave, så frontend kan vise den
            return task;
        });
    }

    async deleteTask(id) {
        //Pakkes ind så vi arbejder i køen
        return this.enqueue(async () => {
            const tasks = await this.fileService.read();
            //filter laver en ny liste med alle opgaver undtagen den med det givne id
            const remaining = tasks.filter((task) => task.id !== id);
            //Er listen lige lang, fandtes opgaven ikke - controlleren sender så 404
            if (remaining.length === tasks.length) {
                return false;
            }
            await this.fileService.write(remaining);
            return true;
        });
    }
}

module.exports = TaskService;

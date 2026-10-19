//Model: beskriver hvordan en opgave ser ud.
class Task {
    //Constructor sætter selv sin dato og done status
    constructor(id, text, done = false, createdAt = new Date().toISOString()) {
        this.id = id;
        this.text = text;
        this.done = done;
        this.createdAt = createdAt;
    }
}

module.exports = Task;

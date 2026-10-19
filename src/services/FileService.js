// FileService: det eneste sted der læser/skriver tasks.json (med fs-extra).
const fs = require('fs-extra');

class FileService {
    constructor(filePath) {
        this.filePath = filePath;
    }

    //async betyder at metoden returnerer et promise - svaret kommer først når filen er læst
    async read() {
        //Mens vi venter med await, kan Node tage sig af andre requests. readJson laver JSON om til et array for os
        return await fs.readJson(this.filePath);
    }

    async write(tasks) {
        //Vi overskriver hele filen med den nye liste. spaces: 2 gør filen pæn at læse
        await fs.writeJson(this.filePath, tasks, { spaces: 2 });
        //Return ikke nødvendigt - vi venter bare på at den har skrevet
    }
}

module.exports = FileService;

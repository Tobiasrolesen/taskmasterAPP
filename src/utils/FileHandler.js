// Hjælpeklasse til at læse/skrive JSON-filer med fs-extra.
const fs = require('fs-extra');

class FileHandler {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async read() {
        // TODO: læs JSON fra this.filePath med fs.readJson (returnér [] hvis filen ikke findes)
    }

    async write(data) {
        // TODO: skriv data til this.filePath med fs.writeJson (brug { spaces: 2 })
    }
}

module.exports = FileHandler;

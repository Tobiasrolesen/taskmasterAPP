// Lag 5 (data access): det eneste sted der ved, at data ligger i en JSON-fil.
// Skifter vi senere til en database, er det kun denne klasse der skal ændres.
class TaskRepository {
    constructor(fileHandler) {
        this.fileHandler = fileHandler;
    }

    async findAll() {
        // TODO: læs listen fra fil
    }

    async add(task) {
        // TODO: læs -> tilføj -> skriv
    }

    async deleteById(id) {
        // TODO: læs -> filtrér task væk -> skriv. Returnér true hvis noget blev slettet
    }
}

module.exports = TaskRepository;

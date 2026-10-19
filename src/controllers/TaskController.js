// Lag 3 (controller): læser req, kalder service, sender svar + statuskode.
// Ingen forretningslogik her - kun HTTP.
class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }

    // GET /api/tasks
    async getAll(req, res) {
        // TODO: hent alle tasks via service og send dem som JSON (200)
        res.status(501).json({ error: 'Ikke implementeret endnu' });
    }

    // POST /api/tasks
    async create(req, res) {
        // TODO: læs req.body.text, opret via service, send ny task (201)
        //       send 400 hvis teksten mangler
        res.status(501).json({ error: 'Ikke implementeret endnu' });
    }

    // DELETE /api/tasks/:id
    async delete(req, res) {
        // TODO: slet via service med req.params.id, send 204 - eller 404 hvis den ikke findes
        res.status(501).json({ error: 'Ikke implementeret endnu' });
    }
}

module.exports = TaskController;

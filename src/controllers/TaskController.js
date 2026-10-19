//Controller: læser req, kalder TaskService og sender svar + statuskode.
//Ingen forretningslogik her - kun HTTP.

const MAX_TEXT_LENGTH = 200;

class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }

    // GET /api/tasks
    async getAll(req, res) {
        try {
            const tasks = await this.taskService.getAllTasks();
            res.status(200).json(tasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Server Error, please try again later'});
        }
    }

    //POST /api/tasks
    async create(req, res) {
        try {
            const text = req.body?.text;
            //Vi afviser tom eller manglende tekst med 400 (Bad Request)
            if (typeof text !== 'string' || text.trim() === '') {
                return res.status(400).json({error: 'Text is required'});
            }
            //Vi tjekker om teksten er for lang her og i html.
            if (text.trim().length > MAX_TEXT_LENGTH) {
                return res.status(400).json({error: `Task can be max ${MAX_TEXT_LENGTH} characters`});
            }
            const newTask = await this.taskService.createTask(text.trim());
            res.status(201).json(newTask);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Server Error, please try again later'});
        }
    }

    //DELETE /api/tasks/:id
    async delete(req, res) {
        try {
            //Id'et kommer fra URL'en: /api/tasks/:id
            const deleted = await this.taskService.deleteTask(req.params.id);
            if (!deleted) {
                return res.status(404).json({error: 'Task not found'});
            }
            //204 = slettet, men intet indhold at sende tilbage
            res.status(204).end();
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Server Error, please try again later'});
        }
    }
}

module.exports = TaskController;

// Entry point: samler alle lagene (dependency injection) og starter serveren.
const path = require('path');

const Server = require('./src/server/Server');
const FileHandler = require('./src/utils/FileHandler');
const TaskRepository = require('./src/repositories/TaskRepository');
const TaskService = require('./src/services/TaskService');
const TaskController = require('./src/controllers/TaskController');
const createTaskRoutes = require('./src/routes/taskRoutes');

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'tasks.json');

const fileHandler = new FileHandler(DATA_FILE);
const taskRepository = new TaskRepository(fileHandler);
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

const server = new Server(PORT, createTaskRoutes(taskController));
server.start();

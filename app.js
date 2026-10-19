// Entry point: opretter objekterne, kobler dem sammen og starter serveren.
const path = require('path');

const Server = require('./src/server/Server');
const FileHandler = require('./src/utils/FileHandler');
const TaskService = require('./src/services/TaskService');
const TaskController = require('./src/controllers/TaskController');

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'tasks.json');

const fileHandler = new FileHandler(DATA_FILE);
const taskService = new TaskService(fileHandler);
const taskController = new TaskController(taskService);

const server = new Server(PORT, taskController);
server.start();

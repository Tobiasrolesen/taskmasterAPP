// Frontend: taler med backend via fetch().
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

async function loadTasks() {
    // TODO: fetch('/api/tasks') -> renderTasks(tasks)
}

async function addTask(text) {
    // TODO: fetch('/api/tasks', { method: 'POST', headers: {...}, body: JSON.stringify({ text }) })
}

async function deleteTask(id) {
    // TODO: fetch(`/api/tasks/${id}`, { method: 'DELETE' })
}

function renderTasks(tasks) {
    // TODO: tøm list og tilføj et <li> pr. task (klik/emoji = slet)
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    // TODO: kald addTask(input.value), ryd input og genindlæs listen
});

loadTasks();

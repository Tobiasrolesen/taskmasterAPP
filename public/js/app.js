// Frontend: taler med backend via fetch().

//Vi henter de tre elementer fra index.html, så vi kan arbejde med dem i java script
//form = <form> med tekstfelt og Tilføj-knap
const form = document.getElementById('task-form');
//input = tekstfeltet hvor man skriver opgaven
const input = document.getElementById('task-input');
//list = den tomme <ul>, som vi fylder opgaverne ind i
const list = document.getElementById('task-list');
const errorBox = document.getElementById('error');
//Tilføj-knappen, så vi kan slå den fra mens vi venter på serveren
const submitButton = form.querySelector('button');

//Viser en fejlbesked en tom tekst skjuler boksen (via .error:empty i CSS)
function showError(message) {
    errorBox.textContent = message;
}

async function loadTasks() {
    try {
        //Send GET og vent på svar
        const response = await fetch(`/api/tasks`);

        //Response er true ved statuskoder som 200-299
        if (!response.ok) {
            throw new Error(`Serveren answered ${response.status}`);
        }

        //fetch giver et Response-objekt tilbage og .json() laver indholdet om til et array
        const tasks = await response.json();
        console.log(tasks);

        //Vi tegner opgaverne på siden
        renderTasks(tasks);
    } catch (error) {
        console.error(error);
        showError('Failed to load tasks, try again later.');
    }
}

async function addTask(text) {

    const response = await fetch('/api/tasks', {
        method: 'POST',
        //Fortæller serveren at body er JSON (svarer til at vælge JSON under Body i Postman)
        headers: {'Content-Type': 'application/json'},
        //Laver objektet om til JSON-tekst, da man kun kan sende tekst over nettet
        body: JSON.stringify({text: text})
    });
    //Vi prøver her at læse severens fejlbesked, og bruger .catch hvis svaret ikke er json
    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to add task.');
    }
}

async function deleteTask(id) {
    try {
        //Id'et sættes ind i URL'en med ${id} (kræver backticks)
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
        });

        //404 er hvis task fx allerede er slette, så er der noget galt.
        if (!response.ok && response.status !== 404) {
            throw new Error(`Serveren answered ${response.status}`);
        }
        showError('');
    } catch (error) {
        console.error(error);
        showError('Failed to delete task, try again later.');
    }
    //Vi henter listen igen, så den slettede opgave forsvinder
    await loadTasks();
}

function renderTasks(tasks) {
    //Vi tømmer listen så vi ikke får dubletter
    list.innerHTML = '';

    //Vi laver et nyt <li> (list item = et punkt i listen) pr. task
    tasks.forEach((task) => {
        const li = document.createElement('li');
        //Vi indsætter teksten i li
        li.textContent = task.text;

        //Slet-knap til hver opgave. () => gør at deleteTask først kører når der klikkes
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.addEventListener('click', () => deleteTask(task.id));
        li.appendChild(deleteButton);

        //Sætter li ind i <ul>
        list.appendChild(li);
    });
}

form.addEventListener('submit', async (event) => {
    //Vi stopper browseren i at genindlæse siden (en <form> genindlæser som standard hele siden når den sendes)
    event.preventDefault();
    submitButton.disabled = true;
    try {
        //Sender teksten til backend
        await addTask(input.value);
        //Vi tømmer tekstfeltet efter vi har klikket på "Tilføj"
        input.value = '';
        showError('');
        //Vi henter listen igen, så den nye opgave vises
        await loadTasks();
    } catch (error) {
        console.error(error);
        showError(error.message);
    } finally {
        //finally kører altid uanset succes eller fejl.
        submitButton.disabled = false;
    }
});

//Henter og viser opgaverne, når siden åbner
loadTasks();

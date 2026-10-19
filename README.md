# Taskmaster App

To-Do Taming: en fullstack to-do-app bygget med Node.js og Express. Opgaverne gemmes i en JSON-fil.

## Kom i gang

```bash
npm install
npm run dev     # starter med auto-genstart ved ændringer
```

Åbn http://localhost:3000

## Arkitektur (lagdelt, OOP)

```
public/                 Præsentation  - HTML/CSS/JS (fetch) serveret med express.static()
src/routes/             Routes        - URL + metode -> controller
src/controllers/        Controller    - HTTP: req/res og statuskoder
src/services/           Service       - forretningslogik og validering
src/repositories/       Data access   - læs/skriv tasks (kun her ved vi det er en fil)
data/tasks.json         Data          - selve opgaverne

src/models/Task.js      Model for en opgave
src/utils/FileHandler   Hjælpeklasse til fs-extra
src/logging/            Request-logger middleware
src/server/Server.js    Express-opsætning
app.js                  Entry point - kobler lagene sammen
tests/api.http          Manuelle API-kald (WebStorm / VS Code REST Client)
```

Flow for en request: `public -> routes -> controller -> service -> repository -> data/tasks.json`

## API

| Metode | URL              | Beskrivelse          |
|--------|------------------|----------------------|
| GET    | /api/tasks       | Hent alle opgaver    |
| POST   | /api/tasks       | Opret `{ "text" }`   |
| DELETE | /api/tasks/:id   | Slet opgave med id   |

## Git-arbejdsgang (2 personer på `main`)

1. **Før du starter:** `git pull`
2. Lav en lille, afgrænset ændring
3. `git add .` -> `git commit -m "Beskrivende besked"`
4. **Før du pusher:** `git pull` igen, løs evt. konflikter, så `git push`

Arbejd helst i forskellige filer/lag på samme tid for at undgå konflikter.

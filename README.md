# Taskmaster App

To-Do Taming: en fullstack to-do-app bygget med Node.js og Express. Opgaverne gemmes i en JSON-fil.

## Kom i gang

```bash
npm install
npm run dev     # starter med auto-genstart ved ændringer
```

Åbn http://localhost:3000

## Arkitektur (3 lag, OOP)

```
public/                       Frontend   - HTML/CSS/JS (fetch) serveret med express.static()
src/controllers/              Controller - HTTP: req/res og statuskoder
src/services/                 Service    - logik: hent, opret, slet
src/utils/FileHandler.js      Data       - læs/skriv JSON med fs-extra
data/tasks.json               Selve opgaverne

src/models/Task.js            Model for en opgave
src/server/Server.js          Express-opsætning og routes
src/logging/                  Request-logger middleware
app.js                        Entry point - kobler det hele sammen
tests/api.http                Manuelle API-kald (WebStorm / VS Code REST Client)
```

Flow for en request: `public -> Server (route) -> controller -> service -> FileHandler -> data/tasks.json`

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

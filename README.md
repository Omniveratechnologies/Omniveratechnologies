# Omnivera

Omnivera is a React website and customer workspace backed by an Express API
and MongoDB.

## Project structure

```text
public/Images/       Static assets served from the site root
src/
  components/        Shared UI components
  data/              Website content
  pages/             Route-level pages
  services/          Frontend API client
  App.jsx            Client-side routes
server/
  config/            Database connection and initial admin setup
  controllers/       API request handlers
  middleware/        Authentication and error handling
  models/            Mongoose models
  routes/             API route definitions
  server.js           Express entry point
```

## Requirements

- Node.js 20 or newer
- npm
- A MongoDB Atlas database for the API

## Local development

Install dependencies in both applications:

```bash
npm ci
npm --prefix server ci
```

Create local environment files from the examples:

```bash
cp .env.example .env
cp server/.env.example server/.env
```

In `server/.env`, set `MONGODB_URI` to your Atlas connection string and
replace its password placeholder. URL-encode special characters in the
password. Set `JWT_SECRET` to a random secret of at least 32 characters.
Set a strong `ADMIN_PASSWORD` if the initial admin account should be created.
Keep both `.env` files private; they are ignored by Git.

Start the API and frontend in separate terminals:

```bash
npm run server
npm run dev
```

The frontend is available at `http://localhost:5173`; the API health check is
at `http://localhost:5001/api/health`. Vite proxies `/api` requests to the
local API. You can also start the production frontend build with:

```bash
npm run build
npm run preview
```

## Deployment

Deploy the frontend and API as separate services, or configure your host to
route `/api` to the API service.

### Frontend

- Build command: `npm ci && npm run build`
- Output directory: `dist`
- Set `VITE_API_URL` in the frontend build environment:
  - Use `/api` when the frontend host proxies `/api` to the backend.
  - Otherwise use the backend's full URL ending in `/api`, for example
    `https://api.example.com/api`.
- Configure SPA fallback/rewrite behavior so direct loads of routes such as
  `/products` and `/studio` serve `index.html`.

Vite embeds `VITE_API_URL` at build time, so rebuild the frontend after
changing it.

### API

Deploy the `server/` directory as a Node.js service:

- Install command: `npm ci`
- Start command: `npm start`
- Provide `PORT`, `NODE_ENV=production`, `MONGODB_URI`, `JWT_SECRET`, and
  `CLIENT_URL` as service environment variables. `CLIENT_URL` must be the
  frontend's exact origin (scheme and hostname, without a path).
- Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` for first-time admin creation.
  The seeder does not change an existing admin account.
- Allow the API service to connect to MongoDB Atlas in the Atlas network
  access settings.

Never commit database credentials, admin passwords, or JWT secrets. If a
credential has been shared or exposed, rotate it in MongoDB Atlas and update
the API service environment before deployment.

## API routes

- `GET /api/health` — service health
- `POST /api/contact` — submit a contact request
- `/api/auth` — register, sign in, and retrieve the current user
- `/api/workspace` — authenticated customer and admin workspace operations

The contact form submits `{ name, company, email, message }` to
`POST /api/contact`.

# Omnivera — Company Website (Dashboard Layout)

A complete, editable React website for **Omnivera** (Omniware Technologies
Private Limited), built as a dashboard-style app: a static sidebar for
navigation, a page area that swaps per route, and one shared footer at the
bottom of every page. Content is placeholder/dummy — everything is designed
to be swapped for real copy, images, and video.

## Tech stack

- **React 18** + **Vite**
- **React Router v6** for client-side page routing
- **Tailwind CSS** with a brand-matched design-token theme
  (`tailwind.config.js` + `src/index.css`)
- **Axios** service layer (`src/services/api.js`) ready to talk to a
  Node/Express + MongoDB (MERN) backend — this repo is the **frontend
  only**; no server is included

## Getting started

```bash
npm install
cp .env.example .env   # point VITE_API_URL at your Express API
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

Output goes to `dist/` and can be hosted on any static host.

## Connecting the backend (MERN)

This project only ships the **M** (data shape expectations below) + **RN**
of MERN — the Express/MongoDB API is up to you. Two things wire the
frontend to your backend once it exists:

1. **`.env`** — set `VITE_API_URL` to your API's base URL, e.g.
   `http://localhost:5000/api` in development.
2. **`src/services/api.js`** — a shared Axios instance plus one example
   call, `submitContactForm()`, used by `src/components/Contact.jsx`.
   Add more functions here as you add endpoints (e.g. `getProducts()`,
   `getServices()`) and swap the static files in `src/data/` for API
   calls as your backend comes online.

Suggested Express route for the contact form already wired up:

```
POST /api/contact
Body: { name, company, email, message }
```

Until that route exists, the form will show a friendly "couldn't reach the
server" message instead of failing silently.

## Layout

- **Sidebar** (`src/components/Sidebar.jsx`) is fixed to the left on
  desktop and always visible. On narrower screens it becomes an off-canvas
  drawer, opened with the hamburger button in the top bar
  (`src/components/Layout.jsx`).
- **Pages** render inside `.content-scroll`, to the right of the sidebar.
- **Footer** (`src/components/Footer.jsx`) is rendered once, inside
  `Layout.jsx`, directly under every page's content — so it's identical and
  shared across the whole site, not duplicated per page.

## Pages / routes

| Sidebar label     | Route               | File                                  |
|-------------------|----------------------|----------------------------------------|
| Home              | `/`                  | `src/pages/Home.jsx`                   |
| Product           | `/products`          | `src/pages/ProductsPage.jsx`           |
| Services          | `/services`          | `src/pages/ServicesPage.jsx`           |
| About Us          | `/about-us`          | `src/pages/AboutUsPage.jsx`            |
| Contact Us        | `/contact-us`        | `src/pages/ContactUsPage.jsx`          |
| Why Choose Us     | `/why-choose-us`     | `src/pages/WhyChooseUsPage.jsx`        |
| Company Profile   | `/company-profile`   | `src/pages/CompanyProfilePage.jsx`     |

Routes are declared in `src/App.jsx`. Add a new page by creating a
component in `src/pages/`, adding a `<Route>` in `App.jsx`, and adding an
entry to the `nav` array in `src/data/content.js` (this also drives the
sidebar automatically).

## Project structure

```
src/
  components/
    Layout.jsx        — sidebar + top bar (mobile) + page outlet + footer
    Sidebar.jsx         — static sidebar nav, drawer on mobile
    NavIcon.jsx          — small inline icon set used only in the sidebar
    Hero.jsx, Positioning.jsx, Products.jsx, ProductModal.jsx,
    Services.jsx, Contact.jsx, Footer.jsx, Logo.jsx
  pages/
    Home.jsx             — hero + positioning teaser + quick-link tiles
    ProductsPage.jsx       — product showcase + detail overlay (owns modal state)
    ServicesPage.jsx
    AboutUsPage.jsx
    ContactUsPage.jsx
    WhyChooseUsPage.jsx
    CompanyProfilePage.jsx
  data/
    content.js          — company info, sidebar nav, hero + contact copy
    aboutUs.js            — About Us page content
    whyChooseUs.js         — Why Choose Us page content
    companyProfile.js       — Company Profile page content
    products.js             — the two flagship product entries
    services.js              — the services grid entries
  services/
    api.js                 — Axios client + submitContactForm() (MERN backend hook)
  App.jsx                — route definitions
  main.jsx                 — BrowserRouter + app mount
  index.css                 — Tailwind directives + small set of component/utility layers
tailwind.config.js        — brand color tokens (chrome + steel-blue, matched to the logo), fonts, shadows
.env.example               — VITE_API_URL for the backend
```

## What to edit first

1. **`src/data/content.js`** — company name, tagline, email, phone,
   address, social links, sidebar labels/routes, hero copy.
2. **`src/data/products.js`** — replace the two dummy products
   (`Coming Soon`, `Coming Soon`) with your real products.
3. **`src/data/aboutUs.js`**, **`whyChooseUs.js`**, **`companyProfile.js`**
   — swap in real mission/vision, differentiators, and company facts.
4. **`src/components/Logo.jsx`** — once you have a final logo file, replace
   the inline SVG with `<img src="/your-logo.svg" alt="Omnivera" />`.
5. **Product media** — in `ProductModal.jsx`, the `.modal-image` and
   `.modal-video` blocks are placeholders for a real screenshot and video.

## Notes on the product overlay

- On the Products page, clicking a product card opens a full-screen
  overlay; the products section behind it blurs and the whole viewport
  darkens (the overlay itself is a fixed, semi-transparent layer).
- The page's scroll position is captured before the overlay opens and
  restored when it closes.
- The overlay closes via its close button, the Escape key, or a click
  outside the panel.

## Deployment

This is a static Vite + React Router app. Most static hosts (Vercel,
Netlify, etc.) handle client-side routing automatically; if you deploy to a
plain static file server, configure it to fall back to `index.html` for
unknown paths (a SPA rewrite rule) so routes like `/products` work on a
direct load/refresh.


## MERN backend setup

The project now includes an Express + MongoDB backend in `server/`.

### Backend structure

```text
server/
  config/db.js
  controllers/contactController.js
  middleware/errorHandler.js
  models/Contact.js
  routes/contactRoutes.js
  routes/index.js
  .env
  .env.example
  package.json
  server.js
```

### 1. Configure MongoDB

Open `server/.env` and replace `<db_password>` in `MONGODB_URI` with the password for the MongoDB Atlas user `anshshaw08_db_user`.

Do not commit `server/.env` to Git. It is already included in `.gitignore`.

### 2. Install dependencies

From the project root:

```bash
npm install
cd server
npm install
cd ..
```

### 3. Start the backend

```bash
npm run server
```

The API runs on:

```text
http://localhost:5001
```

Health check:

```text
http://localhost:5001/api/health
```

### 4. Start the frontend

In another terminal:

```bash
npm run dev
```

The frontend is configured in `.env` to use:

```text
http://localhost:5001/api
```

### 5. Run frontend + backend together

After installing the root dependencies:

```bash
npm run dev:all
```

### Contact API

The existing Contact form is now connected to MongoDB through:

```text
POST http://localhost:5001/api/contact
```

Request body:

```json
{
  "name": "John Doe",
  "company": "Example Pvt Ltd",
  "email": "john@example.com",
  "message": "I want to discuss a project."
}
```

Submissions are stored in the MongoDB `contacts` collection.

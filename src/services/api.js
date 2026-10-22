import axios from "axios";

/**
 * Shared Axios client for the MERN backend.
 *
 * Set VITE_API_URL in a .env file (see .env.example) to point this at
 * your Express API, e.g. http://localhost:5001/api in development or
 * https://api.omnivera.io/api in production. Until a backend exists,
 * calls made through this client will fail with a network error — the
 * UI (see Contact.jsx) already handles that gracefully.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

/**
 * POST /contact — submit the contact form to the backend.
 * Expected Express route: router.post("/contact", contactController.create)
 * Suggested Mongoose shape: { name, company, email, message, createdAt }
 */
export function submitContactForm(payload) {
  return api.post("/contact", payload);
}

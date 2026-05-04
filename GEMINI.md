# Gemini CLI Project Instructions

This document outlines the setup, configuration, and conventions for the Gemini CLI within this project.

## 🚀 Project Overview

This project is a full-stack blog application featuring a modern, glassmorphic UI, an admin panel for content management, and a public-facing blog. It utilizes React for the frontend and Node.js (Express) for the backend, with MongoDB as the database.

## ⚙️ Technologies Used

-   **Frontend:** React, Vite, TypeScript, Framer Motion, Lucide React, React Router DOM
-   **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Bcryptjs, CORS, Dotenv
-   **Deployment:** Vercel (for serverless backend and static frontend)
-   **Styling:** Vanilla CSS with custom properties for a glassmorphism effect.

## 🛠️ Development Setup

### 1. Local Environment
-   **Node.js:** Ensure you have Node.js installed (v20+ recommended).
-   **Dependencies:** Install project dependencies using `npm install`.
-   **Environment Variables:** Create a `.env` file in the root directory with the following variables:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    PORT=3000
    ```
-   **Admin User:** Create an admin user by running `node scripts/setup-admin.js <username> <password>`.
-   **Run Locally:**
    -   Backend: `node server.js`
    -   Frontend: `npm run dev`

### 2. Deployment (Vercel)
The project is configured for Vercel deployment.
-   **Build Command:** `npm run build`
-   **Vercel Configuration:** The `vercel.json` file handles routing for both the serverless backend and the static frontend. It maps `/api` routes to the backend and serves `index.html` for all other frontend requests.
-   **Environment Variables:** Ensure `MONGODB_URI`, `JWT_SECRET`, and `NODE_ENV=production` are set in your Vercel project settings.

## 🔑 Authentication

-   **Admin Login:** Access the login page at `/login`.
-   **Credentials:** Default admin credentials are `hairth` / `Zacks911`. These can be reset or created using `scripts/setup-admin.js` or the emergency setup route on Vercel if local execution fails.
-   **JWT:** Authentication tokens are managed via JWT and stored in local storage.

## 📝 Project Structure

-   **`/backend`**: Contains the Node.js Express server, routes, models, and middleware.
-   **`/public`**: Static assets served directly.
-   **`/scripts`**: Utility scripts, such as admin setup.
-   **`/src`**: Frontend React application.
    -   **`/assets`**: Images and other static frontend assets.
    -   **`/components`**: Reusable UI components.
    -   **`/context`**: React Context providers (e.g., `AuthContext`).
    -   **`/hooks`**: Custom React hooks.
    -   **`/pages`**: Top-level page components.
    -   **`/styles`**: Global CSS styles.
-   **`vite.config.ts`**: Vite build tool configuration.
-   **`eslint.config.js`**: ESLint configuration for code linting.
-   **`tsconfig.json`**: TypeScript configuration.
-   **`vercel.json`**: Vercel deployment configuration.

## 🐞 Troubleshooting

-   **`ECONNREFUSED` (Local DB Connection):** Often due to local firewall/network issues. Use the deployed emergency setup route (`/api/auth/setup-admin-emergency`) on Vercel if local script execution fails.
-   **`500 Internal Server Error` (Login/API):** Check Vercel logs for specific backend errors. Ensure `MONGODB_URI` and `JWT_SECRET` are correctly set in Vercel's environment variables and that MongoDB Atlas IP whitelisting is configured correctly (allow `0.0.0.0/0`).
-   **White Screen / 404 Assets:** Verify `vercel.json` routing and Vercel project settings (Framework Preset: `Vite`, Output Directory: `dist`). Ensure `dist/index.html` is correctly served.
-   **Empty Dashboard / Edit Failures:** Ensure posts exist in the database. If creating posts also fails, check Vercel logs for errors related to post creation/saving.

## ✉️ Contact Information

This project does not have a hardcoded contact email address within its codebase that is directly used for directing inquiries. The `Contact.tsx` component provides a form for users to submit messages, but the submission handling logic (e.g., sending an email) is not implemented within the provided backend code. If an email submission mechanism is desired, it would need to be implemented in the `Contact.tsx` component and a corresponding backend endpoint.

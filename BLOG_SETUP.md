# Blog System Setup Guide

This project now includes a full-stack blog system with an admin panel.

## 🛠 Features
- **Public Blog:** View recent updates and projects.
- **Admin Panel:** Securely create, edit, and delete posts.
- **Database:** Powered by MongoDB.
- **Auth:** JWT-based authentication for the admin.

## 🚀 Local Setup

### 1. Database Configuration
Create a `.env` file in the root directory (one has been created for you locally) with the following:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```

### 2. Admin Account Setup
To create your admin user, run the following command in your terminal:
```bash
node scripts/setup-admin.js <username> <password>
```

### 3. Running the App
You need to run both the backend and frontend:

- **Backend:** `node server.js`
- **Frontend:** `npm run dev`

Navigate to `http://localhost:5173/login` to sign in.

## 🌐 Deployment Note (Netlify/Render)

### Netlify (Current)
Netlify is a static host and **does not run Node.js/Express servers**. 
- The frontend will build, but the API calls to `/api/...` will fail.
- To use Netlify, you must move the `backend/` logic to a serverless function or host it on a platform like Render.

### Render.com (Recommended)
Render supports "Web Services" which can run your `server.js` and serve the frontend at the same time.
1. Connect your GitHub.
2. Build Command: `npm install; npm run build`
3. Start Command: `node server.js`
4. Add Environment Variables in the Render dashboard.

## 📝 Admin Credentials
If you used the setup I provided:
- **Username:** `hairth`
- **Password:** `Zacks911`

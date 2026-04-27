# Mohammad Aqib — Portfolio Backend
## Node.js + Express + MongoDB REST API

---

## 📁 Project Structure

```
portfolio-backend/
├── src/
│   ├── server.js              # Entry point
│   ├── app.js                 # Express setup, middleware, routes
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── seed.js            # Seed DB with resume data
│   ├── models/
│   │   ├── Experience.model.js
│   │   ├── Project.model.js
│   │   ├── Contact.model.js
│   │   ├── Admin.model.js
│   │   └── Stat.model.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── contact.controller.js
│   │   ├── experience.controller.js
│   │   ├── project.controller.js
│   │   └── stats.controller.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── contact.routes.js
│   │   ├── experience.routes.js
│   │   ├── project.routes.js
│   │   └── stats.routes.js
│   ├── middleware/
│   │   └── auth.middleware.js  # JWT protect
│   └── api.service.js          # Copy to React frontend: src/services/api.js
```

---

## 🚀 Setup & Run

### 1. Install dependencies
```bash
cd portfolio-backend
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env with your actual values:
#   MONGO_URI — your MongoDB connection string
#   JWT_SECRET — any long random string
#   EMAIL_USER / EMAIL_PASS — Gmail + App Password
#   CLIENT_URL — your React app URL (e.g. http://localhost:5173)
```

### 3. Seed the database
```bash
npm run seed
# This populates MongoDB with your resume data and creates the admin account
```

### 4. Start the server
```bash
npm run dev      # Development (nodemon, auto-restart)
npm start        # Production
```

Server runs on: **http://localhost:5000**

---

## 📡 API Endpoints

### Public (no auth needed)
| Method | Endpoint           | Description                        |
|--------|--------------------|------------------------------------|
| GET    | /api/health        | Health check                       |
| GET    | /api/experience    | Get all experience entries         |
| GET    | /api/projects      | Get all projects                   |
| GET    | /api/projects/:id  | Get single project                 |
| POST   | /api/contact       | Submit contact form (sends email)  |
| POST   | /api/stats/visit   | Track a page visit                 |

### Auth
| Method | Endpoint       | Description         |
|--------|----------------|---------------------|
| POST   | /api/auth/login| Admin login → token |
| GET    | /api/auth/me   | Get current admin   |

### Admin (requires Bearer token)
| Method | Endpoint                | Description           |
|--------|-------------------------|-----------------------|
| GET    | /api/stats              | Dashboard stats       |
| GET    | /api/contact            | All messages          |
| PATCH  | /api/contact/:id/read   | Mark message as read  |
| DELETE | /api/contact/:id        | Delete message        |
| POST   | /api/experience         | Add experience        |
| PUT    | /api/experience/:id     | Update experience     |
| DELETE | /api/experience/:id     | Delete experience     |
| POST   | /api/projects           | Add project           |
| PUT    | /api/projects/:id       | Update project        |
| DELETE | /api/projects/:id       | Delete project        |

---

## 🔗 Connect to React Frontend

### Step 1 — Copy the API service
```bash
cp src/api.service.js ../portfolio/src/services/api.js
```

### Step 2 — Add env var to React app
In `portfolio/.env`:
```
VITE_API_URL=http://localhost:5000/api
```

### Step 3 — Replace components
- Replace `src/components/Experience.jsx` with content from `src/Experience.api.jsx`
- Replace `src/components/Contact.jsx` with content from `src/Contact.api.jsx`
- Append `src/Contact.form.css` to `src/components/Contact.css`

### Step 4 — Track visits in App.jsx
```jsx
import { useEffect } from "react";
import { api } from "./services/api";

// Inside App() component:
useEffect(() => { api.trackVisit(); }, []);
```

---

## 📧 Gmail App Password Setup
1. Go to Google Account → Security → 2-Step Verification (enable it)
2. Go to App Passwords → Generate one for "Mail"
3. Use that 16-char password as `EMAIL_PASS` in your `.env`

---

## 🔐 Admin Login
Default credentials (from seed):
- **Email:** admin@mohammadaqib.com
- **Password:** Admin@1234

**Change these in `.env` before deploying!**

---

## ☁️ Deploy to Production

**Backend → Railway / Render / AWS EC2**
```bash
# Set environment variables in your hosting dashboard
# Use MongoDB Atlas for MONGO_URI
NODE_ENV=production
```

**Frontend → Vercel / Netlify**
```bash
# Set in Vercel dashboard:
VITE_API_URL=https://your-backend-url.com/api
```

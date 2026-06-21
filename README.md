# 🎓 Ateion — Capability-First Education Ecosystem

Ateion is a premium, high-value global education platform designed to replace memory-based validation with actual capability-first learning and verification.

---

## 🏗️ Project Architecture

The application is structured as a monorepo containing both the frontend and backend services:

```
Ateion-Updated/
├── backend/            # Spring Boot (Java 17 + Maven) backend service
│   ├── src/
│   ├── Dockerfile
│   └── docker-compose.yml
├── frontend/           # React + Vite (TypeScript + Tailwind/shadcn) frontend service
│   ├── src/
│   ├── docs/           # Documentation and design system audits
│   ├── guidelines/     # Project coding guidelines
│   ├── Dockerfile
│   └── docker-compose.yml
├── docker-compose.yml  # Root orchestration config for full-stack local development
└── README.md           # This project guide
```

---

## 🛠️ Local Development Setup

You can run the application either using **Docker Compose (Recommended)** or via **Manual setup**.

### Option A: Docker Compose (Recommended) 🚀

This starts both the frontend and backend services in containers with hot-reloading enabled.

1. **Clone the repository** and navigate to the project root.
2. **Setup environment variables**:
   Create a `.env` file at the root by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase connection strings and YouTube API keys in the `.env` file.
3. **Run Docker Compose**:
   ```bash
   docker-compose up --build
   ```
   - **Frontend** will be available at: [http://localhost:3000](http://localhost:3000)
   - **Backend** API will be running at: [http://localhost:8080](http://localhost:8080)
   - The containers mount the local directory to support hot-reloading.

---

### Option B: Manual Setup 💻

#### 1. Backend (Spring Boot)
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Copy the `.env` file from the root to `backend/.env` (or ensure root `.env` is populated).
3. Build and run the service using Maven:
   ```bash
   mvn spring-boot:run -DskipTests
   ```
   The API will be available at [http://localhost:8080](http://localhost:8080).

#### 2. Frontend (React + Vite)
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the node modules:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at [http://localhost:3000](http://localhost:3000) (or the port specified by Vite).

---

## 🌐 Production Deployment Guide

### 1. Supabase (Database)
- Create a new project on [Supabase](https://supabase.com).
- Go to **Settings → Database** and copy the JDBC connection URL, username, and password.

### 2. Render (Backend Deployment)
- Create a new **Web Service** on [Render](https://render.com) and connect your GitHub repository.
- Set **Language** to `Docker`.
- Set **Root Directory** to `backend`.
- Add the following environment variables in the Render console:
  - `ALLOWED_ORIGINS` (e.g., your Vercel deployment URL or `*`)
  - `SPRING_DATASOURCE_URL` (JDBC connection string)
  - `SPRING_DATASOURCE_USERNAME`
  - `SPRING_DATASOURCE_PASSWORD`
  - `YOUTUBE_API_KEY`
- Deploy the service and copy the provided backend URL.

### 3. Vercel (Frontend Deployment)
- Create a new project on [Vercel](https://vercel.com) and import the repository.
- Set the **Root Directory** to `frontend`.
- Add the following environment variable:
  - `VITE_API_BASE_URL` = `https://your-backend-name.onrender.com/api` (using your Render backend URL)
- Deploy the frontend.

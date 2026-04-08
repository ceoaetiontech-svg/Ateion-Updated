# Deployment Guide

1. **Supabase** → Create a new project → Go to **Settings → Database** → Copy the JDBC connection URL, username, and password.

2. **Render** → New Web Service → Connect GitHub repo → Set **Language: Docker** and **Root Directory: `backend`** → Add 4 environment variables: `ALLOWED_ORIGINS`, `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD` → Deploy → Copy your backend URL.

3. **Vercel** → New Project → Import GitHub repo → Set **Root Directory: `frontend`** → Add 1 environment variable: `VITE_API_BASE_URL=https://your-backend-name.onrender.com/api` → Deploy.
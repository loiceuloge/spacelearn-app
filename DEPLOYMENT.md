# 🚀 SpaceLearn Deployment Guide

## Overview
SpaceLearn is a full-stack spaced repetition learning application that helps optimize long-term memory retention.

## Architecture
- **Frontend**: React.js + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js + MongoDB
- **Database**: MongoDB Atlas (cloud)

## Deployment Strategy

### 🎯 Frontend Deployment (Netlify)

1. **Navigate to the client directory**:
   ```bash
   cd client/
   ```

2. **Build the project**:
   ```bash
   npm install
   npm run build
   ```

3. **Deploy to Netlify**:
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Set base directory: `client`

4. **Environment Variables on Netlify**:
   - `VITE_API_BASE_URL` = `https://your-backend-url.railway.app/api`

### 🚆 Backend Deployment (Railway/Render)

1. **Choose a platform**:
   - **Railway** (recommended): https://railway.app
   - **Render**: https://render.com
   - **Heroku**: https://heroku.com

2. **Environment Variables**:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/revision-app
   PORT=5000
   ```

3. **Deploy settings**:
   - Build command: `npm install`
   - Start command: `npm start`
   - Root directory: `server`

### 🔧 Configuration Files

#### Frontend (`client/netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Backend (`server/package.json`):
```json
{
  "engines": {
    "node": ">=18.0.0"
  },
  "scripts": {
    "start": "node server.js"
  }
}
```

## 📋 Deployment Checklist

### Backend First:
- [ ] Deploy backend to Railway/Render
- [ ] Set environment variables
- [ ] Test API endpoints
- [ ] Note the backend URL

### Frontend Second:
- [ ] Update `VITE_API_BASE_URL` in Netlify
- [ ] Deploy frontend to Netlify
- [ ] Test the full application

## 🔗 API Endpoints

- `GET /api/items` - Get all learning items
- `POST /api/items` - Create new item
- `GET /api/items/due-today` - Get items due for review
- `PUT /api/items/:id/review` - Update after review
- `GET /api/reviews/stats` - Get learning statistics
- `DELETE /api/reviews/reset-all` - Reset all data

## 🌐 Environment Variables

### Frontend (Netlify):
```
VITE_API_BASE_URL=https://your-backend-url.railway.app/api
```

### Backend (Railway/Render):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/revision-app
PORT=5000
NODE_ENV=production
```

## 🚀 Quick Deploy Commands

### Frontend:
```bash
cd client
npm install
npm run build
# Upload dist/ folder to Netlify
```

### Backend:
```bash
cd server
# Push to GitHub
# Connect GitHub repo to Railway/Render
```

## 📱 Features
- ✨ Modern glassmorphism UI
- 🧠 Spaced repetition algorithm
- 📊 Learning statistics and progress
- 📱 Responsive design
- 🎯 Optimized for long-term retention

## 🔧 Troubleshooting

### Common Issues:
1. **CORS errors**: Ensure backend allows frontend domain
2. **API not found**: Check VITE_API_BASE_URL is correct
3. **Database connection**: Verify MongoDB Atlas connection string
4. **Build fails**: Check Node.js version compatibility

### Support:
- Check browser console for errors
- Verify environment variables are set
- Test API endpoints directly
# SpaceLearn Backend API

## Description
Backend API for SpaceLearn - Spaced Repetition Learning Application

## Features
- RESTful API for learning items management
- Spaced repetition algorithm implementation
- Learning statistics and progress tracking
- MongoDB integration

## Environment Variables Required
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)

## API Endpoints
- `GET /api/items` - Get all learning items
- `POST /api/items` - Create new item
- `GET /api/items/due-today` - Get items due for review
- `PUT /api/items/:id/review` - Update after review
- `GET /api/reviews/stats` - Get learning statistics

## Start Server
```bash
npm install
npm start
```
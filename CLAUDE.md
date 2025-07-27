# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a spaced repetition learning application ("Application de Révision - Mémoire à Long Terme") designed to optimize long-term memory retention. The app helps users organize their revision sessions using scientifically-backed spaced repetition intervals.

## Architecture

The application follows a client-server architecture:

- **Frontend**: React.js application (`client/` directory)
- **Backend**: Node.js + Express.js API server (`server/` directory) 
- **Database**: MongoDB for data persistence
- **Styling**: Tailwind CSS

## Key Components Structure

Based on the README documentation, the codebase is organized as follows:

### Frontend (`client/`)
- `src/components/ItemsInput.js` - Component for daily item input
- `src/components/ReviewsList.js` - Component for displaying daily reviews
- `src/components/Navigation.js` - Tab navigation component
- `src/services/api.js` - API calls to backend
- `src/services/spaceRepetition.js` - Spaced repetition algorithm logic
- `src/utils/dateHelpers.js` - Date manipulation utilities
- `src/App.js` - Main application component

### Backend (`server/`)
- `controllers/itemsController.js` - Business logic for learning items
- `controllers/reviewsController.js` - Business logic for reviews
- `models/Item.js` - MongoDB model for learning items
- `models/Review.js` - MongoDB model for reviews
- `routes/items.js` - API routes for items
- `routes/reviews.js` - API routes for reviews
- `config/database.js` - MongoDB configuration
- `middleware/auth.js` - Authentication middleware
- `server.js` - Server entry point

## Development Commands

Based on the README installation instructions:

### Setup
```bash
# Install server dependencies
cd server && npm install

# Install client dependencies  
cd client && npm install
```

### Running the Application
```bash
# Start backend server (from server/ directory)
npm start

# Start frontend client (from client/ directory, in separate terminal)
npm start
```

### Environment Configuration
Create `.env` file at project root:
```
MONGODB_URI=mongodb://localhost:27017/revision-app
PORT=5000
```

## Core Algorithm

The spaced repetition system uses progressive intervals:
- 1st revision: J+1 (next day)
- 2nd revision: J+3 (3 days after learning)
- 3rd revision: J+7 (1 week after)
- 4th revision: J+15 (2 weeks after)
- 5th revision: J+30 (1 month after)
- Subsequent revisions: Increasing intervals

## Application URLs
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Prerequisites
- Node.js (version 14+)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

**Note**: This repository currently contains only documentation. The actual code files referenced in the README structure have not yet been implemented.
# 🧠 SpaceLearn - Long-Term Memory Learning App

A modern spaced repetition learning application designed to optimize long-term memory retention using scientifically-backed learning techniques.

## 🎯 Purpose

SpaceLearn helps you organize your study sessions efficiently by implementing a spaced repetition system. It automatically calculates optimal review dates for each learned item, maximizing long-term retention while minimizing study time.

## ✨ Features

### 📝 Daily Item Input
- **Daily Recording**: Easily add topics you've learned throughout the day
- **Clear Organization**: Each item is represented by a descriptive title
- **Date Grouping**: All items are automatically associated with their learning date
- **Intuitive Interface**: Quick and efficient entry of new learning items

### 🔄 Daily Reviews
- **Automated Scheduling**: Display items to review according to calculated intervals
- **Review Tracking**: Mark reviews as completed
- **Daily Overview**: Visualize your daily review workload
- **Progress Statistics**: Track your learning progress with visual charts

### 📊 Statistics Dashboard
- **Learning Progress**: Visual representation of your learning journey
- **Review Completion**: Track completed vs pending reviews
- **Performance Metrics**: Monitor your retention and study consistency

## 🧠 Spaced Repetition System

The application uses an optimized spaced repetition algorithm:

```
Learning Day (D) → First Review (D+1) → Second Review (D+3) → Third Review (D+7) → etc.
```

**Principle**: Review intervals progressively increase, strengthening long-term memorization while optimizing study time.

## 🚀 Live Demo

- **Frontend**: [https://spacelearn-app.netlify.app](https://spacelearn-app.netlify.app)
- **Backend API**: [https://spacelearn-backend.onrender.com](https://spacelearn-backend.onrender.com)

## 🔧 Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/loiceuloge/spacelearn-app.git
   cd spacelearn-app
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**
   Create a `.env` file in the `server/` directory:
   ```bash
   cd ../server
   echo "MONGODB_URI=mongodb://localhost:27017/revision-app" > .env
   echo "PORT=5001" >> .env
   ```

5. **Start the backend server**
   ```bash
   npm start
   ```

6. **Start the frontend client** (in a new terminal)
   ```bash
   cd ../client
   npm start
   ```

7. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5001`

## 📱 Usage Guide

### Adding Learning Items

1. Navigate to the **"Daily Items"** tab
2. Enter the title of what you learned
3. Click **"Add Item"**
4. The app automatically calculates review dates

### Performing Reviews

1. Check the **"Reviews"** tab
2. Review each displayed item
3. Mark reviews as completed
4. The app automatically schedules the next review

### Tracking Progress

1. Visit the **"Statistics"** tab
2. Monitor your learning progress with visual charts
3. Track completion rates and learning streaks

## 🏗️ Project Structure

```
spacelearn-app/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ItemsInput.jsx      # Item input component
│   │   │   ├── ReviewsList.jsx     # Reviews display component
│   │   │   ├── Statistics.jsx      # Statistics dashboard
│   │   │   └── Navigation.jsx      # Tab navigation
│   │   ├── services/
│   │   │   ├── api.js              # API calls to backend
│   │   │   └── spaceRepetition.js  # Spaced repetition logic
│   │   ├── utils/
│   │   │   └── dateHelpers.js      # Date manipulation utilities
│   │   └── App.jsx                 # Main application component
│   ├── public/
│   └── package.json
├── server/                     # Express Backend
│   ├── controllers/
│   │   ├── itemsController.js      # Items business logic
│   │   └── reviewsController.js    # Reviews business logic
│   ├── models/
│   │   ├── Item.js                 # MongoDB Item model
│   │   └── Review.js               # MongoDB Review model
│   ├── routes/
│   │   ├── items.js                # Items API routes
│   │   └── reviews.js              # Reviews API routes
│   ├── config/
│   │   └── database.js             # MongoDB configuration
│   ├── middleware/
│   │   └── auth.js                 # Authentication middleware
│   ├── server.js                   # Server entry point
│   └── package.json
├── netlify.toml                # Netlify deployment config
└── README.md
```

## 🛠️ Tech Stack

- **Frontend**: React.js + Vite
- **Backend**: Node.js + Express.js
- **Database**: MongoDB Atlas
- **Styling**: Tailwind CSS
- **Deployment**: Netlify (Frontend) + Render (Backend)
- **Design**: Modern Glassmorphism UI

## 📊 Spaced Repetition Algorithm

The application implements the following review schedule:

| Review # | Interval | Description |
|----------|----------|-------------|
| 1st | D+1 | Review next day |
| 2nd | D+3 | Review 3 days after learning |
| 3rd | D+7 | Review 1 week after |
| 4th | D+15 | Review 2 weeks after |
| 5th | D+30 | Review 1 month after |
| 6th+ | Progressive intervals | Increasing spacing |

## 🎨 Design Features

- **Modern Glassmorphism**: Beautiful frosted glass effects
- **Gradient Backgrounds**: Stunning color transitions
- **Responsive Design**: Works perfectly on all devices
- **Dark Mode Ready**: Optimized for various lighting conditions
- **Smooth Animations**: Delightful user interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the Leitner system and modern spaced repetition research
- Built with modern web technologies for optimal performance
- Designed for learners who value efficiency and beautiful interfaces

---

**Happy Learning! 🎓✨**
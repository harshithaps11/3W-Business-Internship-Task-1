# 🏆 Full-Stack Leaderboard Application

A modern, responsive leaderboard application built with Node.js, Express, MongoDB, and React. Features real-time updates, beautiful UI design, and comprehensive user management.

## ✨ Features

### Backend (Node.js + Express + MongoDB)
- **RESTful API** with proper MVC architecture
- **MongoDB** collections for Users and History
- **Point claiming system** with random rewards (1-10 points)
- **Leaderboard ranking** with automatic sorting
- **Claim history tracking** with pagination
- **Error handling** and validation

### Frontend (React + TypeScript + Tailwind CSS)
- **Modern, responsive design** with mobile-first approach
- **Top 3 winners showcase** with crowns and special effects
- **User selection** with dropdown and add new user functionality
- **Point claiming** with visual feedback and animations
- **Masked points display** for competitive privacy (X****Y format)
- **Real-time updates** after claiming points
- **Timer countdown** for daily resets
- **Tabs** for Daily/Monthly views
- **Rewards button** for future features

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or cloud service)
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/leaderboard
PORT=5001
```

3. **Start MongoDB:**
Make sure MongoDB is running on your system.

4. **Run the application:**
```bash
npm run dev
```

This will start both the backend server (port 5000) and frontend client (port 5173) concurrently.

## 📡 API Endpoints

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Add new user
- `POST /api/users/claim` - Claim points for a user

### Leaderboard
- `GET /api/leaderboard` - Get ranked leaderboard

### History
- `GET /api/history` - Get claim history with pagination

## 🎨 Design Features

- **Golden gradient backgrounds** with soft shadows
- **Crown icons** for top 3 positions (gold/silver/bronze)
- **Floating animations** and hover effects
- **Masked points** for competitive privacy
- **Responsive design** for all screen sizes
- **Modern typography** with Poppins font
- **Purple/pink gradient** color scheme

## 🏗️ Project Structure

```
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── src/
│   ├── components/
│   ├── services/
│   └── App.tsx
└── README.md
```

## 🛠️ Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS
- dotenv

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Axios
- Lucide React (icons)
- Vite

## 🎯 Future Enhancements

- Socket.io for real-time updates
- User authentication
- Profile pictures upload
- Monthly/weekly leaderboards
- Achievement system
- History filtering and search
- Dark mode support

## 📱 Mobile Responsive

The application is fully responsive and optimized for:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktops (1024px+)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
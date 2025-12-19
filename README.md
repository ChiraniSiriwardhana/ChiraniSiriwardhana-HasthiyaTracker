# 🐘 HasthiyaTracker

A full-stack project management application built with React, TypeScript, and Express. Track and manage HIT projects with an intuitive interface and powerful features.

## 📋 Features

- **Project Management**: Create, edit, and delete projects
- **Status Tracking**: Monitor project progress with visual status indicators (Planning, Active, On Hold, Completed, Cancelled)
- **Search & Filter**: Quickly find projects by name or filter by status
- **Responsive Design**: Modern UI with Tailwind CSS v4
- **Real-time Updates**: Hot module replacement for instant development feedback

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite 7.2.4** - Lightning-fast build tool
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **ESLint** - Code quality and consistency

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.2.1** - Web application framework
- **TypeScript** - Type-safe backend development
- **MySQL2** - Database connection
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
HasthiyaTracker/
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ProjectModal.tsx
│   │   ├── services/         # API services
│   │   │   └── api.ts
│   │   ├── types/            # TypeScript definitions
│   │   │   └── project.types.ts
│   │   ├── utils/            # Helper functions
│   │   ├── App.tsx           # Main application
│   │   └── main.tsx          # Entry point
│   ├── public/               # Static assets
│   └── package.json
│
└── backend/
    ├── src/
    │   ├── config/           # Configuration files
    │   │   └── database.ts
    │   ├── controllers/      # Request handlers
    │   │   └── project.controller.ts
    │   ├── routes/           # API routes
    │   │   └── project.routes.ts
    │   ├── types/            # TypeScript definitions
    │   │   └── project.types.ts
    │   └── server.ts         # Express server
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- MySQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ChiraniSiriwardhana/ChiraniSiriwardhana-HasthiyaTracker.git
   cd ChiraniSiriwardhana-HasthiyaTracker
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the backend directory:
   ```env
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=hasthiya_tracker
   PORT=3000
   ```

5. **Set up the database**
   
   Create the necessary database and tables using your MySQL client.

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:3000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173` or `http://localhost:5174`

3. **Open your browser**
   
   Navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## 📝 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled production server

## 🎨 UI Features

- **Enhanced Modal**: Blur backdrop with spacious form layout
- **Status Indicators**: Rounded rectangle badges with project counts
- **Responsive Cards**: Adjustable project cards with consistent spacing
- **Search Bar**: Real-time project filtering
- **Action Buttons**: Intuitive Edit and Delete functionality

## 🔧 Development Notes

### Tailwind CSS v4
This project uses Tailwind CSS v4, which has a different architecture:
- Uses `@import "tailwindcss"` instead of a config file
- Custom theme defined in `@theme` block in `index.css`
- Supports arbitrary values and modern CSS features

### Hot Module Replacement
The development server supports HMR for instant updates. If styles don't update:
1. Hard refresh: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Restart the dev server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## 👤 Author

**Chirani Siriwardhana**

- GitHub: [@ChiraniSiriwardhana](https://github.com/ChiraniSiriwardhana)

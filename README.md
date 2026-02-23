# AI-Powered Task Manager Web Application

## Project Overview
This is a complete, production-ready AI-Powered Task Manager Web Application. It allows users to securely register and log in, manage their daily tasks with priorities, and use AI features to generate productive task suggestions that help structure their day.

## Tech Stack
### Backend
- **Node.js & Express.js** for the server framework.
- **MongoDB (Mongoose)** for the database.
- **JWT Authentication** (via `jsonwebtoken`) and password hashing (via `bcrypt`).
- **Axios** for AI API communication.
- **dotenv** for secret management.

### Frontend
- **React.js** (built with Vite for fast HMR).
- **React Router** for page navigation.
- **Axios** for API requests.
- **Vanilla CSS** with a modern, dynamic, and clean UI design system (implemented in `index.css`).

## Folder Structure
```text
ai-task-manager/
│── backend/
│   │── config/
│   │   └── db.js
│   │── controllers/
│   │   ├── aiController.js
│   │   ├── authController.js
│   │   └── taskController.js
│   │── middleware/
│   │   └── authMiddleware.js
│   │── models/
│   │   ├── Task.js
│   │   └── User.js
│   │── routes/
│   │   ├── aiRoutes.js
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   │── server.js
│   │── .env
│   └── package.json
│
└── frontend/
    │── src/
    │   │── components/
    │   │   ├── TaskForm.jsx
    │   │   ├── TaskItem.jsx
    │   │   └── TaskList.jsx
    │   │── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   └── Signup.jsx
    │   │── services/
    │   │   └── api.js
    │   │── App.jsx
    │   │── index.css
    │   └── main.jsx
    │── index.html
    │── package.json
    └── vite.config.js
```

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally, or a MongoDB Atlas URI.

### 1. Installation Steps
Clone the project or navigate to the project directory:

```bash
cd ai-task-manager
```

### 2. Backend Setup
Navigate to the `backend` folder, install dependencies, and setup environment variables.

```bash
cd backend
npm install
```

Ensure `.env` inside `backend/` has the following variables:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ai_task_manager
JWT_SECRET=supersecretjwtkey123
OPENAI_API_KEY=your_openai_api_key_here
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the `frontend` folder, and install dependencies.

```bash
cd frontend
npm install
```

Start the React development server:
```bash
npm run dev
```

### 4. How to Run
Once both servers are running:
- The **Backend API** runs on `http://localhost:5000`
- The **Frontend App** runs on `http://localhost:3000` (or whatever Vite assigns, usually 3000 or 5173). 

Open your browser and navigate to the frontend URL.

## API Documentation

### Authentication Routes (`/api/auth`)
- `POST /signup`: Register a new user. Body: `{ "name": "John Doe", "email": "john@test.com", "password": "123" }`
- `POST /login`: Login an existing user. Body: `{ "email": "john@test.com", "password": "123" }`

### Task Routes (`/api/tasks`) - *Requires Bearer Token Header*
- `GET /`: Retrieve all tasks for the logged-in user.
- `POST /`: Create a new task. Body: `{ "title": "Buy Milk", "description": "2 gallons", "priority": "High" }`
- `DELETE /:id`: Delete a specific task by ID.

### AI Routes (`/api/ai`) - *Requires Bearer Token Header*
- `POST /suggest`: Request productivity suggestions from the AI. Returns:
```json
{
  "suggestions": [
    "Plan weekly goals",
    "Clean workspace",
    "Read 20 pages of a book",
    "Exercise for 30 minutes",
    "Review unfinished tasks"
  ]
}
```



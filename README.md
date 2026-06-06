**SafeCam Backend**

A robust Node.js/Express backend API for the SafeCam surveillance system. It handles user authentication, alert management, real-time communication via WebSockets, and integrates with a MongoDB database. Designed to work seamlessly with the companion [SafeCam Dashboard](https://github.com/Manith003/safecam-dashboard) frontend.

### Features
- **User Authentication**: Secure registration, login, logout, and protected user data retrieval using JWT tokens stored in HTTP-only cookies.
- **Alert Management**: Create, confirm, dismiss, and retrieve security alerts.
- **Real-time Communication**: Socket.io integration for live updates (e.g., camera feeds or instant alerts).
- **Database Integration**: Mongoose ODM for MongoDB with user and alert models.
- **Security**: Password hashing with bcrypt, CORS configured for the frontend, and environment-based configuration.
- **RESTful API**: Clean route structure for auth and alerts.

### Tech Stack
- **Runtime**: Node.js
- **Framework**: Express 5
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Tokens (jsonwebtoken) + bcryptjs
- **Real-time**: Socket.io
- **Utilities**: dotenv, cookie-parser, cors, axios
- **Development**: Nodemon

### Project Structure
```
safecam-backend/
├── src/
│   ├── controllers/     # Business logic (auth.controller.js, alert.controller.js)
│   ├── db/              # Database connection (db.js)
│   ├── models/          # Mongoose schemas (user.model.js, alert.model.js)
│   ├── routes/          # API routes (auth.routes.js, alert.routes.js)
│   ├── services/        # Additional services
│   ├── socket/          # Socket.io initialization
│   └── app.js           # Express app setup and middleware
├── server.js            # Entry point (starts server + socket)
├── package.json
├── .env                 # Environment variables (MONGO_URL, JWT_SECRET, etc.)
└── .gitignore
```

### Getting Started

#### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)

#### Installation
```bash
# Clone the repository
git clone https://github.com/Manith003/safecam-backend.git
cd safecam-backend

# Install dependencies
npm install
```

#### Environment Variables
Create a `.env` file in the root directory:
```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000  # Optional, defaults to 3000
```

#### Development
```bash
npm run dev
```
The server will start on `http://localhost:3000`.

#### Production
```bash
node server.js
```

### API Endpoints

#### Authentication (`/api/auth`)
- `POST /register` — Register a new user
- `POST /login` — Login and receive JWT cookie
- `POST /logout` — Logout (clear cookie)
- `GET /user` — Get current authenticated user

#### Alerts (`/api/alert`)
- `POST /new` — Create a new alert
- `POST /confirm` — Confirm an alert
- `POST /dismiss` — Dismiss an alert
- `GET /all` — Retrieve all alerts

### Usage
1. Start the backend server.
2. The frontend dashboard (running on port 5173) communicates via these endpoints with credentials enabled.
3. Real-time features are handled through the Socket.io connection initialized on the HTTP server.

### Contributing
Contributions are welcome! Please:
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes with clear messages.
4. Push and open a Pull Request.

Ensure code follows existing patterns and passes any future linting/tests.

### License
This project is licensed under the ISC License.

### Acknowledgments
- Built with Express, Mongoose, and Socket.io.
- Designed as the backend companion to the SafeCam Dashboard React frontend.

For issues, feature requests, or integration questions, open an issue on GitHub.

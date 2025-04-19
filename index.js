import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";

// Routes
import Hello from "./Hello.js";
import Lab5Routes from "./Lab5/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";

const app = express();

const isProduction = process.env.NODE_ENV === "production";
const FRONTEND_ORIGINS = [
  "http://localhost:5173",
  "https://kambazwebdev.netlify.app",
];

// ✅ Mongo Connection
const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING);

// ✅ CORS Middleware
app.use(
  cors({
    credentials: true,
    origin: FRONTEND_ORIGINS,
  })
);

// ✅ Trust proxy for Render HTTPS sessions
app.set("trust proxy", 1);

// ✅ Session Config
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  proxy: isProduction,
  cookie: {
    sameSite: isProduction ? "none" : "lax", // 👈 needed for cross-site cookies
    secure: isProduction, // 👈 Render is HTTPS, localhost is not
  },
};
app.use(session(sessionOptions));

// ✅ Body Parser
app.use(express.json());

// ✅ Routes
Hello(app);
Lab5Routes(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

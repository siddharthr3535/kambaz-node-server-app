import express from "express";
import Hello from "./Hello.js";
import Lab5Routes from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kambaz/Users/routes.js";
import session from "express-session";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import assignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import "dotenv/config";
import mongoose from "mongoose";
import ModuleRoutes from "./Kambaz/Modules/routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://kambazwebdev.netlify.app",
];

const CONNECTION_STRING =
  process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz";
mongoose.connect(CONNECTION_STRING);

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://kambazwebdev.netlify.app"],
  })
);
app.set("trust proxy", 1);

const isProduction = process.env.NODE_ENV === "production";

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
  proxy: isProduction, // Only needed in production behind a proxy (like Render)
  cookie: {
    sameSite: isProduction ? "none" : "lax", // lax for HTTP local, none for cross-site HTTPS
    secure: isProduction, // true for HTTPS, false for localhost
  },
};
app.use(session(sessionOptions));

app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
Lab5Routes(app);
Hello(app);
assignmentRoutes(app);
ModuleRoutes(app);
EnrollmentRoutes(app);

app.listen(process.env.PORT || 4000);

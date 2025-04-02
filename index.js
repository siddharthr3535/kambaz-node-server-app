import express from "express";
import Hello from "./Hello.js";
import Lab5Routes from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kambaz/Users/routes.js";
import session from "express-session";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import assignmentRoutes from "./Kambaz/Assignments/routes.js";
import "dotenv/config";

import ModuleRoutes from "./Kambaz/Modules/routes.js";
const app = express();

app.use(
  cors({
    credentials: true,
    origin:
      "https://kambazwebdev.netlify.app" ||
      process.env.NETLIFY_URL ||
      "http://localhost:5173",
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));

app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
Lab5Routes(app);
Hello(app);

assignmentRoutes(app);

ModuleRoutes(app);
app.listen(process.env.PORT || 4000);

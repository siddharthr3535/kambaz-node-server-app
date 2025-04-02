import express from "express";
import Hello from "./Hello.js";
import Lab5Routes from "./Lab5/index.js";
const app = express();
Lab5Routes(app);
Hello(app);
app.listen(process.env.PORT || 4000);

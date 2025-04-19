// src/Kambaz/Enrollments/routes.js

import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  // Enroll current user in a course
  app.post("/api/users/current/:courseId/enrollments", async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.sendStatus(401);
    }

    try {
      const result = await dao.enrollUserInCourse(
        currentUser._id,
        req.params.courseId
      );
      res.status(200).json(result);
    } catch (error) {
      console.error("Error enrolling user:", error);
      res.sendStatus(500);
    }
  });

  // Unenroll current user from a course
  app.delete("/api/users/current/:courseId/enrollments", async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.sendStatus(401);
    }

    try {
      const result = await dao.unenrollUserFromCourse(
        currentUser._id,
        req.params.courseId
      );
      res.status(200).json(result);
    } catch (error) {
      console.error("Error unenrolling user:", error);
      res.sendStatus(500);
    }
  });

  // Get all enrollments for current user
  app.get("/api/users/current/enrollments", async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.sendStatus(401);
    }

    try {
      const enrollments = await dao.findEnrollmentsByUser(currentUser._id);

      res.json(enrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      res.sendStatus(500);
    }
  });
}

import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.post("/api/users/current/:courseId/enrollments", (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.sendStatus(401);
    }
    dao.enrollUserInCourse(currentUser._id, req.params.courseId);
    res.sendStatus(200);
  });

  app.delete("/api/users/current/:courseId/enrollments", (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.sendStatus(401);
    }
    dao.unEnrollUserFromCourse(currentUser._id, req.params.courseId);
    res.sendStatus(200);
  });

  app.get("/api/users/current/enrollments", (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.sendStatus(401);
    }
    const enrollments = dao.findEnrollmentsForUser(currentUser._id);
    res.json(enrollments);
  });
}

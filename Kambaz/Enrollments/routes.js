import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.get("/api/enrollments", (req, res) => res.send(dao.findAllEnrollments()));

  app.get("/api/enrollments/user/:uid", (req, res) => {
    const { uid } = req.params;
    res.send(dao.findEnrollmentsForUser(uid));
  });

  app.post("/api/enrollments", (req, res) => {
    const { user, course } = req.body;
    const enrollment = dao.enrollUserInCourse(user, course);
    res.send(enrollment);
  });

  app.delete("/api/enrollments/:eid", (req, res) => {
    const { eid } = req.params;
    const result = dao.unenrollUserFromCourse(eid);
    res.send(result);
  });
}

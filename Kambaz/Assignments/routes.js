import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.get("/api/assignments", (req, res) => {
    res.send(dao.findAllAssignments());
  });

  app.post("/api/assignments", (req, res) => {
    res.send(dao.createAssignment(req.body));
  });

  app.put("/api/assignments/:aid", (req, res) => {
    res.send(dao.updateAssignment(req.params.aid, req.body));
  });

  app.delete("/api/assignments/:aid", (req, res) => {
    res.send(dao.deleteAssignment(req.params.aid));
  });

  // ✅ Course-specific assignments route (now inside function)
  app.get("/api/assignments/course/:courseId", (req, res) => {
    const { courseId } = req.params;
    const assignments = dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });
}

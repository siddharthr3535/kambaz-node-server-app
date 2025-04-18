import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  // Get all assignments
  app.get("/api/assignments", async (req, res) => {
    const assignments = await dao.findAllAssignments();
    res.send(assignments);
  });

  // Create a new assignment
  app.post("/api/assignments", async (req, res) => {
    const newAssignment = await dao.createAssignment(req.body);
    res.send(newAssignment);
  });

  // Update an assignment by ID
  app.put("/api/assignments/:aid", async (req, res) => {
    const status = await dao.updateAssignment(req.params.aid, req.body);
    res.send(status);
  });

  // Delete an assignment by ID
  app.delete("/api/assignments/:aid", async (req, res) => {
    const status = await dao.deleteAssignment(req.params.aid);
    res.send(status);
  });

  // Get all assignments for a course
  app.get("/api/assignments/course/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });
}

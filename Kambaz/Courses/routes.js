import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  // ➕ Create a Module
  app.post("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      const module = {
        ...req.body,
        course: courseId,
      };
      const newModule = await modulesDao.createModule(module);
      res.status(201).send(newModule);
    } catch (err) {
      console.error("❌ Error creating module:", err);
      res.status(500).send("Internal Server Error while creating module");
    }
  });

  // 🔍 Get Modules for a Course
  app.get("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const { courseId } = req.params;
      console.log("🔍 Fetching modules for course:", courseId);
      const modules = await modulesDao.findModulesForCourse(courseId);
      res.json(modules);
    } catch (err) {
      console.error("❌ Error fetching modules:", err);
      res.status(500).send("Internal Server Error while fetching modules");
    }
  });

  // 🔍 Get All Courses
  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });

  // ➕ Create Course + auto enroll
  app.post("/api/courses", async (req, res) => {
    try {
      console.log("📩 Received new course:", req.body);
      const course = await dao.createCourse(req.body);

      const currentUser = req.session["currentUser"];
      console.log("👤 Current user in session:", currentUser);

      if (currentUser) {
        await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
      }

      res.status(201).json(course);
    } catch (error) {
      console.error("💥 Error in POST /api/courses:", error);
      res.status(500).send("Internal Server Error while creating course");
    }
  });

  // 👥 Get Users Enrolled in a Course
  const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
  };
  app.get("/api/courses/:cid/users", findUsersForCourse);

  // ❌ Delete a Course
  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  });

  // 🔄 Update a Course
  app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });
}

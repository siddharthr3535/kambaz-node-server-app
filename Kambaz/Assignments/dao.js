import model from "./model.js";

// Create a new assignment in the database
export const createAssignment = (assignment) => model.create(assignment);

// Find all assignments in the database (optional utility)
export const findAllAssignments = () => model.find();

// Find assignments for a specific course
export const findAssignmentsForCourse = (courseId) =>
  model.find({ course: courseId });

// Update an assignment by ID
export const updateAssignment = (assignmentId, assignment) =>
  model.updateOne({ _id: assignmentId }, { $set: assignment });

// Delete an assignment by ID
export const deleteAssignment = (assignmentId) =>
  model.deleteOne({ _id: assignmentId });

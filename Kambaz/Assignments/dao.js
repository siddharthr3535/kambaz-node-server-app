import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAllAssignments() {
  return Database.assignments;
}

export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: uuidv4() };
  Database.assignments.push(newAssignment);
  return newAssignment;
}

export function updateAssignment(assignmentId, assignment) {
  const index = Database.assignments.findIndex((a) => a._id === assignmentId);
  Database.assignments[index] = {
    ...Database.assignments[index],
    ...assignment,
  };
  return Database.assignments[index];
}

export function deleteAssignment(assignmentId) {
  Database.assignments = Database.assignments.filter(
    (a) => a._id !== assignmentId
  );
  return { status: "deleted" };
}
export function findAssignmentsForCourse(courseId) {
  return Database.assignments.filter((a) => a.course === courseId);
}

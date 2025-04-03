import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAllEnrollments() {
  return Database.enrollments;
}

export function findEnrollmentsForUser(userId) {
  return Database.enrollments.filter((e) => e.user === userId);
}

export function enrollUserInCourse(userId, courseId) {
  const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
  Database.enrollments.push(newEnrollment);
  return newEnrollment;
}

export function unEnrollUserFromCourse(userId, courseId) {
  Database.enrollments = Database.enrollments.filter(
    (e) => !(e.user === userId && e.course === courseId)
  );
}

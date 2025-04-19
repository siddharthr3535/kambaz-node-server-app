import model from "./model.js";

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

// ✅ Get all users enrolled in a course
export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}

// ✅ Unenroll a user from a course
export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}

// ✅ Enroll a user in a course (avoids duplicate errors)
export async function enrollUserInCourse(user, course) {
  const _id = `${user}-${course}`;
  const exists = await model.findOne({ _id });
  if (exists) return exists;

  const newEnrollment = { user, course, _id };
  return model.create(newEnrollment);
}

// ✅ Find all enrollments for a user (raw enrollment docs)
export async function findEnrollmentsByUser(userId) {
  return await model.find({ user: userId });
}

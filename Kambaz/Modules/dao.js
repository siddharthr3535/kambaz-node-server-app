// Kambaz/Modules/dao.js

import model from "./model.js";

export function createModule(module) {
  return model.create(module);
}

export function findModulesForCourse(courseId) {
  return model.find({ course: courseId });
}

export function deleteModule(moduleId) {
  return model.deleteOne({ _id: moduleId });
}

export function updateModule(moduleId, updates) {
  return model.updateOne({ _id: moduleId }, { $set: updates });
}

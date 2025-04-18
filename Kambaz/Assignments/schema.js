import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    title: String,
    description: String,
    points: Number,
    dueDate: String,
    course: { type: String, required: true },
  },
  { collection: "assignments" }
);
export default schema;

import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  // description: {
  //   type: String,
  // },
  coverPhotoUrl: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, required: true }, // 🔁 was String
  lastUpdated: { type: Date, required: true }, // 🔁 was String
});

const Post = mongoose.model("Post", postSchema);

export default Post;




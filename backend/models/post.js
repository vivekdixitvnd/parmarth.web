import mongoose, { Schema } from "mongoose";


const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
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
  createdAt: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
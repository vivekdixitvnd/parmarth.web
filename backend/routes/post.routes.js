import { Router } from "express";
const router = Router();
import isAuth from "../middleware/is-auth.js";
import {
  getArticlesAndBlogs,
  getPosts,
  getPostById,
  getPostByCategory,
  addPost,
  editPost,
  deletePost,
} from "../controllers/post.js";

router.get("/api/getPosts", getPosts);
router.get("/api/getPost/:id", getPostById);
router.get("/api/getPostByCategory/:category", getPostByCategory);
router.get("/api/getArticlesAndBlogs", getArticlesAndBlogs);
router.post("/api/addPost", isAuth, addPost);
router.put("/api/editPost/:id", isAuth, editPost);
router.delete("/api/deletePost/:id", isAuth, deletePost);

export default router;

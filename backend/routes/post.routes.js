import { Router } from "express";
const router = Router();
import isAuth from "../middleware/is-auth.js";

import {
  getArticles,
  getPosts,
  getPostById,
  getPostByCategory,
  addPost,
  editPost,
  deletePost,
  getPastActivities,
  serveSSRMeta,
} from "../controllers/post.js";

router.get("/api/getPosts", getPosts);
router.get("/api/getPost/:id", getPostById);
router.get("/api/getPostByCategory/:category", getPostByCategory);
router.get("/api/getArticles", getArticles);
router.post("/api/addPost", isAuth, addPost);
router.put("/api/editPost/:id", isAuth, editPost);
router.delete("/api/deletePost/:id", isAuth, deletePost);
router.get("/api/past-activities/:category", getPastActivities);

router.get("/api/:category/:id", serveSSRMeta);

// Then fallback to default SPA serve


export default router;

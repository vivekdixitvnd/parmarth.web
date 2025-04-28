import { Router } from "express";
const router = Router();
import isAuth from "../middleware/is-auth.js";
import Post from "../models/post.js";
import {
  getArticles,
  getPosts,
  getPostById,
  getPostByCategory,
  addPost,
  editPost,
  deletePost,
  getPastActivities,
} from "../controllers/post.js";

router.get("/api/getPosts", getPosts);
router.get("/api/getPost/:id", getPostById);
router.get("/api/getPostByCategory/:category", getPostByCategory);
router.get("/api/getArticles", getArticles);
router.post("/api/addPost", isAuth, addPost);
router.put("/api/editPost/:id", isAuth, editPost);
router.delete("/api/deletePost/:id", isAuth, deletePost);
router.get("/api/past-activities/:category", getPastActivities);
// router.get('/debug-all-posts', async (req, res) => {
//   try {
//     const allPosts = await Post.find({})
//       .sort({ createdAt: 1 }) // oldest first
//       .limit(10)
//       .lean();
    
//     const currentDate = new Date();
//     const fiveDaysAgo = new Date(currentDate.getTime() - (5 * 24 * 60 * 60 * 1000));

//     const diagnosticInfo = {
//       currentTime: currentDate.toISOString(),
//       fiveDaysAgo: fiveDaysAgo.toISOString(),
//       oldestPosts: allPosts.map(post => ({
//         id: post._id,
//         title: post.title,
//         createdAt: post.createdAt,
//         isOlderThan5Days: post.createdAt < fiveDaysAgo
//       })),
//       totalPosts: await Post.countDocuments(),
//       postsOlderThan5Days: await Post.countDocuments({ createdAt: { $lt: fiveDaysAgo } })
//     };

//     res.status(200).json(diagnosticInfo);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

export default router;

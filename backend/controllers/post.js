import Post from "../models/post.js";

const getPosts = async (req, res, next) => {
  const page = +req.query.page || 1;
  const ITEMS_PER_PAGE = 10;

  let totalPosts;

  try {
    totalPosts = await Post.find().count();
    const posts = await Post.find(
      { title: { $exists: true } },
      { title: 1, category: 1, createdAt: 1, lastUpdated: 1 }
    )
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.status(200).json({
      posts: posts,
      totalPosts: totalPosts,
      hasNextPage: ITEMS_PER_PAGE * page < totalPosts,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalPosts / ITEMS_PER_PAGE),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPostById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getPostByCategory = async (req, res, next) => {
  const { category } = req.params;
  const page = +req.query.page || 1;
  const ITEMS_PER_PAGE = 6;

  let totalPosts;

  try {
    totalPosts = await Post.count({ category: category });
    const posts = await Post.find(
      { category: category },
      {
        title: 1,
        description: 1,
        lastUpdated: 1,
        coverPhotoUrl: 1,
        category: 1,
      }
    )
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.status(200).json({
      posts: posts,
      totalPosts: totalPosts,
      hasNextPage: ITEMS_PER_PAGE * page < totalPosts,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalPosts / ITEMS_PER_PAGE),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getArticlesAndBlogs = async (req, res, next) => {
  const page = +req.query.page || 1;
  const ITEMS_PER_PAGE = 6;

  let totalPosts;

  try {
    totalPosts = await Post.count({
      $or: [{ category: { $eq: "article" } }, { category: { $eq: "blog" } }],
    });
    const posts = await Post.find(
      {
        $or: [
          { category: { $eq: "article" } },
          { category: { $eq: "blog" } },
        ],
      },
      {
        title: 1,
        description: 1,
        lastUpdated: 1,
        coverPhotoUrl: 1,
        category: 1,
      }
    )
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.status(200).json({
      posts: posts,
      totalPosts: totalPosts,
      hasNextPage: ITEMS_PER_PAGE * page < totalPosts,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalPosts / ITEMS_PER_PAGE),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addPost = async (req, res, next) => {
  const { title, description, content, category, coverPhotoUrl } = req.body;

  const isTitleValid = (title) => title.trim().length > 0;
  const isContentValid = (content) => content.trim().length > 0;
  const isCategoryValid = () => {
    switch (category) {
      case "blog":
      case "event":
      case "medical-helps":
      case "article":
      case "donation":
      case "educational-visit":
      case "festival-celebration":
        return true;

      default:
        return false;
    }
  };
  const isCoverPhotoValid = (coverPhotoUrl) => coverPhotoUrl.length > 0;

  if (!isTitleValid(title)) {
    return res.status(422).json({ error: "Title can't be empty" });
  } else if (!isCoverPhotoValid(coverPhotoUrl)) {
    return res.status(422).json({ error: "Select a file" });
  } else if (!isContentValid(content)) {
    return res
      .status(422)
      .json({ error: "Enter at least some characters in content" });
  } else if (!isCategoryValid(category)) {
    return res.status(422).json({ error: "Select a valid category" });
  }

  const post = new Post({
    title: title.trim(),
    description: description.trim() || "",
    coverPhotoUrl: coverPhotoUrl,
    content: content.toString(),
    category: category,
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  });

  try {
    const existingPost = await Post.findOne({ title: title.trim() });
    if (existingPost) {
      return res.status(500).json({ error: "Post with same title exists" });
    }

    await post.save();
    console.log("Added Data");
    return res.status(201).json({ message: "Post Created Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editPost = async (req, res, next) => {
  const id = req.params.id;

  const { title, description, content, category, coverPhotoUrl } = req.body;

  const isTitleValid = (title) => title.trim().length > 0;
  const isContentValid = (content) => content.trim().length > 0;
  const isCategoryValid = () => {
    switch (category) {
      case "blog":
      case "event":
      case "medical-helps":
      case "article":
      case "donation":
      case "educational-visit":
      case "festival-celebration":
        return true;

      default:
        return false;
    }
  };
  const isCoverPhotoValid = (coverPhotoUrl) => coverPhotoUrl.length > 0;

  if (!isTitleValid(title)) {
    return res.status(422).json({ error: "Title can't be empty" });
  } else if (!isCoverPhotoValid(coverPhotoUrl)) {
    return res.status(422).json({ error: "Enter a valid URL" });
  } else if (!isContentValid(content)) {
    return res
      .status(422)
      .json({ error: "Enter at least some characters in content" });
  } else if (!isCategoryValid(category)) {
    return res.status(422).json({ error: "Select a valid category" });
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(422).json({ error: "Couldn't find a post with this id" });
    }

    post.title = title.trim();
    post.description = description.trim() || "";
    post.content = content.toString();
    post.category = category.trim();
    post.coverPhotoUrl = coverPhotoUrl.trim();
    post.lastUpdated = new Date().toISOString();

    const updatedPost = await post.save();
    res.status(200).json({
      message: "Post Updated Successfully",
      post: updatedPost,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePost = async (req, res, next) => {
  const id = req.params.id;

  try {
    const deletedPost = await Post.findByIdAndRemove(id);
    if (!deletedPost) {
      return res.status(422).json({ error: "Couldn't find Data" });
    }
    return res.status(200).json({ message: "Data Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  getPosts,
  getPostById,
  getPostByCategory,
  getArticlesAndBlogs,
  addPost,
  editPost,
  deletePost,
};

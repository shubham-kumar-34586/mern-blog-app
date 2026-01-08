import Post from "../model/post.js";

export const createPost = async (request, response) => {
  try {
    if (!request.body.categories) {
      request.body.categories = "All";
    }

    if (!request.body.picture) {
      request.body.picture = "";
    }

    const post = new Post(request.body);
    await post.save();

    response.status(200).json({ msg: "Post saved successfully" });
  } catch (error) {
    response.status(500).json({ error });
  }
};

export const getAllPosts = async (request, response) => {
  try {
    const category = request.query.category;
    const posts = category
      ? await Post.find({ categories: category })
      : await Post.find({});
    response.status(200).json(posts);
  } catch (error) {
    response.status(500).json({ error });
  }
};

export const getPostById = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
    response.status(200).json(post);
  } catch (error) {
    response.status(500).json({ error });
  }
};

export const updatePost = async (request, response) => {
  try {
    const { _id } = request.body;

    if (!_id) {
      return response.status(400).json({ msg: "Post ID missing" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      { $set: request.body },
      { new: true } // 🔥 IMPORTANT
    );

    if (!updatedPost) {
      return response.status(404).json({ msg: "Post not found" });
    }

    response.status(200).json(updatedPost);
  } catch (error) {
    response.status(500).json({ error });
  }
};

export const deletePost = async (request, response) => {
  try {
    await Post.findByIdAndDelete(request.params.id);
    response.status(200).json({ msg: "Post deleted successfully" });
  } catch (error) {
    response.status(500).json({ error });
  }
};

import Comment from "../model/comment.js";

export const newComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("Comment deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

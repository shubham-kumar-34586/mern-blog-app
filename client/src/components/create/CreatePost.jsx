import { useState, useEffect, useContext } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "All"
};

const CreatePost = () => {
  const [post, setPost] = useState(initialPost);

  const { account } = useContext(DataContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  // fetch post for update
  useEffect(() => {
    const fetchPost = async () => {
      if (isEditMode) {
        const response = await API.getPostById(id);
        if (response?.isSuccess) {
          setPost(response.data);
        }
      }
    };
    fetchPost();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const savePost = async () => {
    let response;

    if (isEditMode) {
      // ✅ BACKEND EXPECTS _id IN BODY
      response = await API.updatePost({
        _id: post._id,
        title: post.title,
        description: post.description,
        picture: post.picture,
        categories: post.categories,
        username: account.username
      });
    } else {
      response = await API.createPost({
        title: post.title,
        description: post.description,
        picture: post.picture,
        categories: post.categories,
        username: account.username
      });
    }

    if (response?.isSuccess) {
      navigate("/");
    }
  };

  return (
    <Box sx={{ margin: "50px 100px" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {isEditMode ? "Update Post" : "Create New Post"}
      </Typography>

      <TextField
        label="Title"
        name="title"
        value={post.title}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="Description"
        name="description"
        value={post.description}
        onChange={handleChange}
        multiline
        rows={6}
        fullWidth
        sx={{ mb: 3 }}
      />

      <Button variant="contained" onClick={savePost}>
        {isEditMode ? "Update" : "Publish"}
      </Button>
    </Box>
  );
};

export default CreatePost;

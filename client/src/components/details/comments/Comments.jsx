import { useEffect, useState, useContext } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { API } from "../../../service/api";
import { DataContext } from "../../../context/DataProvider";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const { account } = useContext(DataContext);

  useEffect(() => {
    API.getComments(postId).then(res => {
      if (res.isSuccess) setComments(res.data);
    });
  }, [postId]);

  const addComment = async () => {
    const response = await API.newComment({
      postId,
      username: account.username,
      text
    });
    if (response.isSuccess) {
      setComments([...comments, response.data]);
      setText("");
    }
  };

  const removeComment = async (id) => {
    await API.deleteComment(id);
    setComments(comments.filter(c => c._id !== id));
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Comments</Typography>

      <TextField
        fullWidth
        multiline
        rows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
      />

      <Button onClick={addComment} sx={{ mt: 1 }}>
        Post
      </Button>

      {comments.map((c) => (
        <Box key={c._id} sx={{ mt: 2 }}>
          <Typography fontWeight="bold">{c.username}</Typography>
          <Typography>{c.text}</Typography>
          {c.username === account.username && (
            <Button onClick={() => removeComment(c._id)}>Delete</Button>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Comments;

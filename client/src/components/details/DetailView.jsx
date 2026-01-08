import { useEffect, useState, useContext } from "react";
import { Box, Typography, styled } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";

import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

import Comments from "./comments/Comments";

// ===== Styles =====

const Container = styled(Box)`
  margin: 50px 100px;
`;

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px;
`;

const Author = styled(Box)`
  color: #878787;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

// ===== Component =====

const DetailView = () => {
  const [post, setPost] = useState({});
  const { account } = useContext(DataContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const fallbackImage =
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b";

  useEffect(() => {
    const fetchPost = async () => {
      const response = await API.getPostById(id);
      if (response?.isSuccess) {
        setPost(response.data);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const response = await API.deletePost(post._id);
    if (response?.isSuccess) {
      navigate("/");
    }
  };

  return (
    <Container>
      <Image src={post.picture || fallbackImage} alt="post" />

      {/* EDIT / DELETE (ONLY OWNER) */}
      {account?.username === post?.username && (
        <Box style={{ float: "right" }}>
          <Link to={`/update/${post._id}`}>
            <Edit color="primary" style={{ cursor: "pointer" }} />
          </Link>

          <Delete
            color="error"
            style={{ marginLeft: 15, cursor: "pointer" }}
            onClick={handleDelete}
          />
        </Box>
      )}

      <Heading>{post.title}</Heading>

      <Author>
        <Typography>
          Author: <b>{post.username}</b>
        </Typography>
        <Typography>
          {post.createdDate &&
            new Date(post.createdDate).toDateString()}
        </Typography>
      </Author>

      <Typography>{post.description}</Typography>

      {/* 🔥 COMMENTS SECTION */}
      {post._id && <Comments postId={post._id} />}
    </Container>
  );
};

export default DetailView;

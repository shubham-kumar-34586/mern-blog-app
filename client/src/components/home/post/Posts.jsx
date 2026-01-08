import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";

import { API } from "../../../service/api";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await API.getAllPosts(
          category ? { category } : {}
        );

        if (response?.isSuccess) {
          setPosts(response.data);
        }
      } catch (error) {
        console.error("Fetch posts error", error);
      }
    };

    fetchPosts();
  }, [category]);

  if (!posts.length) {
    return (
      <Box sx={{ fontSize: 18, color: "#878787", mt: 4 }}>
        No posts available
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "24px"
      }}
    >
      {posts.map((post) => (
        <Box key={post._id} sx={{ width: "340px" }}>
          <Link
            to={`/details/${post._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Post post={post} />
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default Posts;

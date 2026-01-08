import { Box } from "@mui/material";
import Banner from "../banner/Banner";
import Categories from "./Categories";
import Posts from "./post/Posts";

const Home = () => {
  return (
    <>
      <Banner />

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 3,
          padding: 3,
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto"
        }}
      >
        {/* SIDEBAR */}
        <Box
          sx={{
            width: 260,
            flexShrink: 0
          }}
        >
          <Categories />
        </Box>

        {/* POSTS */}
        <Box
          sx={{
            flexGrow: 1,
            minWidth: 0 // 🔥 IMPORTANT for flex layouts
          }}
        >
          <Posts />
        </Box>
      </Box>
    </>
  );
};

export default Home;

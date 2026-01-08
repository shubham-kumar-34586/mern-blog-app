import { Box, Typography } from "@mui/material";

const About = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        About This Blog
      </Typography>
      <Typography>
        This is a MERN Stack Blog Application built with React, Node.js,
        Express, MongoDB and JWT authentication.
      </Typography>
    </Box>
  );
};

export default About;

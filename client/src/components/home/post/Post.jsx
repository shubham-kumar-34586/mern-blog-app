import { Box, Typography, styled } from "@mui/material";

const Card = styled(Box)`
  width: 100%;
  height: 360px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
`;

const Image = styled("img")({
  width: "100%",
  height: 160,
  objectFit: "cover"
});

const Content = styled(Box)`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Category = styled(Typography)`
  font-size: 12px;
  color: #878787;
`;

const Title = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
`;

const Author = styled(Typography)`
  font-size: 13px;
  color: #555;
`;

const Description = styled(Typography)`
  font-size: 14px;
`;

const Post = ({ post }) => {
  const image =
    post.picture ||
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085";

  const short = (text, n) =>
    text.length > n ? text.slice(0, n) + "..." : text;

  return (
    <Card>
      <Image src={image} alt="post" />

      <Content>
        <Category>{post.categories}</Category>
        <Title>{short(post.title, 22)}</Title>
        <Author>Author: {post.username}</Author>
        <Description>{short(post.description, 90)}</Description>
      </Content>
    </Card>
  );
};

export default Post;

import { AppBar, Toolbar, styled } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Component = styled(AppBar)`
  background: #ffffff;
  color: #000;
`;

const Container = styled(Toolbar)`
  justify-content: center;
  & > a {
    padding: 20px;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Component>
      <Container>
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/contact">CONTACT</Link>
        <span onClick={logoutUser}>LOGOUT</span>
      </Container>
    </Component>
  );
};

export default Header;

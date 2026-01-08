import { useState, useContext } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

// ===== Styled Components =====

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0 / 0.6);
`;

const Image = styled("img")({
  width: "100px",
  margin: "auto",
  display: "flex",
  padding: "60px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
  &:hover {
    background: #2874f0;
  }
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  margin-top: 10px;
  font-weight: 600;
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 16px;
`;

// ===== Initial Values =====

const loginInitialValues = {
  username: "",
  password: "",
};

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

// ===== Component =====

const Login = () => {
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  const [page, setPage] = useState("login");
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, setError] = useState("");

  const { setAccount, setIsAuthenticated } = useContext(DataContext);
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    const response = await API.userLogin(login);

    if (response.isSuccess) {
      setError("");

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("name", response.data.name);

      setAccount({
        username: response.data.username,
        name: response.data.name,
      });
      setIsAuthenticated(true);

      navigate("/");
    } else {
      setError(response.error || "Invalid credentials");
    }
  };

  const signupUser = async () => {
    const response = await API.userSignup(signup);

    if (response.isSuccess) {
      setSignup(signupInitialValues);
      setPage("login");
      setError("");
    } else {
      setError(response.error || "Signup failed");
    }
  };

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="login" />

        {page === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              name="username"
              label="Enter Username"
              value={login.username}
              onChange={handleLoginChange}
            />
            <TextField
              variant="standard"
              name="password"
              type="password"
              label="Enter Password"
              value={login.password}
              onChange={handleLoginChange}
            />

            {error && <Error>{error}</Error>}

            <LoginButton onClick={loginUser}>Login</LoginButton>

            <Text align="center">OR</Text>

            <SignupButton onClick={() => setPage("signup")}>
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              name="name"
              label="Enter Name"
              onChange={handleSignupChange}
            />
            <TextField
              variant="standard"
              name="username"
              label="Enter Username"
              onChange={handleSignupChange}
            />
            <TextField
              variant="standard"
              name="password"
              type="password"
              label="Enter Password"
              onChange={handleSignupChange}
            />

            {error && <Error>{error}</Error>}

            <SignupButton onClick={signupUser}>Signup</SignupButton>

            <Text align="center">OR</Text>

            <LoginButton onClick={() => setPage("login")}>
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;

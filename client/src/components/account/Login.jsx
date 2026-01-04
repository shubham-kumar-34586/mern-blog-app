import { useState } from 'react';
import {Box, TextField, Button, styled, Typography } from '@mui/material';

const Component = styled(Box)`  /*center main card jaisa layout */
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`
const Image = styled('img')({   /* Normal <img> ko style kiya, Login logo ke liye */
    width: '100px',
    margin:'auto',
    display:'flex',
    padding:'60px 0 0',
})

const Wrapper = styled(Box)` /* */
    padding: 25px 35px;
    display: flex;
    flex:1;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
    &:hover {
        background: #2874f0;   // blue on hover
    }
`
const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`
const Text = styled(Typography)`
    color: #878787;
    font-size: 16px;

`
const signupInitialValues = {
    name:'',
    username:'',
    password:'',
}


const Login = () => {
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    
    const [account, toogleAccount] = useState('login'); /*account:- current screen state, 'login':- default screen, toogleAccount:- state change karne ka function */
    const [signup, setSignup] = useState(signupInitialValues);

    const toogleSignup = () => {
        account === 'signup' ? toogleAccount('login') : toogleAccount("signup");
    }

    const onInputChange = (e) => {
        setSignup({...signup, [e.target.name]: e.target.value});
    }

    return(
        <Component>
        <Box> 
            <Image src= {imageURL} alt='login'/>
            {
                account === 'login' ?
                <Wrapper>
                    <TextField variant="standard" label= "Enter Username"/>
                    <TextField variant="standard" label= "Enter Password"/>
                    <LoginButton variant="contained">Login</LoginButton>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <SignupButton onClick={()=> toogleSignup()}>Create an account</SignupButton>
                </Wrapper> 
            :        
                <Wrapper>
                    <TextField variant="standard" onChange={(e)=> onInputChange(e)} name='name' label= "Enter Name"/>
                    <TextField variant="standard" onChange={(e)=> onInputChange(e)} name='username' label= "Enter Username"/>
                    <TextField variant="standard" onChange={(e)=> onInputChange(e)} name='password' label= "Enter Password"/>

                    <SignupButton>Signup</SignupButton>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <LoginButton variant="contained" onClick={()=> toogleSignup()}>Already have an account</LoginButton>
                </Wrapper>
            }
        </Box>  
        </Component>
    )
}

export default Login;
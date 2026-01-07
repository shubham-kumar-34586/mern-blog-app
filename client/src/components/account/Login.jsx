import { useState, useContext } from 'react';
import {Box, TextField, Button, styled, Typography } from '@mui/material';
import {API} from '../../service/api'
import { DataContext } from '../../context/DataProvider';

import { useNavigate } from 'react-router-dom';



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
const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;    
`


const Text = styled(Typography)`
    color: #878787;
    font-size: 16px;

`

const loginInitialValues = {
    username:'',
    password:'',
}

const signupInitialValues = {
    name:'',
    username:'',
    password:'',
}


const Login = ({isUserAuthenticated}) => {
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    
    const [account, toogleAccount] = useState('login'); /*account:- current screen state, 'login':- default screen, toogleAccount:- state change karne ka function */
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('')

    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();

    const toogleSignup = () => {
        account === 'signup' ? toogleAccount('login') : toogleAccount("signup");
    }

    const onInputChange = (e) => {
        console.log('onInputChange', e.target.name, e.target.value);
        setSignup({...signup, [e.target.name]: e.target.value});
    }

    const signupUser = async () => {
    try {
        let response = await API.userSignup(signup);

        if (response.isSuccess) {
            setError('');
            setSignup(signupInitialValues);
            toogleAccount('login');
        }
    } catch (error) {
        setError(error.msg || 'Something went wrong');
    }
};

const onValueChange = (e) => {
        console.log('onValueChange', e.target.name, e.target.value, login);
        setLogin({...login, [e.target.name]: e.target.value})
}

const loginUser = async ()=> {
    let response = await API.userLogin(login);
    if(response.isSuccess){
        setError('');

        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);

        setAccount({ username: response.data.username, name: response.data.name });

        isUserAuthenticated(true);
        navigate('/');
        
    } else {
        setError('Something went wrong please try again later');
    }
}

    return(
        <Component>
        <Box> 
            <Image src= {imageURL} alt='login'/>
            {
                account === 'login' ?
                <Wrapper>
                    <TextField variant="standard" value={login.username} onChange={(e) => onValueChange(e)} name='username' label= "Enter Username"/>
                    <TextField variant="standard" value={login.password} onChange={(e) => onValueChange(e)} name='password' label= "Enter Password"/>

                    { error && <Error>{error}</Error>}

                    <LoginButton variant="contained" onClick={()=> loginUser()}>Login</LoginButton>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <SignupButton onClick={()=> toogleSignup()}>Create an account</SignupButton>
                </Wrapper> 
            :        
                <Wrapper>
                    <TextField variant="standard" onChange={(e)=> onInputChange(e)} name='name' label= "Enter Name"/>
                    <TextField variant="standard" onChange={(e)=> onInputChange(e)} name='username' label= "Enter Username"/>
                    <TextField variant="standard" onChange={(e)=> onInputChange(e)} name='password' label= "Enter Password"/>
                    
                    { error && <Error>{error}</Error>}
                    <SignupButton onClick={()=> signupUser()}>Signup</SignupButton>
                    <Text style={{ textAlign: 'center' }}>OR</Text>
                    <LoginButton variant="contained" onClick={()=> toogleSignup()}>Already have an account</LoginButton>
                </Wrapper>
            }
        </Box>  
        </Component>
    )
}

export default Login;
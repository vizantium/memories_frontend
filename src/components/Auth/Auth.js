import React, {useEffect, useState} from 'react';
import useStyles from './styles.js'
import {Avatar, Button, Container, Grid, Paper, TextField, Typography} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from "./input";
import {GoogleLogin} from 'react-google-login'
import Icon from './icon'
import { gapi } from 'gapi-script';
import {useDispatch} from "react-redux";
import {auth, signIn, signUp} from "../../redux/authSlice";
import { useNavigate } from 'react-router-dom';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const Auth = () => {
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isSignUp) {
            await dispatch(signUp({formData}))
            navigate('/')
        } else {
            await dispatch(signIn({formData}))
            navigate('/')
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        setShowPassword(false)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            await dispatch(auth({result, token}));
            navigate('/')
        } catch (e) {
            console.log(e)
        }
    }
    const googleFailure = (error) => {
        console.log(error)
        console.log('Google sign in was unsuccessful')
    }

    return (
        <Container component={'main'} maxWidth={'xs'}>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant={'h5'}>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input name={'firstName'} label={'First Name'} handleChange={handleChange} autoFocus
                                       half/>
                                <Input name={'lastName'} label={'Last Name'} handleChange={handleChange} autoFocus
                                       half/>
                            </>
                        )}
                        <Input name={'email'} label={'Email Address'} handleChange={handleChange} type={'email'}/>
                        <Input name={'password'} label={'Password'} handleChange={handleChange}
                               type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
                        {isSignUp &&
                            <Input name={'confirmPassword'} label={'Repeat Password'} handleChange={handleChange}
                                   type={'password'}/>}
                    </Grid>
                    <Button type={'submit'} fullWidth variant={'contained'} color={'primary'}
                            className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin clientId={'68674801310-uv2hrje6r18c30g2lg4o7ba3ivcpm5kf.apps.googleusercontent.com'} render={(renderProps) => (
                        <Button
                            className={classes.googleButton}
                            color={'primary'}
                            fullWidth
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            startIcon={<Icon/>}
                            variant={'contained'}>
                            Google Sign In
                        </Button>
                    )} onSuccess={googleSuccess} onFailure={googleFailure} cookiePolicy={'single_host_origin'}/>
                    <Grid container justifyContent={'flex-end'}>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign In' : 'Don`t have an account? Sign up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
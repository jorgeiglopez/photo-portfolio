import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState, useContext, useEffect } from 'react';
import useHttpRequest from '../../hooks/useHttpRequest';
import AuthContext from '../../contex/auth-context';
import CustomSnackbars from '../modal/CustomSnackbars';
import { getLoginURL, getSignUpURL } from '../../firebase/config';
import { useLocation } from 'react-router';


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function AuthForm() {
	const classes = useStyles();
	const authCtx = useContext(AuthContext);
	const isLoginMode = useLocation().pathname === '/login';
	
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	
	const [request, setRequest] = useState();
	const { response, error, loading, setError } = useHttpRequest(request);
	const isFormValid = !(emailError || passwordError) && email && password && !loading;

	useEffect(() => {
		if (response && response.idToken) {
			console.log("--- USER LOGGED IN!! ---")
			authCtx.logIn(response.idToken);
		}
	}, [JSON.stringify(response)])
	
	const submitHandler = (event) => {
		event.preventDefault();
		if (!(emailError || passwordError)) {
			const req = {
				url: isLoginMode ? getLoginURL() : getSignUpURL(),
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: {
					email: email,
					password: password,
					returnSecureToken: true,
				},
			};
			setRequest(req);
		} else {
			setError('Check your input, there\'s something wrong');
		}
	};

	return (
		<>
			{response && (
				<CustomSnackbars
					message={isLoginMode ? 'Log in successfully' : 'Account created successfully'}
					severity='success'
				/>
			)}
			{error && <CustomSnackbars message={error} />}
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<div className={classes.paper}>
					<FormHeader isLoginMode={isLoginMode} />
					<form className={classes.form}>
						<EmailTextField
							email={email}
							setEmail={setEmail}
							emailError={emailError}
							setEmailError={setEmailError}
						/>
						<PasswordTextField
							password={password}
							setPassword={setPassword}
							passwordError={passwordError}
							setPasswordError={setPasswordError}
							isLoginMode={isLoginMode}
						/>
						{/* TODO: <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' /> */}
						<Button
							disabled={!isFormValid}
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}
							onClick={submitHandler}>
							{isLoginMode ? 'Log In' : 'Sign Up'}
						</Button>
						<LoginExtras isLoginMode={isLoginMode} />
					</form>
				</div>
				<CopyrightSection />
			</Container>
		</>
	);
}

export const FormHeader = (props) => {
	const classes = useStyles();
	return (
		<>
			<Avatar className={classes.avatar}>
				{props.isLoginMode ? <LockOutlinedIcon /> : <PersonAddOutlinedIcon />}
			</Avatar>
			<Typography component='h1' variant='h5'>
				{props.isLoginMode ? 'Log in' : 'Create Account'}
			</Typography>
		</>
	);
};

const PasswordTextField = (props) => {
	const validatePassword = (input) => {
		if (!input || input.trim().length === 0) {
			props.setPasswordError('(*) Password is required');
		} else if (input.trim().length < 6) {
			props.setPasswordError('Password should be 6 characters long');
		} else {
			props.setPasswordError(null);
		}
		return input;
	};

	const onChangeHandler = (event) => {
		props.setPassword(validatePassword(event.target.value));
	};

	const onBlurHandler = (_event) => {
		validatePassword(props.password);
	};

	return (
		<TextField
			id='password'
			label='Password'
			name='password'
			autoComplete='current-password'
			required
			error={!!props.passwordError}
			helperText={props.passwordError}
			value={props.password}
			variant='outlined'
			margin='normal'
			fullWidth
			type='password'
			onChange={onChangeHandler}
			onBlur={onBlurHandler}
		/>
	);
};

const EmailTextField = (props) => {
	const validateEmail = (input) => {
		if (!input || input.trim().length === 0) {
			props.setEmailError('(*) Email is required');
		} else if (!input.includes('@')) {
			props.setEmailError('Invalid email address');
		} else {
			props.setEmailError(null);
		}
		return input;
	};

	const onChangeHandler = (event) => {
		props.setEmail(validateEmail(event.target.value));
	};

	const onBlurHandler = (_event) => {
		validateEmail(props.email);
	};

	return (
		<TextField
			id='email'
			label='Email'
			name='email'
			autoComplete='email'
			// autoFocus
			required
			error={!!props.emailError}
			helperText={props.emailError}
			value={props.email}
			variant='outlined'
			margin='normal'
			fullWidth
			onChange={onChangeHandler}
			onBlur={onBlurHandler}
		/>
	);
};

const LoginExtras = (props) => {
	return (
		<Grid container>
			{props.isLoginMode && (
				<Grid item xs>
					<Link to='#' variant='body2'>
						Forgot password?
					</Link>
				</Grid>
			)}
			{props.isLoginMode && (
				<Grid item>
					<Link to='/signup' variant='body2'>
						{"Don't have an account? Sign Up"}
					</Link>
				</Grid>
			)}
			{!props.isLoginMode && (
				<Grid item>
					<Link to='/login' variant='body2'>
						{'Wait, I have an account!'}
					</Link>
				</Grid>
			)}
		</Grid>
	);
};

const CopyrightSection = () => {
	return (
		<Box mt={8}>
			<Typography variant='body2' color='textSecondary' align='center'>
				{'Copyright © '}
				<Link to={{ pathname: "https://www.instagram.com/nacho.lpz/"}} target="_blank">
					Nacho Lpz
				</Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		</Box>
	);
};

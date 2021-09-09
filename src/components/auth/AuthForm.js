import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState, useContext, useEffect } from 'react';
import useHttpRequest from '../../hooks/useHttpRequest';
import AuthContext from '../../contex/auth-context';
import CustomSnackbars from '../modal/CustomSnackbars';
import { getLoginURL, getSignUpURL } from '../../firebase/config';
import { useLocation } from 'react-router';
import EmailTextField from './EmailTextField';
import PasswordTextField from './PasswordTextField';
import FormAvatar from './FormAvatar';
import CopyrightSection from './CopyrightSection';
import LoginExtras from './LoginExtras';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const AuthForm = () => {
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
	const successMessage = isLoginMode ? 'Log in successfully' : 'Account created successfully';

	useEffect(() => {
		if (response && response.idToken) {
			console.log('--- USER LOGGED IN!! ---');
			console.log(response.idToken)
			authCtx.logIn(response.idToken);
		}
	}, [JSON.stringify(response)]);

	useEffect(() => {
		if (authCtx.isLoggedIn) {
			setEmail('');
			setPassword('');
		}
	}, [authCtx.isLoggedIn]);

	const submitHandler = (event) => {
		event.preventDefault();
		if (isFormValid) {
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
			setError("Check your input, there's something wrong");
		}
	};

	return (
		<>
			{error && <CustomSnackbars message={error} />}
			{response && response.idToken && <CustomSnackbars message={successMessage} severity='success' />}
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<div className={classes.paper}>
					<FormAvatar isLoginMode={isLoginMode} />
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
							repeat={!isLoginMode}
						/>
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
};

export default AuthForm;

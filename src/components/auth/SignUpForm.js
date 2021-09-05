import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useRef, useState, useContext } from 'react';
import CustomSnackbars from '../modal/CustomSnackbars';
import useHttpRequest from '../../hooks/useHttpRequest';
import AuthContext from '../../contex/auth-context';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.light,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignUpForm() {
	const classes = useStyles();
	const authCtx = useContext(AuthContext);

	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordTwoRef = useRef();

	const [request, setRequest] = useState();
	const { response, error, loading, setError } = useHttpRequest(request);

	if(!authCtx.isLoggedIn &&  response && response.token){
		authCtx.logIn(response.idToken);
	}

	const submitHandler = (event) => {
		event.preventDefault();
		if (
			emailRef.current.value &&
			passwordRef.current.value &&
			passwordRef.current.value === passwordTwoRef.current.value
		) {
			const req = {
				url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA3cC5XTi5dH3R8DXBhQb90hNDTt77_ulA',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: {
					email: emailRef.current.value,
					password: passwordRef.current.value,
					returnSecureToken: true,
				},
			};
			setRequest(req);
		} else {
			setError('Wrong input.');
		}
	};

	return (
		<>
			{response && <CustomSnackbars message='Account created successfully' severity='success' />}
			{error && <CustomSnackbars message={error} />}
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<PersonAddOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Create account
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							inputRef={emailRef}
							variant='outlined'
							margin='normal'
							fullWidth
							id='email'
							label='Email'
							name='email'
							autoComplete='email'
							autoFocus
						/>
						<TextField
							inputRef={passwordRef}
							variant='outlined'
							margin='normal'
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
						/>
						<TextField
							inputRef={passwordTwoRef}
							variant='outlined'
							margin='normal'
							fullWidth
							name='passwordTwo'
							label='Repeat Password'
							type='password'
							id='passwordTwo'
						/>
						<Button
							disabled={loading}
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}
							onClick={submitHandler}>
							Sign up
						</Button>
					</form>
				</div>
			</Container>
		</>
	);
}

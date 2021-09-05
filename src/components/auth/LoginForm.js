import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useRef, useState, useContext } from 'react';
import useHttpRequest from '../../hooks/useHttpRequest';
import AuthContext from '../../contex/auth-context';

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='https://material-ui.com/'>
				Nacho Lpz
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

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


export default function LoginForm() {
	const classes = useStyles();
	const authCtx = useContext(AuthContext);
	
	const emailRef = useRef();
	const passwordRef = useRef();

	const [request, setRequest] = useState();
	const { response, error, loading, setError } = useHttpRequest(request);

	if(!loading && response.token){
		console.log("Logging in function")
		authCtx.logIn(response.idToken);
	}
	console.log("AuthContext: ", authCtx)
	console.log("Response: ", response);
	console.log("Loading...", loading)

	const submitHandler = (event) => {
		event.preventDefault();
		if (
			emailRef.current.value &&
			passwordRef.current.value
		) {
			const req = {
				url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA3cC5XTi5dH3R8DXBhQb90hNDTt77_ulA',
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
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Log in
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						inputRef={emailRef}
						variant='outlined'
						margin='normal'
						required
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
						required
						fullWidth
						name='password'
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
					/>
					<FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
					<Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} onClick={submitHandler}>
						Log In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href='#' variant='body2'>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href='/signup' variant='body2'>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}

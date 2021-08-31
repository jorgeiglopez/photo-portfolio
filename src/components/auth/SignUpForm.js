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
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useRef, useState } from 'react';
import CustomSnackbars from '../modal/CustomSnackbars';

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
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordTwoRef = useRef();
	const [errorMessage, setErrorMessage] = useState();
	
	const submitHandler = (event) => {
		event.preventDefault();
		console.log(emailRef.current.value, passwordRef.current.value, passwordTwoRef.current.value)
		if(passwordRef.current.value === passwordTwoRef.current.value){

		} else {
			setErrorMessage('Passwords doesn\'t match!');
		}
	}
	return (
		<>
		{errorMessage && <CustomSnackbars errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>}
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
					/>
					<TextField
						inputRef={passwordTwoRef}
						variant='outlined'
						margin='normal'
						required
						fullWidth
						name='passwordTwo'
						label='Repeat Password'
						type='password'
						id='passwordTwo'
					/>
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
							<Link href='#' variant='body2'>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
		</>
	);
}

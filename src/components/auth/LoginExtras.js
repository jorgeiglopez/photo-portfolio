import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const LoginExtras = (props) => {
	return (
		<Grid container>
			{props.isLoginMode && (
				<Grid item xs>
					<Link to='#' variant='body2'>
						{'Forgot password?'}
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

export default LoginExtras;
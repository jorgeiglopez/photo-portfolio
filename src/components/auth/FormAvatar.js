import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
}));

const FormAvatar = (props) => {
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

export default FormAvatar;

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		'width': '70%',
		'& > * + *': {
			marginTop: theme.spacing(20),
		},
	},
}));

// severity="error"  --  This is an error message!
// severity="warning"  --  This is a warning message!
// severity="info"  --  This is an information message!
// severity="success"  --  This is a success message!

const CustomSnackbars = (props) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(!!props.message);
	}, [props.message]);

	const handleClose = (_event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<Snackbar
				open={open}
				autoHideDuration={props.autoHide || 6000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				<MuiAlert elevation={6} variant='filled' onClose={handleClose} severity={props.severity || 'error'}>
					{props.message}
				</MuiAlert>
			</Snackbar>
		</div>
	);
};

export default CustomSnackbars;

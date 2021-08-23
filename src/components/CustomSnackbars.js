import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		'width': '70%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}));

const CustomSnackbars = (props) => {
	const [open, setOpen] = useState(true);
	const classes = useStyles();

	const handleClose = (event, reason) => {
        console.log("Reason: ", reason)
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<Snackbar
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'center', horizontal: 'center' }}>
				<MuiAlert elevation={6} variant='filled' onClose={handleClose} severity={props.severity || 'error'}>
					{props.message}
				</MuiAlert>
			</Snackbar>
			{/* <MuiAlert elevation={6} variant="filled" autoHideDuration={6000} severity="error">{props.message}</MuiAlert> */}
		</div>
	);
};

export default CustomSnackbars;

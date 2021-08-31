import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		'width': '70%',
		'& > * + *': {
			marginTop: theme.spacing(20),
		},
	},
}));

const CustomSnackbars = (props) => {
	const classes = useStyles();

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		props.setErrorMessage(null);
	};

	return (
		<div className={classes.root}>
			<Snackbar
				open={!!props.errorMessage}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
				<MuiAlert elevation={6} variant='filled' onClose={handleClose} severity={props.severity || 'error'}>
					{props.errorMessage}
				</MuiAlert>
			</Snackbar>
		</div>
	);
};

export default CustomSnackbars;

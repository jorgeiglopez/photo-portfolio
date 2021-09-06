import TextField from '@material-ui/core/TextField';

const EmailTextField = (props) => {
	const validateEmail = (input) => {
		const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		
		if (!input || input.trim().length === 0) {
			props.setEmailError('(*) Email is required');
		} else if (!regex.test(String(input).toLowerCase())) {
			props.setEmailError('Invalid email address');
		} else {
			props.setEmailError('');
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

export default EmailTextField;

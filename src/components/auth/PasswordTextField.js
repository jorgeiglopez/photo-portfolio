import TextField from '@material-ui/core/TextField';

const PasswordTextField = (props) => {
	const validatePassword = (input) => {
		if (!input || input.trim().length === 0) {
			props.setPasswordError('(*) Password is required');
		} else if (input.trim().length < 6) {
			props.setPasswordError('Password should be 6 characters long');
		} else {
			props.setPasswordError('');
		}
		return input;
	};

	const onChangeHandler = (event) => {
		props.setPassword(validatePassword(event.target.value));
	};

	const onBlurHandler = (_event) => {
		validatePassword(props.password);
	};

	const fieldsToRender = [];
	fieldsToRender.push(
		<TextField
			id='password'
			label='Password'
			name='password'
			autoComplete='current-password'
			required
			error={!!props.passwordError}
			helperText={props.passwordError}
			value={props.password}
			variant='outlined'
			margin='normal'
			fullWidth
			type='password'
			onChange={onChangeHandler}
			onBlur={onBlurHandler}
		/>
	);

	return <>{fieldsToRender}</>;
};

export default PasswordTextField;

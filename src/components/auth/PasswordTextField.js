import TextField from '@material-ui/core/TextField';
import React, { useRef, useState } from 'react';

const PasswordTextField = (props) => {
	const p1 = useRef();
	const p2 = useRef();
	const [match, setMatch] = useState(true);

	const validatePasswordsMatch = () => {
		if (p1.current.value.trim().length === 0 || p2.current.value.trim().length === 0) {
			return;
		}
		if (p1.current.value === p2.current.value) {
			setMatch(true);
		} else {
			setMatch(false);
		}
	};

	const validatePassword = (input) => {
		if (props.repeat) {
			validatePasswordsMatch();
		}
		if (!input || input.trim().length === 0) {
			props.setPasswordError('(*) Password is required');
		} else if (input.trim().length < 6) {
			props.setPasswordError('Password should be 6 characters long');
		} else {
			props.setPasswordError('');
		}
		return input;
	};

	const onChangeHandler1 = (event) => {
		props.setPassword(validatePassword(event.target.value));
	};

	const fieldsToRender = [];
	fieldsToRender.push(
		<TextField
			inputRef={p1}
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
			onChange={onChangeHandler1}
			onBlur={(event)=>validatePassword(event.target.value)}
		/>
	);
	if (props.repeat === true) {
		fieldsToRender.push(
			<TextField
				inputRef={p2}
				id='password2'
				label='Repeat password'
				name='password2'
				required
				error={!match}
				helperText={!match && 'Both passwords should match'}
				variant='outlined'
				margin='normal'
				fullWidth
				type='password'
				onChange={event => validatePasswordsMatch()}
			/>
		);
	}

	return <>{fieldsToRender}</>;
};

export default PasswordTextField;

import PasswordTextField from '../components/auth/PasswordTextField';
import React, { useState } from 'react'

const Profile = () => {
	const [pwd, setPwd] = useState('');
	return (
		<div>
			<h1>Hello!</h1>
			
			<h2>Change your password</h2>
			<form action='submit' onSubmit={() => console.log('Password: ', pwd)}>
				<PasswordTextField isLoginMode={true} password={pwd} setPassword={setPwd} />
				<button action='submit' text='Change Password' />
			</form>
		</div>
	);
};

export default Profile;

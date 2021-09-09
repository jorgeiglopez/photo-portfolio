import React, { useState } from 'react';

let logoutTimer;

const getExpiryFromLocalStorage = () => {
	const exp = localStorage.getItem('expiry');
	const remainingTime = exp ? new Date(exp).getTime() - new Date().getTime() : 0;
	if (remainingTime > 1000) {
		localStorage.setItem('expiry', remainingTime);
	} 
	// else {
	// 	localStorage.removeItem('auth');
	// 	localStorage.removeItem('expiry');
	// }
	return remainingTime;
};

const getTokenFromLocalStorage = () => {
	const authData = localStorage.getItem('auth');
	const expiry = getExpiryFromLocalStorage();
	if (authData) {
		return JSON.parse(authData).idToken;
	} else {
		return null;
	}
};

const AuthContext = React.createContext({
	token: null,
	isLoggedIn: false,
	logIn: (authData) => {},
	logOut: () => {},
});

export const AuthContextProvider = (props) => {
	const [token, setToken] = useState(getTokenFromLocalStorage());

	const logOutHandler = () => {
		setToken(null);
		localStorage.removeItem('auth');
		localStorage.removeItem('expiry');
		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}
	};

	const setExpirationTimer = (expiresInSec) => {
		const remainingMil = parseInt(expiresInSec) * 1000;
		const expiryMil = new Date().getTime() + remainingMil;
		logoutTimer = setTimeout(logOutHandler, remainingMil);
		localStorage.setItem('expiry', expiryMil);
	};

	const logInHandler = (authData) => {
		console.log(authData);
		setToken(authData.idToken);
		localStorage.setItem('auth', JSON.stringify(authData));
		setExpirationTimer(authData.expiresIn);
	};

	// TODO: implement refresh token
	const ctxValue = {
		token: token,
		isLoggedIn: !!token,
		logIn: logInHandler,
		logOut: logOutHandler,
	};

	return <AuthContext.Provider value={ctxValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;

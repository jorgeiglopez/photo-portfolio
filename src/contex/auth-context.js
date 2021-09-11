import React, { useState } from 'react';

let logoutTimer;

const clearAuthDataAndExpiry = () => {
	localStorage.removeItem('auth');
	localStorage.removeItem('expiry');
	if (logoutTimer) {
		clearTimeout(logoutTimer);
	}
};

const validateTokenExpiry = () => {
	const exp = localStorage.getItem('expiry');
	const remainingTime = exp ? exp - new Date().getTime() : 0;
	if (remainingTime > 0) {
		return exp;
	} else {
		clearAuthDataAndExpiry();
		return null;
	}
};

const getTokenFromLocalStorage = () => {
	const authData = localStorage.getItem('auth');
	return authData? JSON.parse(authData).idToken : null;
};

const AuthContext = React.createContext({
	token: null,
	isLoggedIn: false,
	logIn: (authData) => {},
	logOut: () => {},
});

export const AuthContextProvider = (props) => {
	validateTokenExpiry();
	const [token, setToken] = useState(getTokenFromLocalStorage());

	const logOutHandler = () => {
		setToken(null);
		clearAuthDataAndExpiry();
	};

	const setExpirationTimer = (expiresInMil) => {
		logoutTimer = setTimeout(logOutHandler, expiresInMil);
		const expiry = new Date().getTime() + expiresInMil;
		localStorage.setItem('expiry', expiry);
	};

	const logInHandler = (authData) => {
		localStorage.setItem('auth', JSON.stringify(authData));
		setToken(authData.idToken);
		setExpirationTimer(parseInt(authData.expiresIn) * 1000);
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

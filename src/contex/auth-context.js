import React, { useState } from 'react';

const AuthContext = React.createContext({
	token: null,
	isLoggedIn: false,
	logIn: (token) => {},
	logOut: () => {},
});

export const AuthContextProvider = (props) => {
	const [token, setToken] = useState(null);

	// TODO: implement refresh token
	const ctxValue = {
		token: token,
		isLoggedIn: !!token,
		logIn: (token) => setToken(token),
		logOut: () => setToken(null),
	};

	return <AuthContext.Provider value={ctxValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;

import React, { createContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../Utils/useLocalStorage';

export const AuthContext = createContext();

function AuthContextProvider(props) {
	const [AuthToken, setAuth] = useLocalStorage('auth');
	const [isLogged, setIsLogged] = useLocalStorage('isLogged');
	const [isAdmin, setIsAdmin] = useState(false);
	const UserLogin = ({ token, userId, isAdmin }) => {
		setAuth({ token, userId });
		setIsLogged(true);
		setIsAdmin(isAdmin);
	};
	const UserLogout = () => {
		localStorage.removeItem('auth');
		setIsLogged(false);
	};
	return (
		<AuthContext.Provider
			value={{
				isLogged,
				isAdmin,
				setIsLogged,
				AuthToken,
				UserLogin,
				UserLogout,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContextProvider;

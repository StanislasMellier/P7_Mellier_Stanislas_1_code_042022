import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import Api from '../Utils/api';

function PrivateRoute({ children }) {
	const { isLogged, setIsLogged, AuthToken } = useContext(AuthContext);
	useEffect(() => {
		try {
			Api.post(
				'/user/check',
				{ userId: AuthToken.userId, token: AuthToken.token },
				{ headers: { Authorization: `Bearer ${AuthToken.token}` } }
			)
				.then((res) => {
					if (res.data.isValid) {
						setIsLogged(true);
					} else {
						setIsLogged(false);
					}
				})
				.catch((err) => {
					setIsLogged(false);
					// navigate('/login');
					throw err;
				});
		} catch (error) {
			setIsLogged(false);
			console.error(error);
		}
	}, [AuthToken]);
	return isLogged ? children : <Navigate to='/login' />;
}

export default PrivateRoute;

import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../Utils/useLocalStorage';

function PrivateRoute({ children }) {
	const [AuthToken, setAuthToken] = useLocalStorage('auth', '');
	const [isLogged, setIsLogged] = useLocalStorage('isLogged', null);
	const { userId, token } = AuthToken;
	const navigate = useNavigate();
	useEffect(() => {
		const checkUser = async () => {
			const data = await axios
				.post(
					'http://localhost:3001/api/user/check',
					{ userId, token },
					{ headers: { Authorization: `Bearer ${token}` } }
				)
				.then((res) => {
					return res;
				})
				.catch((err) => {
					return err;
				});
			if (data.status !== 200) {
				setIsLogged(false);
				navigate('/login');
				return false;
			} else {
				return true;
			}
		};
		checkUser();
	}, [AuthToken]);

	return children;
}

export default PrivateRoute;

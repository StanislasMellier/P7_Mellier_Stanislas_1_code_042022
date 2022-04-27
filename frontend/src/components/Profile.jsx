import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../Utils/useLocalStorage';

function Profile({ userId, token }) {
	const navigate = useNavigate();
	const [userData, setUserData] = useState({});
	const [OpenMenu, setOpenMenu] = useState(false);
	const [AuthToken, setAuthToken] = useLocalStorage('auth', '');

	useEffect(() => {
		const userData = async () => {
			const res = await axios.get(
				`http://localhost:3001/api/user/${userId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setUserData(res.data.user);
		};
		userData();
	}, [AuthToken]);

	const handleLogout = () => {
		setAuthToken('');
	};
	return (
		<div className='header-profile'>
			<img
				onClick={() => {
					setOpenMenu(!OpenMenu);
				}}
				className='header-profile-img'
				src={`http://localhost:3001/images/${userData.profilePicUrl}`}
				alt=''
			/>
			{OpenMenu ? (
				<div className='header-profile-menu'>
					<div
						onClick={handleLogout}
						className='header-profile-logout'
					>
						Se déconnecter
					</div>
				</div>
			) : null}
		</div>
	);
}

export default Profile;

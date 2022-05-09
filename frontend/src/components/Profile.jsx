import Api from '../Utils/api';
import React, { useEffect, useRef, useState } from 'react';
import { FaUserShield } from 'react-icons/fa';
import UserParams from './UserParams';

function Profile({ userId, token, logout, isAdmin }) {
	const [userData, setUserData] = useState({});
	const [OpenMenu, setOpenMenu] = useState(false);
	const [OpenParams, setOpenPrams] = useState(false);

	const ref = useRef();
	useEffect(() => {
		const ClickedOutside = (e) => {
			if (OpenMenu && ref.current && !ref.current.contains(e.target)) {
				setOpenMenu(false);
			}
		};
		document.addEventListener('click', ClickedOutside);
		return () => {
			document.removeEventListener('click', ClickedOutside);
		};
	}, [OpenMenu]);
	useEffect(() => {
		const userData = async () => {
			const res = await Api.get(`/user/${userId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setUserData(res.data.user);
		};
		userData();
	}, [userId, token]);

	const handleLogout = () => {
		logout();
		console.log('Profile : handlelogout');
	};
	const handleOpenParams = () => {
		setOpenPrams(!OpenParams);
	};
	return (
		<>
			<div ref={ref} className='header-profile'>
				<div className='header-profile-img'>
					{userData.profilePicUrl !== undefined ? (
						<img
							onClick={() => {
								setOpenMenu(!OpenMenu);
							}}
							src={`${process.env.REACT_APP_IMAGES_URL}/${userData.profilePicUrl}`}
							alt=''
						/>
					) : null}
					{isAdmin ? (
						<FaUserShield className='header-profile-admin' />
					) : null}
				</div>
				{OpenMenu ? (
					<div className='header-profile-menu'>
						<div
							onClick={handleLogout}
							className='header-profile-opt'
						>
							Se déconnecter
						</div>
						<div
							onClick={handleOpenParams}
							className='header-profile-opt'
						>
							Paramètres
						</div>
					</div>
				) : null}
			</div>
			{OpenParams ? <UserParams toggle={handleOpenParams} /> : null}
		</>
	);
}

export default Profile;

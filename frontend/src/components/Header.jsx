import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Header.css';
import IconLeftBlack from '../assets/logo/icon-left-font-monochrome-black.svg';
import { useLocalStorage } from '../Utils/useLocalStorage';
import axios from 'axios';
import Profile from './Profile';
function Header() {
	const [AuthToken, setAuthToken] = useLocalStorage('auth', '');

	const [IsLogged, setIsLogged] = useState(false);
	useEffect(() => {
		if (AuthToken.userId) {
			setIsLogged(true);
			console.log(IsLogged);
		}
	}, []);
	return (
		<header className='header'>
			<div className='logo'>
				<Link to='/'>
					<img className='logo-header' src={IconLeftBlack} alt='' />
				</Link>
			</div>
			{IsLogged ? (
				<Profile userId={AuthToken.userId} token={AuthToken.token} />
			) : (
				<ul>
					<li>
						<Link to='/login'>Se connecter</Link>
					</li>
					<li>
						<Link to='/register'>S'enregistrer</Link>
					</li>
				</ul>
			)}
		</header>
	);
}

export default Header;

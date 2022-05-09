import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';
import IconLeftBlack from '../assets/logo/icon-left-font-monochrome-black.svg';
import Profile from './Profile';
import { AuthContext } from '../Context/AuthContext';
function Header() {
	const { isLogged, isAdmin, AuthToken, UserLogout } =
		useContext(AuthContext);
	return (
		<header className='header'>
			<div className='logo'>
				<Link to='/'>
					<img className='logo-header' src={IconLeftBlack} alt='' />
				</Link>
			</div>
			{isLogged ? (
				<Profile
					logout={() => {
						UserLogout();
					}}
					userId={AuthToken.userId}
					token={AuthToken.token}
					isAdmin={isAdmin}
				/>
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

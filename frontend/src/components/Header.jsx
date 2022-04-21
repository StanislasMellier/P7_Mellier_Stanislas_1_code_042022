import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import IconLeftBlack from '../assets/logo/icon-left-font-monochrome-black.svg';
function Header() {
	return (
		<header className='header'>
			<div className='logo'>
				<Link to='/'>
					<img className='logo-header' src={IconLeftBlack} alt='' />
				</Link>
			</div>
			<ul>
				<li>
					<Link to='/login'>Se connecter</Link>
				</li>
				<li>
					<Link to='/register'>S'enregistrer</Link>
				</li>
			</ul>
		</header>
	);
}

export default Header;

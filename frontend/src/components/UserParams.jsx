import Api from '../Utils/api';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

function UserParams({ toggle }) {
	const navigate = useNavigate();
	const { AuthToken, UserLogout } = useContext(AuthContext);

	const [ProfilePic, setProfilePic] = useState({});

	const [sucessMsg, setSucessMsg] = useState('');
	const [ProfilErrMsg, setProfilErrMsg] = useState('');
	const [PasswordErrMsg, setPasswordErrMsg] = useState('');
	const handleProfilePic = (e) => {
		e.preventDefault();
		console.log('submit');
		console.log(ProfilePic);
		if (!ProfilePic.name) {
			setProfilErrMsg('Veuiller joindre un fichier');
			return;
		}
		const formData = new FormData();
		formData.append('image', ProfilePic);
		formData.append('userId', AuthToken.userId);

		Api.put('/user/profilpic', formData, {
			headers: {
				Authorization: `Bearer ${AuthToken.token}`,
				'Content-Type': 'multipart/form-data',
			},
		})
			.then((res) => {
				console.log(res.data.message);
				setSucessMsg(res.data.message);
				setProfilErrMsg('');
				console.log(sucessMsg);
			})
			.catch(() => {
				setProfilErrMsg('Erreur Server : Veuillez réessayer plus tard');
			});
	};

	const [password, setPassword] = useState('');
	const handleDelete = (e) => {
		e.preventDefault();
		if (!password) {
			setPasswordErrMsg('Veuillez entrez un mot de passe');
			return;
		}
		Api.delete('/user', {
			data: { userId: AuthToken.userId, password },
			headers: { Authorization: `Bearer ${AuthToken.token}` },
		})
			.then((res) => {
				console.log(res.data.message);
				UserLogout();
			})
			.catch((err) => {
				setPasswordErrMsg(err.response.data.message);
			});
	};
	return (
		<div
			onClick={(e) => {
				if (e.target.id === 'parametres-layout') {
					toggle();
				}
			}}
			id='parametres-layout'
			className='parametres-layout'
		>
			<div id='parametres' className='parametres'>
				<h1>Paramètres</h1>
				<form onSubmit={handleProfilePic} className='parametres-opt'>
					<h3>Changer votre photo de profil</h3>
					<label htmlFor='profilepic'>Photo de profil</label>
					<input
						onChange={(e) => {
							setProfilePic(e.target.files[0]);
						}}
						type='file'
						name='profilepic'
						id='profilepic'
					/>
					{sucessMsg ? (
						<div className='sucess-msg'>{sucessMsg}</div>
					) : null}
					{ProfilErrMsg ? (
						<div className='error-msg'>{ProfilErrMsg}</div>
					) : null}
					<button type='submit'>Envoyer</button>
				</form>
				<form onSubmit={handleDelete} className='parametres-opt'>
					<h3>Supprimer votre compte</h3>
					<label htmlFor='password'>Mot de passe</label>
					<input
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						type='password'
						name='password'
						id='password'
					/>
					{PasswordErrMsg ? (
						<div className='error-msg'>{PasswordErrMsg}</div>
					) : null}
					<button type='submit'>Supprimer le compte</button>
				</form>
			</div>
		</div>
	);
}

export default UserParams;

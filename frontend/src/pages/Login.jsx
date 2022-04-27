import React, { useState } from 'react';
import axios from 'axios';
import './css/AuthStyle.css';
import { useLocalStorage } from '../Utils/useLocalStorage';
import { useNavigate } from 'react-router-dom';
function Login() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const { email, password } = formData;
	const [errorMsg, setErrorMsg] = useState('');
	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const [AuthToken, setAuthToken] = useLocalStorage('auth', '');
	const [isLogged, setIsLogged] = useLocalStorage('isLogged', null);
	const onSubmit = (e) => {
		e.preventDefault();

		axios
			.post('http://localhost:3001/api/user/login', {
				email: email,
				password: password,
			})
			.then((res) => {
				setAuthToken(res.data);
				setTimeout(() => {
					navigate('/');
				}, 1000);
			})
			.catch((error) => {
				setErrorMsg(error.response.data.message);
			});
	};

	return (
		<section className='auth-main'>
			<form className='auth-form' onSubmit={onSubmit}>
				<div className='auth-form-input'>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						name='email'
						id='email'
						value={email}
						onChange={onChange}
						required
					/>
				</div>
				<div className='auth-form-input'>
					<label htmlFor='password'>Mot de passe</label>
					<input
						type='password'
						name='password'
						id='password'
						value={password}
						onChange={onChange}
						required
					/>
				</div>
				<p className='error-msg'>{errorMsg}</p>
				<button className='auth-form-submit' type='submit'>
					Se connecter
				</button>
			</form>
		</section>
	);
}

export default Login;

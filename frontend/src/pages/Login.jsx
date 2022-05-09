import React, { useContext, useState } from 'react';
import Api from '../Utils/api';
import './css/AuthStyle.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
function Login() {
	const navigate = useNavigate();
	const { UserLogin } = useContext(AuthContext);

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

	const onSubmit = (e) => {
		e.preventDefault();

		Api.post('/user/login', {
			email: email,
			password: password,
		})
			.then((res) => {
				UserLogin(res.data);
				setTimeout(() => {
					navigate('/');
				}, 500);
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

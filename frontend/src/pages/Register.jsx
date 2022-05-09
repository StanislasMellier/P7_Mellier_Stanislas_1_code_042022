import React, { useContext, useState } from 'react';
import Api from '../Utils/api';
import './css/AuthStyle.css';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
function Register() {
	const { UserLogin } = useContext(AuthContext);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const { name, email, password } = formData;
	const [errorMsg, setErrorMsg] = useState('');
	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	const onSubmit = (e) => {
		e.preventDefault();

		Api.post('/user/register', {
			email: email,
			name: name,
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
					<label htmlFor='name'>Nom</label>
					<input
						type='text'
						name='name'
						id='name'
						value={name}
						onChange={onChange}
						required
					/>
				</div>
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
					S'enregistrer
				</button>
			</form>
		</section>
	);
}

export default Register;

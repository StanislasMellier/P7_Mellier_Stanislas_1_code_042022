import React, { useState } from 'react';
import './AuthStyle.css';
function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const { email, password } = formData;

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	const onSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<section className='main'>
			<form className='form' onSubmit={onSubmit}>
				<div className='form-input'>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						name='email'
						id='email'
						value={email}
						onChange={onChange}
					/>
				</div>
				<div className='form-input'>
					<label htmlFor='password'>Mot de passe</label>
					<input
						type='password'
						name='password'
						id='password'
						value={password}
						onChange={onChange}
					/>
				</div>
				<button className='form-submit' type='submit'>
					Se connecter
				</button>
			</form>
		</section>
	);
}

export default Login;

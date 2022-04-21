import React, { useState } from 'react';
import './AuthStyle.css';
function Register() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const { name, email, password } = formData;

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
					<label htmlFor='name'>Nom</label>
					<input
						type='text'
						name='name'
						id='name'
						value={name}
						onChange={onChange}
					/>
				</div>
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
					S'enregistrer
				</button>
			</form>
		</section>
	);
}

export default Register;

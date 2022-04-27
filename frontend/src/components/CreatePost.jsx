import axios from 'axios';
import React, { useState } from 'react';
import { useLocalStorage } from '../Utils/useLocalStorage';

function CreatePost() {
	const [{ userId, token }, setAuthToken] = useLocalStorage('auth', '');
	const [errorMsg, seterrorMsg] = useState('');
	const [title, settitle] = useState('');
	const [description, setdescription] = useState('');
	const [image, setimage] = useState([]);
	const handleClick = (e) => {
		e.preventDefault();
		if (!title) {
			seterrorMsg('Le titre est obligatoire');
			return;
		} else seterrorMsg('');
		const formData = new FormData();
		formData.append('userId', userId);
		formData.append('title', title);
		if (description) {
			formData.append('description', description);
		}
		if (image[0]) {
			formData.append('image', image[0]);
		}
		axios.post('http://localhost:3001/api/posts/create', formData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		});
	};

	return (
		<div className='createPost'>
			<input
				type='text'
				className='createPost-title'
				placeholder='Tittre du post'
				value={title}
				onChange={(e) => {
					settitle(e.target.value);
				}}
			/>
			<input
				type='text'
				className='createPost-description'
				placeholder='Description du post'
				value={description}
				onChange={(e) => {
					setdescription(e.target.value);
				}}
			/>
			<input
				type='file'
				name='image'
				className='input-image'
				onChange={(e) => {
					setimage(e.target.files);
				}}
			/>
			<div className='error-msg'>{errorMsg}</div>
			<button onClick={handleClick} className='createPost-btn'>
				Poster
			</button>
		</div>
	);
}

export default CreatePost;

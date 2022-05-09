import Api from '../Utils/api';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';

function CreatePost({ onAdd }) {
	const { AuthToken } = useContext(AuthContext);
	const { userId, token } = AuthToken;
	const [errorMsg, seterrorMsg] = useState('');
	const [title, settitle] = useState('');
	const [description, setdescription] = useState('');
	const [image, setimage] = useState([]);
	const handleSubmit = (e) => {
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
		Api.post('/posts/create', formData, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		}).then((res) => {
			onAdd(res.data.postId);
			settitle('');
			setdescription('');
			setimage([]);
		});
	};

	return (
		<form onSubmit={handleSubmit} className='createPost'>
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
			<button className='createPost-btn'>Poster</button>
		</form>
	);
}

export default CreatePost;

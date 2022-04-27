import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../Utils/useLocalStorage';
import './css/Post.css';
import { FaUserShield } from 'react-icons/fa';
import { BiSend } from 'react-icons/bi';
import { FiMoreVertical } from 'react-icons/fi';
export default function Post({
	userId,
	createdAt,
	title,
	description,
	imageUrl,
	likes,
	postId,
}) {
	const [AuthToken, setAuthToken] = useLocalStorage('auth', '');
	const [user, setuser] = useState({});
	useEffect(() => {
		axios
			.get(`http://localhost:3001/api/user/${userId}`, {
				headers: { Authorization: `Bearer ${AuthToken.token}` },
			})
			.then((res) => {
				setuser(res.data.user);
			});
	}, []);

	const [answer, setAnswer] = useState('');
	const handleSendAnswer = () => {
		axios.post(
			'http://localhost:3001/api/posts/answer',
			{
				postId,
				userId: AuthToken.userId,
				content: answer,
			},
			{ headers: { Authorization: `Bearer ${AuthToken.token}` } }
		);
	};
	const [OpenPostOptions, setOpenPostOptions] = useState(false);
	const handlePostOptions = () => {
		setOpenPostOptions(!OpenPostOptions);
	};
	const handleDeletePost = () => {
		console.log(postId);
		axios.delete('http://localhost:3001/api/posts/', {
			data: { postId },
			headers: { Authorization: `Bearer ${AuthToken.token}` },
		});
	};
	return (
		<div className='post'>
			<div className='post-user'>
				<img
					className='post-user-profile'
					src={`http://localhost:3001/images/${user.profilePicUrl}`}
					alt=''
				/>
				<div className='post-user-name'>{user.name}</div>
				{user.isAdmin ? (
					<FaUserShield className='post-user-admin' />
				) : null}
			</div>
			<div className='post-title'>{title}</div>
			{description ? (
				<div className='post-description'>{description}</div>
			) : null}
			{imageUrl ? (
				<img
					src={`http://localhost:3001/images/${imageUrl}`}
					alt={`${imageUrl}`}
				/>
			) : null}
			<div className='post-comments'>
				<label htmlFor='comment'>Commenter : </label>
				<input
					type='text'
					name='comment'
					id='comment'
					value={answer}
					onChange={(e) => {
						setAnswer(e.target.value);
					}}
				/>
				<button
					onClick={handleSendAnswer}
					className='post-comments-send'
				>
					<BiSend className='post-comments-send-icon' />
				</button>
			</div>
			{userId === AuthToken.userId ? (
				<button className='post-options' onClick={handlePostOptions}>
					<FiMoreVertical className='post-options-icon' />
				</button>
			) : null}
			{OpenPostOptions ? (
				<div className='post-options-menu'>
					<button
						onClick={handleDeletePost}
						className='post-options-menu-btn suppr'
					>
						Supprimer
					</button>
				</div>
			) : null}
		</div>
	);
}

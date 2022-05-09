import Api from '../Utils/api';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { AuthContext } from '../Context/AuthContext';
import './css/Answer.css';
function Answer({ props, onDelete }) {
	const { AuthToken, isAdmin } = useContext(AuthContext);
	const [profilePic, setProfilePic] = useState('');
	const [OpenAnswerOptions, setOpenAnswerOptions] = useState(false);
	useEffect(() => {
		Api.get(`/user/${props.createdBy}`, {
			headers: { Authorization: `Bearer ${AuthToken.token}` },
		}).then((res) => {
			setProfilePic(res.data.user.profilePicUrl);
		});
	}, []);
	const handleAnswerOptions = () => {
		setOpenAnswerOptions(!OpenAnswerOptions);
	};
	const ref = useRef();
	useEffect(() => {
		const ClickedOutside = (e) => {
			if (
				OpenAnswerOptions &&
				ref.current &&
				!ref.current.contains(e.target)
			) {
				setOpenAnswerOptions(false);
			}
		};
		document.addEventListener('click', ClickedOutside);
		return () => {
			document.removeEventListener('click', ClickedOutside);
		};
	}, [OpenAnswerOptions]);
	const handleDeleteAnswer = () => {
		Api.delete('/posts/answer/', {
			data: { answerId: props.id },
			headers: { Authorization: `Bearer ${AuthToken.token}` },
		}).then((res) => {
			setOpenAnswerOptions(!OpenAnswerOptions);
		});
		onDelete(props.id);
	};
	return (
		<div ref={ref} className='answer'>
			<div className='answer-profile'>
				<img
					src={`${process.env.REACT_APP_IMAGES_URL}/${profilePic}`}
					alt=''
				/>
			</div>
			<div className='answer-content'>{props.content}</div>
			{props.createdBy === AuthToken.userId || isAdmin ? (
				<button
					className='answer-options'
					onClick={handleAnswerOptions}
				>
					<FiMoreVertical className='answer-options-icon' />
				</button>
			) : null}
			{OpenAnswerOptions ? (
				<div className='post-options-menu'>
					<button
						onClick={handleDeleteAnswer}
						className='post-options-menu-btn suppr'
					>
						Supprimer
					</button>
				</div>
			) : null}
		</div>
	);
}

export default Answer;

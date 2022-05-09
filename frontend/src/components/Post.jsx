import Api from '../Utils/api';
import React, { useContext, useEffect, useRef, useState } from 'react';
import './css/Post.css';
import { FaUserShield, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { BiSend } from 'react-icons/bi';
import { FiMoreVertical } from 'react-icons/fi';
import Answer from './Answer';
import { AuthContext } from '../Context/AuthContext';
export default function Post({
	userId,
	createdAt,
	title,
	description,
	imageUrl,
	postId,
	refreshParent,
}) {
	const { AuthToken, isAdmin } = useContext(AuthContext);
	const [refresh, setrefresh] = useState('');
	const [user, setuser] = useState({});
	useEffect(() => {
		Api.get(`/user/${userId}`, {
			headers: { Authorization: `Bearer ${AuthToken.token}` },
		}).then((res) => {
			setuser(res.data.user);
		});
	}, [AuthToken]);

	const [answer, setAnswer] = useState('');
	const handleSendAnswer = (e) => {
		e.preventDefault();
		if (!answer) {
			return;
		}
		Api.post(
			'/posts/answer',
			{
				postId,
				userId: AuthToken.userId,
				content: answer,
			},
			{ headers: { Authorization: `Bearer ${AuthToken.token}` } }
		)
			.then((res) => {
				setAnswer('');
				setrefresh(res.data.answerId);
			})
			.catch((err) => {
				console.error(err);
			});
	};
	const [OpenPostOptions, setOpenPostOptions] = useState(false);
	const handlePostOptions = () => {
		setOpenPostOptions(!OpenPostOptions);
	};
	const ref = useRef();
	useEffect(() => {
		const ClickedOutside = (e) => {
			if (
				OpenPostOptions &&
				ref.current &&
				!ref.current.contains(e.target)
			) {
				setOpenPostOptions(false);
			}
		};
		document.addEventListener('click', ClickedOutside);
		return () => {
			document.removeEventListener('click', ClickedOutside);
		};
	}, [OpenPostOptions]);
	const handleDeletePost = () => {
		Api.delete('/posts/', {
			data: { postId },
			headers: { Authorization: `Bearer ${AuthToken.token}` },
		}).then(() => {
			refreshParent(postId);
			setOpenPostOptions(!OpenPostOptions);
		});
	};
	const [LatestAnswer, setLatestAnswer] = useState([]);
	useEffect(() => {
		Api.get('/posts/answer/latest', {
			params: { postId: postId, limit: 3, page: 0 },
			headers: { Authorization: `Bearer ${AuthToken.token}` },
		}).then((res) => {
			setLatestAnswer(res.data.results);
		});
	}, [refresh]);
	const [page, setPage] = useState(0);
	const handleLoadMoreAnswer = () => {
		setPage(+1);
		Api.get('/posts/answer/latest', {
			params: { postId: postId, limit: 3, page: page + 1 },
			headers: { Authorization: `Bearer ${AuthToken.token}` },
		}).then((res) => {
			setLatestAnswer((prev) => {
				return [...prev, ...res.data.results];
			});
		});
	};
	const handleResetAnswer = () => {
		setPage(0);
		console.log(LatestAnswer);
		const array = [LatestAnswer[0], LatestAnswer[1], LatestAnswer[2]];
		setLatestAnswer(array);
	};
	const handleAnswerdelete = (id) => {
		setrefresh(id);
	};
	return (
		<div ref={ref} className='post'>
			<div className='post-user'>
				<div className='post-user-profile'>
					{user.profilePicUrl !== undefined ? (
						<img
							src={`${process.env.REACT_APP_IMAGES_URL}/${user.profilePicUrl}`}
							alt=''
						/>
					) : null}
				</div>
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
					src={`${process.env.REACT_APP_IMAGES_URL}/${imageUrl}`}
					alt={`${imageUrl}`}
				/>
			) : null}
			<form onSubmit={handleSendAnswer} className='post-comments'>
				<label htmlFor='comment'>Commenter : </label>
				<input
					type='text'
					name='comment'
					value={answer}
					required
					onChange={(e) => {
						setAnswer(e.target.value);
					}}
				/>
				<button type='submit' className='post-comments-send'>
					<BiSend className='post-comments-send-icon' />
				</button>
			</form>
			<div className='post-answer'>
				{LatestAnswer.map((item, i) => {
					return (
						<Answer
							key={i}
							props={item}
							onDelete={handleAnswerdelete}
						></Answer>
					);
				})}
				<button onClick={handleLoadMoreAnswer}>
					<FaArrowDown />
				</button>
				<button onClick={handleResetAnswer}>
					<FaArrowUp />
				</button>
			</div>
			{userId === AuthToken.userId || isAdmin ? (
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

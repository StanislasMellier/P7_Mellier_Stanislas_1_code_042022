import React, { useContext, useEffect, useState } from 'react';
import './css/Home.css';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import Api from '../Utils/api';
import { AuthContext } from '../Context/AuthContext';
import { FaArrowDown } from 'react-icons/fa';
function Home() {
	const { AuthToken } = useContext(AuthContext);

	const [refresh, setrefresh] = useState('');
	const [PostList, setPostsList] = useState([]);
	const [page, setPage] = useState(0);

	useEffect(() => {
		Api.get('/posts/latest', {
			params: { limit: 10, page: 0 },
			headers: { Authorization: `Bearer ${AuthToken.token}` },
		})
			.then((res) => {
				setPostsList(res.data.results);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [refresh]);
	const handleLoadMorePost = () => {
		setPage(+1);
		Api.get('/posts/latest', {
			params: { limit: 10, page: page + 1 },
			headers: { Authorization: `Bearer ${AuthToken.token}` },
		})
			.then((res) => {
				setPostsList((prev) => {
					return [...prev, ...res.data.results];
				});
			})
			.catch((err) => {
				console.error(err);
			});
	};
	return (
		<div className='home-main'>
			<CreatePost
				onAdd={(id) => {
					setrefresh(id);
				}}
			/>
			{PostList.map((item, i) => {
				return (
					<Post
						key={item.id}
						title={item.title}
						userId={item.createdBy}
						description={item.description}
						postId={item.id}
						imageUrl={item.imageUrl}
						refreshParent={(id) => {
							setrefresh(id);
						}}
					/>
				);
			})}
			<button className='more-post' onClick={handleLoadMorePost}>
				<FaArrowDown className='more-post-icon' />
			</button>
		</div>
	);
}

export default Home;

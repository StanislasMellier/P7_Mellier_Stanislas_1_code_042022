import React, { useEffect, useState } from 'react';
import './css/Home.css';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import axios from 'axios';
import { useLocalStorage } from '../Utils/useLocalStorage';
function Home() {
	const [AuthToken, setAuthToken] = useLocalStorage('auth', '');
	const [PostList, setPostsList] = useState([]);
	useEffect(() => {
		axios
			.get('http://localhost:3001/api/posts/latest', {
				headers: { Authorization: `Bearer ${AuthToken.token}` },
			})
			.then((res) => {
				setPostsList(res.data.results);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);
	return (
		<div className='home-main'>
			<section>
				<CreatePost />
				{PostList.map((item, i) => {
					return (
						<Post
							key={i}
							title={item.title}
							userId={item.createdBy}
							description={item.description}
							likes={item.likes}
							postId={item.id}
							imageUrl={item.imageUrl}
						/>
					);
				})}
			</section>
		</div>
	);
}

export default Home;

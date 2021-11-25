
import { useEffect, useState } from 'react';
import { time } from 'faker';
import { Post } from './';

const posts = [
	{
		id: '123',
		username: 'dtaylor',
		userImg: 'http://lorempixel.com/400/200/city',
		img: 'http://lorempixel.com/400/200/city',
		caption: 'This is DOPE'
	},
	{
		id: '122223',
		username: 'dtaylor',
		userImg: 'http://lorempixel.com/400/200/city',
		img: 'http://lorempixel.com/400/200/city',
		caption: 'This is DOPE'
	},
	{
		id: '13323',
		username: 'dtaylor',
		userImg: 'http://lorempixel.com/400/200/city',
		img: 'http://lorempixel.com/400/200/city',
		caption: 'This is DOPE'
	},
	{
		id: '14423',
		username: 'dtaylor',
		userImg: 'http://lorempixel.com/400/200/city',
		img: 'http://lorempixel.com/400/200/city',
		caption: 'This is DOPE'
	},
]
const Posts = () => {
	// const [posts, setPosts] = useState([]);

	// useEffect(() => {
	// 	const posts = [...Array(20)].map((_, index) => ({
	// 		id: time
	// 	}));
	// 	setPosts(posts);
	// }, []);
	return (
		<div>
			{posts.map((post) => (
				<Post
					key={post.id}
					id={post.id}
					username={post.username}
					userImg={post.userImg}
					img={post.img}
					caption={post.caption}
				/>
			))}
		</div>
	);
}

export default Posts;

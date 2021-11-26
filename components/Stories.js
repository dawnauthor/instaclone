import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import faker from 'faker';
import { Story } from './';

const Stories = () => {
	const {data: session} = useSession();
	const [suggestions, setSuggestions] = useState([]);
	useEffect(() => {
		const suggestions = [...Array(20)].map((_, index) => ({
			...faker.helpers.contextualCard(),
			id: index
		}))
		setSuggestions(suggestions);
	}, []);
	//Having to use for image generation at random
	const i = 1;
	return (
		<div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
			{session && (
				<Story img={session.user.image} username={session.user.username} />
			)}
			{suggestions.map((profile) => (
					<Story
						key={profile.id}
						// img={`https://picsum.photos/id/${Math.floor(Math.random() * (max-min) + min)}/200/300`}//hard coded for now, faker cloud cdn is down for serving avatar photos
						// img={`https://source.unsplash.com/user/c_v_r`}//hard coded for now, faker cloud cdn is down for serving avatar photos
						img={`https://source.unsplash.com/random/400x400?sig=${i++}`}
						username={profile.username}
					/>
			))}
		</div>
	);
}

export default Stories;

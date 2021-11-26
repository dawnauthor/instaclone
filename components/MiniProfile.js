import { signOut, useSession } from 'next-auth/react';

const MiniProfile = () => {
	const {data: session} = useSession();
	return (
		<div className="flex items-center justify-between mt-14 ml-10">
			<img
				className="rounded-full border p-[2px] w-16 h-16"
				src="http://lorempixel.com/400/200/animals"
				alt=""
			/>
			<div className="flex-1 mx-4">
				<h2 className="font-bold">{session.user.username}</h2>
				<h3 className="textsm text-gray-400">Welcome to InstaClone</h3>
			</div>
			<button onClick={signOut} className="text-blue-400 text-sm font-semibold">
				Sign Out
			</button>
		</div>
	);
}

export default MiniProfile;


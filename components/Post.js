import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import {
	BookmarkIcon,
	ChatIcon,
	DotsHorizontalIcon,
	EmojiHappyIcon,
	HeartIcon,
	PaperAirplaneIcon,
} from '@heroicons/react/outline';
import { Comments } from './';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from '@firebase/firestore';
import { db } from '../firebase';

const Post = ({ id, username, userImg, img, caption }) => {
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState("");
	const [likes, setLikes] = useState([]);
	const {data: session} = useSession();
	const [hasLiked, setHasLiked] = useState(false);

	useEffect(() => {
		return onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), snapshot => {
			setComments(snapshot.docs);
		});
	}, [db,id]);

	useEffect(() => {
		return onSnapshot(collection(db, 'posts', id, 'likes'), snapshot => {
			setLikes(snapshot.docs);
		});
	}, [db,id]);

	useEffect(() => {
		setHasLiked(likes.findIndex((like) => like.id == session?.user?.uid) !== -1);
	}, [likes]);

	const likePost = async () => {
		if(hasLiked) {
			await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
		} else {
			await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
				username: session.user.username
			});
		}
	}

	const sendComment = async (e) => {
		e.preventDefault();
		const commentToSend = comment;
		setComment('');
		await addDoc(collection(db, 'posts', id, 'comments'), {
			comment: commentToSend,
			username: session.user.username,
			userImage: session.user.image,
			timestamp: serverTimestamp()
		});
	}
	return (
		<div className="bg-white my-7 border rounded-sm">
			{/* Header */}
			<div className="flex items-center p-5">
				<img
					src={userImg}
					alt={username}
					className="rounded-full h-12 w-12 border p-1 mr-3"

				/>
				<p className="flex-1 font-bold">{username}</p>
				<DotsHorizontalIcon className="h-5" />
			</div>
			{/* img */}
			<img
				className="object-cover w-full"
				src={img}
				alt={username}
			/>
			{/* buttons */}
			{session && (
				<div className="flex justify-between px-4 pt-4 pb-1">
					<div className="flex space-x-4">
						{hasLiked ? (
							<HeartIconFilled className="btn text-red-500" onClick={likePost}/>
						): (
							<HeartIcon
								className="btn"
								onClick={likePost}
							/>
						)}
						<ChatIcon className="btn"/>
						<PaperAirplaneIcon className="btn"/>
					</div>
					<BookmarkIcon className="btn" />
				</div>
			)}
			{/* caption */}
			<p className="p-5 truncate">
				{likes.length > 0 && (
					<p className="font-bold mb-1 ">{likes.length} {likes.length > 1 ? 'likes' : 'like'}</p>
				)}
				<span className="font-bold mr-1">{username}</span>
				{caption}
			</p>
			{/* comments */}
			{/* <Comments comments={comments} /> */}
			{comments.length > 0 && (
				<div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
					{comments.map((comment) => (
						<div key={comment.id} className="flex items-center space-x-2 mb-3">
							<img src={comment.data().userImage} alt="" className="h-7 rounded-full" />
							<p className="text-sm flex-1">
								<span className="font-bold">
									{comment.data().username}
								</span>{" "}
								{comment.data().comment}
							</p>
							<Moment fromNow className="pr-5 text-xs">
								{comment.data().timestamp?.toDate()}
							</Moment>
						</div>
					))}
				</div>
			)}
			{/* input box */}
			{session && (
				<form className="flex items-center p-4">
					<EmojiHappyIcon className="h-7" />
					<input
						type="text"
						value={comment}
						onChange={e => setComment(e.target.value)}
						placeholder="Add a comment..."
						className="border-none flex-1 focus:ring-0"
					/>
					<button
						type="submit"
						disabled={!comment.trim()}
						onClick={sendComment}
						className="font-semibold text-blue-400"
					>
						Post
					</button>
				</form>
			)}
		</div>
	);
}

export default Post;

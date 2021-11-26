const Comments = ({ comments }) => {
	return (
		<div>
			{comments.map((comment) => (
				<div>
					{comment}
				</div>
			))}
		</div>
	);
}

export default Comments;

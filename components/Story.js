const Story = ({ img, username }) => {
	return (
		<div className="h-14 w-14 flex-shrink-0">
			<img
				className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
				src={img}
				alt=""
			/>
			<p></p>
		</div>
	);
};

export default Story;

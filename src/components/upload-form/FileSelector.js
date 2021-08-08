const validImagesTypes = ['image/png', 'image/jpeg', 'image/jpg'];

const FileSelector = (props) => {
	const onChangeHandler = (event) => {
		const selectedFile = event.target.files[0];
		props.setFile(selectedFile);

		if (selectedFile && validImagesTypes.includes(selectedFile.type)) {
			props.setError(null);
		} else {
			props.setFile(null);
			props.setError('Incorrect file type. Must be an image: <.jpeg> or <.png>');
		}
	};

	return (
		<label>
			<input type='file' onChange={onChangeHandler} />
			<span>+</span>
		</label>
	);
};

export default FileSelector;

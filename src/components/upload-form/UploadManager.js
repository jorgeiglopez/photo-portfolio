import React, { useEffect } from 'react';
import useStorage from '../../hooks/useStorage';
import ProgressBar from './ProgressBar';

const UploadManager = (props) => {
	const {setFile, setError, file, album} = props;
	let { progress, url, error } = useStorage(file, album);

	useEffect(() => {
		setError(error ? error : null);
	}, [error, setError]);

	useEffect(() => {
		if (url) {
			setFile(null);
		}
	}, [url, setFile]);

	return (
		<React.Fragment>
			Uploading: {file.name}...
			<ProgressBar progress={progress} />
		</React.Fragment>
	);
};

export default UploadManager;

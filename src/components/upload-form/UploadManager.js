import React, { useEffect } from 'react';
import useStorage from '../../hooks/useStorage';
import ProgressBar from './ProgressBar';

const UploadManager = (props) => {
	let { progress, url, error } = useStorage(props.file, props.album);

	useEffect(() => {
		props.setError(error ? error : null);
	}, [error, props.setError]);

	useEffect(() => {
		if (url) {
			props.setFile(null);
		}
	}, [url, props.setFile]);

	return (
		<React.Fragment>
			Uploading: {props.file.name}...
			<ProgressBar progress={progress} />
		</React.Fragment>
	);
};

export default UploadManager;

import React, { useState, useEffect } from 'react';
import classes from './UploadForm.module.css';
import FileSelector from './FileSelector';
import UploadManager from './UploadManager';

const UploadForm = (props) => {
	const [file, setFile] = useState(null);
	const [error, setError] = useState(null);
	const [album, setAlbum] = useState(null);

	return (
		<form className={classes.form}>
			<h1>Create Album</h1>
			<h3>Name of the album: </h3>
			<input type='text' onChange={(e) => setAlbum(e.target.value)}></input>

			<FileSelector setFile={setFile} setError={setError} />
			<div className={classes.output}>
				{error && <div className={classes.error}>{error}</div>}
				{file && <UploadManager file={file} album={album} setFile={setFile} setError={setError}/>}
			</div>
		</form>
	);
};

export default UploadForm;

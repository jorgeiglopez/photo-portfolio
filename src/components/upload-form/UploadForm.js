import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import classes from './UploadForm.module.css'

const validImagesTypes = ['image/png', 'image/jpeg', 'image/jpg'];

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const onChangeHandler = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        if (selectedFile && validImagesTypes.includes(selectedFile.type)) {
            console.log('SELECTED: ', selectedFile);
            setError(null);
        } else {
            setFile(null);
            setError('Incorrect file type. Must be an image: <.jpeg> or <.png>');
        }
    };

    return (
        <form>
            <label>
                <input type='file' onChange={onChangeHandler} />
                <span>+</span>
            </label>
            <div className={classes['output']}>
                {error && <div className={classes['error']}>{error}</div>}
                {file && <div>{file.name}</div>}
                {file && <ProgressBar file={file} setFile={setFile} />}
            </div>
        </form>
    );
};

export default UploadForm;

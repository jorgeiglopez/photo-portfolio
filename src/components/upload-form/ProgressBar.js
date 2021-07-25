import React, { useEffect } from 'react';
import useStorage from '../../hooks/useStorage';
import { motion } from 'framer-motion';
import classes from './ProgressBar.module.css';

const ProgressBar = ({ album, file, setFile }) => {
	const { progress, url, error } = useStorage(file, album);

	useEffect(() => {
		if (url) {
			setFile(null);
		}
	}, [url, setFile]);

	return (
		<motion.div
			className={classes['progress-bar']}
			initial={{ width: 0 }}
			animate={{ width: progress + '%' }}></motion.div>
	);
};

export default ProgressBar;

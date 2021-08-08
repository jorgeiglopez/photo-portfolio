import React from 'react';
import { motion } from 'framer-motion';
import classes from './ProgressBar.module.css';

const ProgressBar = (props) => {
	return (
		<motion.div
			className={classes.progress}
			initial={{ width: 0 }}
			animate={{ width: props.progress + '%' }}></motion.div>
	);
};

export default ProgressBar;

import React from 'react';
import reactDom from 'react-dom';
import { motion } from 'framer-motion';
import classes from './ImageOverlay.module.css';

const Overlay = (props) => (
	<motion.div
		className={classes['backdrop']}
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		onClick={(e) => {
			e.target.classList.value && e.target.classList.value.includes('_backdrop_') && props.setSelectedImg(null);
		}}>
		<motion.img src={props.url} alt='Enlarged picture!' initial={{ y: '-100vh' }} animate={{ y: '0' }} />
	</motion.div>
);

const ImageOverlay = (props) => {
	const { setSelectedImg, url } = props;
	return (
		<>
			{reactDom.createPortal(
				<Overlay setSelectedImg={setSelectedImg} url={url} onClick={(event, reason) => console.log("Reassssson:", reason)}/>,
				document.getElementById('overlay-root')
			)}
		</>
	);
};

export default ImageOverlay;

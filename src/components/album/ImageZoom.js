import React from 'react';
import { motion } from 'framer-motion';
import classes from './ImageZoom.module.css';

const ImageDetail = (props) => {
    return (
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
};

export default ImageDetail;

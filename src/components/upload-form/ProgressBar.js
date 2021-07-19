import React, { useEffect } from 'react';
import useStorage from '../../hooks/useStorage';
import { motion } from 'framer-motion';
import classes from './ProgressBar'

const ProgressBar = ({ file, setFile }) => {
    const { progress, url, error } = useStorage(file);

    useEffect(() => {
        if (url) {
            setFile(null);
        }
    }, [url, setFile]);

    console.log('Progress --> ', progress);
    return (
        <motion.div className={classes['progress-bar']} initial={{ width: 0 }} animate={{ width: progress + '%' }}></motion.div>
    );
};

export default ProgressBar;

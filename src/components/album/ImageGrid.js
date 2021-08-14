import React from 'react';
import useFirestore from '../../hooks/useFirestore';
import { motion } from 'framer-motion';
import classes from './ImageGrid.module.css'
import ProgressiveImage from 'react-progressive-image';

const ImageGrid = (props) => {
    const { docs } = useFirestore('images');

    return (
        <div className={classes['img-grid']}>
            {docs &&
                docs.map((doc) => (
                    <motion.div
                        className={classes['img-wrap']}
                        key={doc.id}
                        layout
                        whileHover={{ opacity: 0.8 }}
                        onClick={() => {
                            props.setSelectedImg(doc.urls && doc.urls.original);
                        }}>
                        <ProgressiveImage src={doc.urls.original} placeholder={doc.urls.thumbnail}>
                            {(src, loading) => (
                                <img className={loading? classes['img-loading']: ''} src={src} alt="Loading image..." />
                            )}
                        </ProgressiveImage>
                    </motion.div>
                ))}
        </div>
    );
};

export default ImageGrid;

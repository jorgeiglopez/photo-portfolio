import React from 'react';
import useFirestore from '../../hooks/useFirestore';
import { motion } from 'framer-motion';
import classes from './ImageGrid.module.css'
import ProgressiveImage from 'react-progressive-image';

const ImageGrid = (props) => {
    const highResolution = props.highResolution || '2000px';
    const lowResolution = props.lowResolution || '800px';

    const { docs } = useFirestore(props.albumName); // TODO move the reading logic to AlbumPage - Implement set to avoid dupps
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
                            props.setSelectedImg(doc[highResolution] && doc[highResolution].url);
                        }}>
                        <ProgressiveImage src={doc[highResolution].url} placeholder={doc[lowResolution].url}>
                            {(src, loading) => (
                                <img className={loading? classes['img-loading']: ''} src={src} alt="Loading..." />
                            )}
                        </ProgressiveImage>
                    </motion.div>
                ))}
        </div>
    );
};

export default ImageGrid;

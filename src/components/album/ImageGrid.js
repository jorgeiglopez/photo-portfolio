import React from 'react';
import useFirestore from '../../hooks/useFirestore';
import { motion } from 'framer-motion';
import classes from './ImageGrid.module.css'

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
                        <motion.img
                            src={doc.urls && doc.urls.thumbnail}
                            alt='Image loading....'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        />
                    </motion.div>
                ))}
        </div>
    );
};

export default ImageGrid;

import React, { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

const useFirestore = (collection) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        if(!collection) {
            return docs;
        }
        const unsubscribe = projectFirestore
            .collection(collection)
            .orderBy('createdOn', 'desc')
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach((doc) => {
                    documents.push({ ...doc.data(), id: doc.id });
                });
                setDocs(documents);
            });

        return () => unsubscribe();
    }, [collection]);

    return { docs };
};

export default useFirestore;

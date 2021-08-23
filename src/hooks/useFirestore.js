import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

const useFirestore = (collection) => {
	const [docs, setDocs] = useState([]);
    const [error, setError] = useState(null) // TODO: implement error handling.

	useEffect(() => {
		if (!collection) {
			return [];
		}
		const unsubscribe = projectFirestore
			.collection(collection)
			.orderBy('createdOn', 'desc')
			.onSnapshot((snap) => {
                snap.forEach((doc) => {
                    console.log("useFirestore - Reading DB", doc.data())
                    setDocs(prevDocs => [...prevDocs, { ...doc.data(), id: doc.id }])
				});
			});
		return () => unsubscribe();
	}, [collection]);

	return {docs, error};
};

export default useFirestore;

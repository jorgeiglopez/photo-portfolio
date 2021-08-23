import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../firebase/config';

const useStorage = (file, album) => {
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState(null);
	const [url, setUrl] = useState(null);

	useEffect(() => {
		const filePath = `${album}/${file.name}`;
		const storageRef = projectStorage.ref().child(filePath);
		const collectionRef = projectFirestore.collection('images');
		console.log("useStorage - Uploading file")
		storageRef.put(file).on(
			'state_changed',
			(snap) => {
				let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
				setProgress(percentage.toFixed(2));
			},
			(err) => {
				setError(err);
			},
			async () => {
				const url = await storageRef.getDownloadURL();
				const createdAt = timestamp();

				collectionRef.doc(file.name).set({
					album: album,
					name: file.name,
					path: filePath,
					size: file.size,
					sizeMb: (file.size / 1000000).toFixed(2),
					type: file.type,
					version: 1,
					urls: {
						original: url,
						thumbnail: url,
					},
					createdAt,
				});
				setUrl(url);
			}
		);
	}, [file, album]);

	return { progress, error, url };
};

export default useStorage;

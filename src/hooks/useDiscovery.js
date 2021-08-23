import { projectStorage, projectFirestore } from '../firebase/config';
import { useEffect, useState } from 'react';

// Given the album name, will scan all the pictures and group them under ID and populate
// the different resolution objects information (Mainly, the URL)

const useDiscovery = (albumName) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		if (!albumName) return data;

		const getId = (text) => text.split('--')[0];
		const getSufix = (text) => text.split('--')[1].split('.')[0]; // "NAC_8427--800px.jpg"

		const dynamoRef = projectFirestore.collection(albumName);

		projectStorage
			.ref(albumName)
			.listAll()
			.then((res) => {
				if (res.items && res.items.length > 0) {
					res.items.forEach((item) => {
						item.getDownloadURL().then((url) => {
							const resolution = getSufix(item.name);
							const myPhoto = {
								id: getId(item.name),
								[resolution]: {
									album: item.parent.name,
									albumPath: item.parent.fullPath,
									name: item.name,
									suffix: getSufix(item.name),
									path: item.fullPath,
									url: url,
								},
							};
							dynamoRef.doc(myPhoto.id).set(myPhoto, { merge: true }); // save downloadURL
							// accum.push(myPhoto)
							setData((prevData) => [...prevData, myPhoto]);
						});
						item.getMetadata().then((meta) => {
							const resolution = getSufix(meta.name);
							const myMeta = {
								id: getId(meta.name),
								createdOn: meta.timeCreated,
								[resolution]: {
									size: meta.size / 1000000,
								},
							};
							dynamoRef.doc(myMeta.id).set(myMeta, { merge: true }); // save metadata
						});
					});
				}
			});
	}, [albumName]);

	return data;
};

// To update all the albums in one go!

export const useDiscoveryAll = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		projectStorage
			.ref()
			.listAll()
			.then((res) => {
				if (res.prefixes) {
					res.prefixes.forEach((al) => {
						setData((prevData) => [...prevData, al.name]);
					});
				}
			});
	}, []);

	return data;
};

export default useDiscovery;

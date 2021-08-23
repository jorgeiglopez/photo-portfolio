import { projectStorage, projectFirestore } from '../firebase/config';
import { useEffect, useState } from 'react';

// Given the album name, will scan all the pictures and group them under ID and populate
// the different resolution objects information (Mainly, the URL)

const useDiscovery = (albumName) => {
	const [data, setData] = useState([]);
    const [error, setError] = useState(null);

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
                            console.log("useDiscovery - getDownloadURL: ", myPhoto);
							dynamoRef.doc(myPhoto.id).set(myPhoto, { merge: true }); // save downloadURL
							setData((prevData) => [...prevData, myPhoto]);
                            setError(null);
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
                            console.log("useDiscovery - getMetadata: ", myMeta);
							dynamoRef.doc(myMeta.id).set(myMeta, { merge: true }); // save metadata
						});
					});
				}
			})
            .catch(error => {
                setError(error)
            });
	}, [albumName]);

	return {data, error};
};

// To update all the albums in one go!

export const useDiscoveryAll = () => {
	const [data, setData] = useState([]);
    const [error, setError] = useState(null);

	useEffect(() => {
		projectStorage
			.ref()
			.listAll()
			.then((res) => {
                setError(null);
				if (res.prefixes) {
                    console.log("useDiscoveryAll - reading folders: ", res.prefixes);
					res.prefixes.forEach((al) => {
						setData((prevData) => [...prevData, al.name]);
                        setError(null);
					});
				}
			})
            .catch(error => {
                setError(error)
            });
	}, []);

	return {data, error};
};

export default useDiscovery;

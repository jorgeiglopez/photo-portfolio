import React, { useState } from 'react';
import AlbumHeader from '../components/album/AlbumHeader';
import ImageGrid from '../components/album/ImageGrid';
import ImageOverlay from '../components/album/ImageOverlay';
import { useParams } from 'react-router-dom';

const AlbumPage = () => {
	const [selectedImg, setSelectedImg] = useState(null);
	const params = useParams();

	window.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			setSelectedImg(null);
		}
	});

	return (
		<div onKeyPress={(event) => console.log(event.key)}>
			<AlbumHeader albumName={params.albumName} />
			<ImageGrid setSelectedImg={setSelectedImg} albumName={params.albumName} />
			{selectedImg && <ImageOverlay url={selectedImg} setSelectedImg={setSelectedImg} />}
		</div>
	);
};

export default AlbumPage;

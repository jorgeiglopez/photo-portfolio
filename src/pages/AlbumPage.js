import React, { useState } from 'react';
import AlbumHeader from '../components/album/AlbumHeader';
import ImageGrid from '../components/album/ImageGrid';
import ImageZoom from '../components/album/ImageZoom';
import { useParams, useRouteMatch } from 'react-router-dom';

const AlbumPage = (props) => {
	const [selectedImg, setSelectedImg] = useState(null);
	// const match = useRouteMatch();
  	// const params = useParams();

	return (
		<div>
			<AlbumHeader />
			<ImageGrid setSelectedImg={setSelectedImg} />
			{selectedImg && <ImageZoom url={selectedImg} setSelectedImg={setSelectedImg} />}
		</div>
	);
};

export default AlbumPage;

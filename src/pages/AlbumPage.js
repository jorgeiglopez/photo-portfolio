import React, { useState } from 'react';
import AlbumHeader from '../components/album/AlbumHeader';
import ImageGrid from '../components/album/ImageGrid';
import ImageZoom from '../components/album/ImageZoom';
import { useParams, useRouteMatch } from 'react-router-dom';
import {useDiscoveryAll} from "../hooks/useDiscovery";

const AlbumPage = (props) => {
	const [selectedImg, setSelectedImg] = useState(null);
	// const match = useRouteMatch();
  	const params = useParams();

  	useDiscoveryAll();

	return (
		<div>
			<AlbumHeader albumName={params.albumName}/>
			<ImageGrid setSelectedImg={setSelectedImg} albumName={params.albumName} />
			{selectedImg && <ImageZoom url={selectedImg} setSelectedImg={setSelectedImg} />}
		</div>
	);
};

export default AlbumPage;

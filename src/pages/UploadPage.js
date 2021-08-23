import UploadForm from '../components/upload-form/UploadForm';
import ImageGrid from '../components/album/ImageGrid';
import ImageOverlay from '../components/album/ImageOverlay';
import { useState } from 'react';

const UploadPage = () => {
	const [album, setAlbum] = useState(null);
	const [selectedImg, setSelectedImg] = useState(null);

	return (
		<div>
			<UploadForm album={album} setAlbum={setAlbum} />
			<ImageGrid setSelectedImg={setSelectedImg} albumName={album} />
			{selectedImg && <ImageOverlay url={selectedImg} setSelectedImg={setSelectedImg} />}
		</div>
	);
};

export default UploadPage;

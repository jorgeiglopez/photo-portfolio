import UploadForm from '../components/upload-form/UploadForm';
import ImageGrid from '../components/album/ImageGrid';
import ImageZoom from '../components/album/ImageZoom';
import { useState } from 'react';

const CreateAlbum = () => {
	const [album, setAlbum] = useState(null);
	const [selectedImg, setSelectedImg] = useState(null);

	return (
		<div>
			<UploadForm album={album} setAlbum={setAlbum} />
			<ImageGrid setSelectedImg={setSelectedImg} albumName={album} />
			{selectedImg && <ImageZoom url={selectedImg} setSelectedImg={setSelectedImg} />}
		</div>
	);
};

export default CreateAlbum;

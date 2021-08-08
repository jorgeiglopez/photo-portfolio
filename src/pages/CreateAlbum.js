import UploadForm from '../components/upload-form/UploadForm';
import ImageGrid from '../components/album/ImageGrid';
import ImageZoom from '../components/album/ImageZoom';
import { useState } from 'react';

const CreateAlbum = () => {
	const [album, setAlbum] = useState('');
	const [selectedImg, setSelectedImg] = useState(null);

	return (
		<div>
			<UploadForm />
			<ImageGrid setSelectedImg={setSelectedImg} />
			{selectedImg && <ImageZoom url={selectedImg} setSelectedImg={setSelectedImg} />}
		</div>
	);
};

export default CreateAlbum;

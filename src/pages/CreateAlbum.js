import UploadForm from '../components/upload-form/UploadForm';
import ImageGrid from '../components/album/ImageGrid';
import ImageZoom from '../components/album/ImageZoom';
import { useState } from 'react';
import useDiscovery from '../hooks/useDiscovery';

const CreateAlbum = () => {
	const [album, setAlbum] = useState('');
	const [selectedImg, setSelectedImg] = useState(null);

	// useDiscovery("tea-oil-cup");

	return (
		<div>
			<UploadForm />
			<ImageGrid setSelectedImg={setSelectedImg} albumName="tea-oil-cup"/>
			{selectedImg && <ImageZoom url={selectedImg} setSelectedImg={setSelectedImg} />}
		</div>
	);
};

export default CreateAlbum;

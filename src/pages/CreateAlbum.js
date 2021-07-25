import UploadForm from '../components/upload-form/UploadForm';
import ImageGrid from '../components/album/ImageGrid';
import ImageZoom from '../components/album/ImageZoom';
import { useState } from 'react';

const CreateAlbum = () => {
	const [album, setAlbum] = useState('');
	const [selectedImg, setSelectedImg] = useState(null);

	return (
		<div>
			<h1>Create Album</h1>
			<h3>Name of the album: </h3>
			<input type='text' onChange={(e) => setAlbum(e.target.value)}></input>
			<UploadForm album={album} />
			<ImageGrid setSelectedImg={setSelectedImg} />
			{selectedImg && <ImageZoom url={selectedImg} setSelectedImg={setSelectedImg} />}
		</div>
	);
};

export default CreateAlbum;

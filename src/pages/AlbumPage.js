import React, { useState } from 'react';
import AlbumHeader from '../components/album/AlbumHeader';
import ImageGrid from '../components/album/ImageGrid';
import ImageZoom from '../components/album/ImageZoom';

const GalleryPage = () => {
    const [selectedImg, setSelectedImg] = useState(null);

    return (
        <div>
            <AlbumHeader />
            <ImageGrid setSelectedImg={setSelectedImg} />
            {selectedImg && <ImageZoom url={selectedImg} setSelectedImg={setSelectedImg} />}
        </div>
    );
};

export default GalleryPage;

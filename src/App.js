import React, { useEffect, useState } from 'react'

import Headroom from 'react-headroom';
import NavigationMain from './components/top-bar/NavigationMain';
import FooterMain from './components/footer/FooterMain';
import Home from './pages/Home';
import UploadForm from './components/upload-form/UploadForm';
import ImageGrid from './components/gallery/ImageGrid';
import './App.css';
import ImageDetail from './components/gallery/ImageDetail';

function App() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="App">
      <Headroom>
        <NavigationMain/>
      </Headroom>
      <Home/>
      <UploadForm/>
      <ImageGrid setSelectedImg={setSelectedImg}/>
      { selectedImg && <ImageDetail url={selectedImg} setSelectedImg={setSelectedImg}/> }
      <FooterMain/>
    </div>
  );
}

export default App;

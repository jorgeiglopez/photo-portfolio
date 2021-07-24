import React, { useEffect, useState } from 'react'

import Headroom from 'react-headroom';
import NavigationMain from './components/top-bar/NavigationMain';
import FooterMain from './components/footer/FooterMain';
import './App.css';
import GalleryPage from './pages/GalleryPage';

function App() {

  return (
    <div className="App">
      <Headroom>
        <NavigationMain/>
      </Headroom>
      <GalleryPage/>
      <FooterMain/>
    </div>
  );
}

export default App;

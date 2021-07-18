import React, { useEffect } from 'react'

import Headroom from 'react-headroom';
import NavigationMain from './components/top-bar/NavigationMain';
import FooterMain from './components/footer/FooterMain';
import Home from './pages/Home';
import './App.css';

function App() {

  // useEffect(() => {
  //   window.scroll({
  //     top: 70,
  //     behavior: "smooth"
  //   });
  // }, [])

  return (
    <div>
      <Headroom>
        <NavigationMain/>
      </Headroom>
      <Home/>
      <FooterMain/>
    </div>
  );
}

export default App;

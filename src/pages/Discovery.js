import React, { Component } from 'react';
import {useDiscoveryAll} from "../hooks/useDiscovery";

const Discovery = () => {
    const albums = useDiscoveryAll();
    console.log("Input --> ",albums)
    const list = albums.forEach(album => <li>{album}</li>)
    return (
        <div>
            <h1>Album discovery page</h1>
            <h3>Albums:</h3>
            <ul>
                {list}
            </ul>
        </div>
    );
};

export default Discovery;

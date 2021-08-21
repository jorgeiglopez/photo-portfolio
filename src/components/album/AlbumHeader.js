import React from 'react'
import classes from './AlbumHeader.module.css'

const AlbumHeader = (props) => {
    return (
        <div className={classes['album-header']}>
            <h1>Album: {props.albumName}</h1>
            <p>In other words, there is no need for the server to transfer a representation of the target resource because the request indicates that the client, which made the request conditional, already has a valid representation; the server is therefore redirecting the client to make use of that stored representation as if it were the payload of a 200 OK response.</p>
        </div>
    )
}

export default AlbumHeader

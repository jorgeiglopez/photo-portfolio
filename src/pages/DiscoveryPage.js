import React from 'react';
import useDiscovery from '../hooks/useDiscovery';
import { useParams, Link } from 'react-router-dom';
import CustomSnackbars from '../components/modal/CustomSnackbars';

const humanifyPictures = (pic) => {
	let resp = pic.id + ': ';
	resp += pic['800px'] ? pic['800px'].name : '';
	resp += pic['2000px'] ? pic['2000px'].name : '';
	resp += pic['1080px'] ? pic['1080px'].name : '';
	resp += pic['FULL'] ? pic['FULL'].name : '';

	return resp;
};

const DiscoveryPage = () => {
	const params = useParams();
	const {data: pictures, error} = useDiscovery(params.albumName);
	console.log('--- PICTURES DISCOVERED: ', pictures);

	const detail = pictures.map((pic) => <li>{humanifyPictures(pic)}</li>);

	return (
		<div>
			{error && <CustomSnackbars message={error.message} />}
			<h1>Album discovery page</h1>
			<h3>Albums: {params.albumName}</h3>
			<br />
			<h4>Detail</h4>
			<ul>{detail}</ul>
			<br />
			<Link to={`/albums/${params.albumName}`}>Go to album!</Link>
		</div>
	);
};

export default DiscoveryPage;

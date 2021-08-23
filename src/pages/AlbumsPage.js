import { Link, useRouteMatch } from 'react-router-dom';
import CustomSnackbars from '../components/CustomSnackbars';
import { useDiscoveryAll } from '../hooks/useDiscovery';

const capitalizeFirstLetter = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const parseAlbumName = (name) => capitalizeFirstLetter(name.replaceAll('-', ' '));

const AlbumsPage = () => {
	const match = useRouteMatch();
	const { data: albums, error } = useDiscoveryAll();

	const albumLinks = albums.map((album) => {
		return (
			<li key={album}>
				<Link to={`${match.url}/${album}`}>{parseAlbumName(album)}</Link>
				<br />
			</li>
		);
	});

	return (
		<div>
			{error && <CustomSnackbars message={error.message} />}
			<h1>All Albums</h1>
			<h2>Select an album:</h2>
			<ul>{albumLinks}</ul>
		</div>
	);
};

export default AlbumsPage;

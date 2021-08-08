import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';

const AllAlbums = () => {
	const match = useRouteMatch();
  	const params = useParams();
	return (
		<div>
			<h1>All Albums</h1>
			<h2>Select an album:</h2>
			<ul>
				<Link to={`${match.url}/album1`}>My Album N1</Link><br/>
				<Link to={`${match.url}/another`}>Another album</Link><br/>
				<Link to={`${match.url}/third`}>Third Album</Link><br/>
			</ul>
		</div>
	);
};

export default AllAlbums;

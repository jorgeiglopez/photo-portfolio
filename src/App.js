import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import HomePage from './pages/HomePage';
import AboutMePage from './pages/AboutMePage';
import AlbumsPage from './pages/AlbumsPage';
import AlbumPage from './pages/AlbumPage';
import ContactPage from './pages/ContactPage';
import DiscoveryPage from './pages/DiscoveryPage';
import FourOFour from './pages/404Page';
import UploadPage from './pages/UploadPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import { useContext } from 'react';
import AuthContext from './contex/auth-context';

function App() {
	// TODO: Load the firestore info here for quick response
	// TODO: Add Error Boundaries
	const ctx = useContext(AuthContext);

	return (
		<div className='App'>
			<Layout>
				{/* <Suspense // check if is it working
					fallback={
						<div className='centered'>
							<LoadingSpinner />
						</div>
					}> */}
				<Switch>
					<Route path='/' exact>
						<Redirect to='/home' />
					</Route>
					<Route path='/home'>
						<HomePage />
					</Route>
					<Route path='/contact'>
						<ContactPage />
					</Route>
					<Route path='/about-me'>
						<AboutMePage />
					</Route>
					<Route path='/albums' exact>
						<AlbumsPage />
					</Route>
					<Route path='/albums/:albumName'>
						<AlbumPage />
					</Route>
					<Route path='/upload'>
						<UploadPage />
					</Route>
					<Route path='/discovery/:albumName'>
						<DiscoveryPage />
					</Route>
					{!ctx.isLoggedIn && (
						<Route path='/login'>
							<Login />
						</Route>
					)}
					{!ctx.isLoggedIn && (
						<Route path='/signup'>
							<SignUp />
						</Route>
					)}
					{ctx.isLoggedIn && (
						<Route path='/profile'>
							<Profile />
						</Route>
					)}
					<Route path='*'>
						<Redirect to='/' />
					</Route>
				</Switch>
				{/* </Suspense> */}
			</Layout>
		</div>
	);
}

export default App;

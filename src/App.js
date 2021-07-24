import React, { Suspense, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import LoadingSpinner from './components/LoadingSpinner';
import Home from './pages/Home';
import Contact from './pages/Contact';
import AboutMe from './pages/AboutMe';
import FourOFour from './pages/404';

import Layout from './components/Layout';
import AllAlbums from './pages/AllAlbums';

function App() {
	return (
		<div className='App'>
			<Layout>
				<Suspense
					fallback={
						<div className='centered'>
							<LoadingSpinner />
						</div>
					}>
					<Switch>
						<Route path='/' exact>
							<Redirect to='/home' />
						</Route>
						<Route path='/home'>
							<Home />
						</Route>
						<Route path='/contact'>
							<Contact />
						</Route>
						<Route path='/about-me'>
							<AboutMe />
						</Route>
						<Route path='/all-albums'>
							<AllAlbums />
						</Route>
						<Route path='*'>
							<FourOFour />
						</Route>
					</Switch>
				</Suspense>
			</Layout>
		</div>
	);
}

export default App;

import React from 'react';
import Headroom from 'react-headroom';
import NavigationMain from './top-bar/NavigationMain';
import FooterMain from './footer/FooterMain';
import classes from './Layout.module.css';

const Layout = (props) => {
	return (
		<div className={classes.body}>
			<Headroom>
				<NavigationMain />
			</Headroom>
			<main className={classes.main}>{props.children}</main>
			<FooterMain />
		</div>
	);
};

export default Layout;

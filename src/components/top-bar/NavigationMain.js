import classes from './NavigationMain.module.css';
import { NavLink, Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../contex/auth-context';

const NavigationMain = () => {
	const ctx = useContext(AuthContext);
	return (
		<header className={classes.header}>
			<div className={classes.logo}>
				<Link to='/home'>Photo Portfolio</Link>
			</div>
			<div className={classes.menu}>
				{ctx.isLoggedIn && (
					<NavLink to='/albums' className={classes.link}>
						<div className={classes.title}>Work</div>
						<div className={classes.bar}></div>
					</NavLink>
				)}
				{ctx.isLoggedIn && (
					<NavLink to='/contact' className={classes.link}>
						<div className={classes.title}>Contact</div>
						<div className={classes.bar}></div>
					</NavLink>
				)}
				{ctx.isLoggedIn && (
					<NavLink to='/about-me' className={classes.link}>
						<div className={classes.title}>About Me</div>
						<div className={classes.bar}></div>
					</NavLink>
				)}
				{ctx.isLoggedIn && (
					<div className={classes.link}>
						<div className={classes.title} onClick={()=> ctx.logOut()}>Log out</div>
						<div className={classes.bar}></div>
					</div>
				)}
				{!ctx.isLoggedIn && (
					<NavLink to='/login' className={classes.link}>
						<div className={classes.title}>Log in</div>
						<div className={classes.bar}></div>
					</NavLink>
				)}
			</div>
		</header>
	);
};

export default NavigationMain;

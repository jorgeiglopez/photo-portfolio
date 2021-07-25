import classes from './NavigationMain.module.css';
import { NavLink, Link } from 'react-router-dom';

const NavigationMain = () => {
	return (
		<header className={classes.header}>
			<div className={classes.logo}>
				<Link to='/home'>Photo Portfolio</Link>
			</div>
			<div className={classes.menu}>
				<NavLink to='/all-albums' className={classes.link}>
					<div className={classes.title}>Work</div>
					<div className={classes.bar}></div>
				</NavLink>
				<NavLink to='/contact' className={classes.link}>
					<div className={classes.title}>Contact</div>
					<div className={classes.bar}></div>
				</NavLink>
				<NavLink to='/about-me' className={classes.link}>
					<div className={classes.title}>About Me</div>
					<div className={classes.bar}></div>
				</NavLink>
			</div>
		</header>
	);
};

export default NavigationMain;

import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const CopyrightSection = () => {
	return (
		<Box mt={8}>
			<Typography variant='body2' color='textSecondary' align='center'>
				{'Copyright © '}
				<Link to={{ pathname: 'https://www.instagram.com/nacho.lpz/' }} target='_blank'>
					Nacho Lpz
				</Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		</Box>
	);
};

export default CopyrightSection;

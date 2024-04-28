import { useNavigate } from 'react-router-dom';
import { AuthenticationLayout } from '../../components';

export const LandingScreen = () => {
	const navigate = useNavigate();
	return (
		<AuthenticationLayout>
			<button
				onClick={() => navigate('/sign-up')}
				className='btn btn-primary w-full'
			>
				Sign Up
			</button>
			<button
				onClick={() => navigate('/sign-in')}
				className='btn btn-primary w-full'
			>
				Sign In
			</button>
		</AuthenticationLayout>
	);
};

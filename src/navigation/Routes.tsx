import { Navigate } from 'react-router-dom';
import { authSelector, useAppSelector } from '../redux';

interface RouteProps {
	screen: React.ReactNode;
}

export const AuthenticatedRoute: React.FC<RouteProps> = ({ screen }) => {
	const isAuthenticated = useAppSelector(authSelector);
	if (isAuthenticated) {
		return screen;
	} else {
		return <Navigate to='/' />;
	}
};

export const UnauthenticatedRoute: React.FC<RouteProps> = ({ screen }) => {
	const isAuthenticated = useAppSelector(authSelector);
	if (!isAuthenticated) {
		return screen;
	} else {
		return <Navigate to='/dashboard' />;
	}
};

import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../components';
import { LandingScreen, SignInScreen, SignUpScreen } from '../screens';
import { NotFound404Screen } from './NotFound404Screen';
import { AuthenticatedRoute, UnauthenticatedRoute } from './Routes';

export const Navigator = () => {
	return (
		<>
			<Navbar />
			<main>
				<Routes>
					<Route
						path='/'
						element={<UnauthenticatedRoute screen={<LandingScreen />} />}
					/>
					<Route
						path='/sign-up'
						element={<UnauthenticatedRoute screen={<SignUpScreen />} />}
					/>
					<Route
						path='/sign-in'
						element={<UnauthenticatedRoute screen={<SignInScreen />} />}
					/>
					<Route
						path='/dashboard'
						element={<AuthenticatedRoute screen={<div>Dashboard</div>} />}
					/>
					<Route path='*' element={<NotFound404Screen />} />
				</Routes>
			</main>
		</>
	);
};

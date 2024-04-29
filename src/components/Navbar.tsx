import { Link } from 'react-router-dom';
import {
	authSelector,
	signOut,
	useAppDispatch,
	useAppSelector
} from '../redux';

export const Navbar = () => {
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector(authSelector);

	return (
		<nav>
			<h1>Task Manager</h1>
			<div className='space-x-4'>
				{isAuthenticated ? (
					<>
						<Link to='/dashboard'>Dashboard</Link>
						<Link to='/task/create'>Create Task</Link>
						<button
							className='px-0 inline-block hover:text-black'
							onClick={() => dispatch(signOut())}
						>
							Sign Out
						</button>
					</>
				) : (
					<>
						<Link to='/'>Home</Link>
						<Link to='/sign-up'>Sign Up</Link>
						<Link to='/sign-in'>Sign In</Link>
					</>
				)}
			</div>
		</nav>
	);
};

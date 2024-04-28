import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationLayout } from '../../components';
import { signUp, useAppDispatch, useNetworkState } from '../../redux';

export const SignUpScreen = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isLoading } = useNetworkState('auth.signUp');

	const [data, setData] = useState({
		email: '',
		password: '',
		firstName: '',
		lastName: ''
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await dispatch(
			signUp(data.firstName, data.lastName, data.email, data.password)
		);
		navigate('/dashboard');
	};

	return (
		<AuthenticationLayout>
			<form className='w-full' onSubmit={handleSubmit}>
				<label>
					<span>First Name</span>
					<input
						required
						type='text'
						onChange={(e) => setData({ ...data, firstName: e.target.value })}
						value={data.firstName}
					/>
				</label>
				<label>
					<span>Last Name</span>
					<input
						required
						type='text'
						onChange={(e) => setData({ ...data, lastName: e.target.value })}
						value={data.lastName}
					/>
				</label>
				<label>
					<span>Email</span>
					<input
						required
						type='text'
						onChange={(e) => setData({ ...data, email: e.target.value })}
						value={data.email}
					/>
				</label>
				<label>
					<span>Password</span>
					<input
						required
						type='text'
						onChange={(e) => setData({ ...data, password: e.target.value })}
						value={data.password}
					/>
				</label>

				<button className='btn-primary w-full' disabled={isLoading}>
					{isLoading && <span>Signing Up...</span>}
					{!isLoading && <span>Sign Up</span>}
				</button>
			</form>
		</AuthenticationLayout>
	);
};

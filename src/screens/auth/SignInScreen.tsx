import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationLayout } from '../../components';
import { signIn, useAppDispatch, useNetworkState } from '../../redux';

export const SignInScreen = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isLoading } = useNetworkState('auth.signIn');

	const [data, setData] = useState({
		email: '',
		password: ''
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await dispatch(signIn(data.email, data.password));
		navigate('/dashboard');
	};

	return (
		<AuthenticationLayout>
			<form className='w-full' onSubmit={handleSubmit}>
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
					{isLoading && <span>Signing In...</span>}
					{!isLoading && <span>Sign In</span>}
				</button>
			</form>
		</AuthenticationLayout>
	);
};

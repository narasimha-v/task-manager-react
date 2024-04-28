import { authActions } from '../slices';
import { AppThunk } from '../types';
import { networkCallWithReduxState } from '../utils';

export const signUp =
	(
		firstName: string,
		lastName: string,
		email: string,
		password: string
	): AppThunk =>
	async (dispatch, getState, { api, persistStore }) => {
		await networkCallWithReduxState(dispatch, 'auth.signUp', async () => {
			const res = await api.post('/auth/sign-up', {
				firstName,
				lastName,
				email,
				password
			});
			dispatch(authActions.setUser(res.data.user));
			persistStore(getState());
		});
	};

export const signIn =
	(email: string, password: string): AppThunk =>
	async (dispatch, getState, { api, persistStore }) => {
		await networkCallWithReduxState(dispatch, 'auth.signIn', async () => {
			const res = await api.post('/auth/sign-in', {
				email,
				password
			});
			dispatch(authActions.setUser(res.data.user));
			persistStore(getState());
		});
	};

export const signOut =
	(): AppThunk =>
	async (dispatch, getState, { api, persistStore }) => {
		await networkCallWithReduxState(
			dispatch,
			'auth.signOut',
			async () => await api.get('/auth/sign-out')
		);
		dispatch(authActions.completelyResetReduxState());
		persistStore(getState());
	};

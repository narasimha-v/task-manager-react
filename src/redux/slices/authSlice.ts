import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';

export interface AuthReduxState {
	user?: User;
}

const initialState: AuthReduxState = {};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		completelyResetReduxState() {
			/** Intentionally blank, see rootReducer */
		},
		setUser(state, action: PayloadAction<User>) {
			state.user = action.payload;
		}
	}
});

export const { reducer: authReducer, actions: authActions } = authSlice;

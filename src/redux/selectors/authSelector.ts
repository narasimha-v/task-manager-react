import { createSelector } from '@reduxjs/toolkit';
import { ReduxState } from '../types';

const selectAuthRedux = (state: ReduxState) => state.auth;

export const authSelector = createSelector([selectAuthRedux], (auth) => {
	return !!auth.user;
});

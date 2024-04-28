import {
	Action,
	EnhancedStore,
	StoreEnhancer,
	ThunkAction,
	ThunkDispatch,
	Tuple
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { appReducer, createStore } from '../store';

export type ReduxState = ReturnType<typeof appReducer>;
export type AppDispatch = ReturnType<typeof createStore>['dispatch'];

export type ExtraThunkArgs = {
	api: AxiosInstance;
	persistStore: (state: ReduxState) => void;
};

export type AppThunk = ThunkAction<
	Promise<void>,
	ReduxState,
	ExtraThunkArgs,
	Action<string>
>;

export type SyncAppThunk = ThunkAction<
	void,
	ReduxState,
	ExtraThunkArgs,
	Action<string>
>;

export type StoreMiddleware = Tuple<
	[
		StoreEnhancer<{
			dispatch: ThunkDispatch<ReduxState, ExtraThunkArgs, Action<string>>;
		}>
	]
>;

export type Store = EnhancedStore<ReduxState, Action<string>, StoreMiddleware>;

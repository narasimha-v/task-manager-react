import { Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import api from './api';
import { IS_PRODUCTION } from './getEnv';
import {
	authActions,
	authReducer,
	networkReducer,
	tasksReducer
} from './slices';
import { AppDispatch, ReduxState } from './types';

export const appReducer = combineReducers({
	auth: authReducer,
	tasks: tasksReducer,
	network: networkReducer
});

const rootReducer = (
	state: ReduxState | undefined,
	action: Action<string>
): ReturnType<typeof appReducer> => {
	if (action.type === authActions.completelyResetReduxState.type) {
		console.log('♻️ Resetting redux state from root reducer');
		state = undefined;
	}

	return appReducer(state, action);
};

export const createStore = (
	preloadedState: Partial<ReduxState> = {},
	persistStore: (state: ReduxState) => void
) => {
	const store = configureStore({
		reducer: (state, action) => rootReducer(state, action),
		preloadedState: preloadedState,
		middleware: (getDefaultMiddleware) => {
			const middleware = getDefaultMiddleware({
				serializableCheck: !IS_PRODUCTION,
				thunk: { extraArgument: { api, persistStore } }
			});
			return middleware;
		}
	});

	api.interceptors.response.use(
		(res) => res,
		async (err) => Promise.reject(err)
	);

	return store;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<ReduxState> = useSelector;

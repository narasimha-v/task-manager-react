import { networkActions } from '../slices';
import { AppDispatch } from '../types';
import { NetworkErrorMsg } from './networkErrorMessage';

export const networkCallWithReduxState = async (
	dispatch: AppDispatch,
	networkStateName: string,
	networkCallAndProcessing: () => Promise<void>
) => {
	try {
		dispatch(
			networkActions.set({
				name: networkStateName,
				isLoading: true,
				error: null
			})
		);
		await networkCallAndProcessing();
		dispatch(
			networkActions.set({
				name: networkStateName,
				isLoading: false,
				error: null
			})
		);
	} catch (error) {
		const msg = NetworkErrorMsg(error);
		dispatch(
			networkActions.set({
				name: networkStateName,
				isLoading: false,
				error: msg
			})
		);
	}
};

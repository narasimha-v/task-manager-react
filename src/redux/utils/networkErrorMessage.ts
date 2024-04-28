const unkownErrorMsg = 'Unkown error. Contact support if the issue persists';

export const NetworkErrorMsg = (error: any) => {
	if (error === undefined) {
		return unkownErrorMsg;
	}

	return error.response?.data?.message || error.message || unkownErrorMsg;
};

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { loadWebReudxStatePromise, store } from './lib';
import { Navigator } from './navigation';

export const App = () => {
	const forceUpdate = React.useState({})[1].bind(null, {});

	useEffect(() => {
		loadWebReudxStatePromise.then(() => forceUpdate());
	}, []);

	if (!store) return null;

	return (
		<Provider store={store}>
			<BrowserRouter>
				<Navigator />
			</BrowserRouter>
		</Provider>
	);
};

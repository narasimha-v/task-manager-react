import { Store } from '@reduxjs/toolkit';
import { RDXPersist } from '../lib/RDXPersist';
import { ReduxState, createStore } from '../redux';

export let store: Store;
export const rdxPersist = new RDXPersist<ReduxState>([], []);

rdxPersist.keysToPersist = ['auth', 'tasks'];

const persistStore = (state: ReduxState) => {
	rdxPersist.persist(state);
};

export const loadWebReudxStatePromise = rdxPersist
	.rehydrate()
	.then(async (preloadedState) => {
		store = createStore(preloadedState, persistStore);
	})
	.catch((err) => {
		console.log('Error loading redux state', err);
		store = createStore(undefined, persistStore);
	});

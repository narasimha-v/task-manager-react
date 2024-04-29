import { createSelector } from '@reduxjs/toolkit';
import { ReduxState } from '../types';

const selectTasksRedux = (state: ReduxState) => state.tasks;

export const tasksSelector = createSelector([selectTasksRedux], (tasksR) => {
	const tasks = tasksR.tasks;

	return Object.keys(tasks).map((key) => tasks[key]);
});

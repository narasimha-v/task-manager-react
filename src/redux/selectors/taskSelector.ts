import { createSelector } from '@reduxjs/toolkit';
import { ReduxState } from '../types';

const selectTasksRedux = (state: ReduxState) => state.tasks;

export const taskSelector = createSelector([selectTasksRedux], (tasksR) => {
	const { tasks, currentTaskId } = tasksR;

	if (!currentTaskId) {
		return null;
	}

	return tasks[currentTaskId];
});

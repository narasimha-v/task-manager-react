import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Task } from '../types';

export interface TasksReduxState {
	tasks: { [key: string]: Task };
	currentTaskId?: string;
}

const initialState: TasksReduxState = {
	tasks: {},
	currentTaskId: undefined
};

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setTasks(state, action: PayloadAction<Task[]>) {
			state.tasks = action.payload.reduce(
				(acc, task) => {
					acc[task._id] = task;
					return acc;
				},
				{} as TasksReduxState['tasks']
			);
		},
		addTask(state, action: PayloadAction<Task>) {
			state.tasks[action.payload._id] = action.payload;
		},
		updateTask(state, action: PayloadAction<Task>) {
			state.tasks[action.payload._id] = action.payload;
		},
		deleteTask(state, action: PayloadAction<string>) {
			delete state.tasks[action.payload];
		},
		setCurrentTaskId(state, action: PayloadAction<string | undefined>) {
			state.currentTaskId = action.payload;
		}
	}
});

export const { reducer: tasksReducer, actions: tasksActions } = tasksSlice;

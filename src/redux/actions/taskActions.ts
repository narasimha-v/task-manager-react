import { tasksActions } from '../slices';
import { AppThunk, TaskStatus } from '../types';
import { networkCallWithReduxState } from '../utils';

export const fetchTasks =
	(status: TaskStatus | ''): AppThunk =>
	async (dispatch, getState, { api, persistStore }) => {
		await networkCallWithReduxState(dispatch, 'tasks.fetchTasks', async () => {
			const res = await api.get('/tasks', {
				params: { status }
			});
			dispatch(tasksActions.setTasks(res.data));
			persistStore(getState());
		});
	};

export const fetchTask =
	(taskId: string): AppThunk =>
	async (dispatch, getState, { api, persistStore }) => {
		await networkCallWithReduxState(dispatch, 'tasks.fetchTask', async () => {
			const res = await api.get(`/tasks/${taskId}`);
			dispatch(tasksActions.addTask(res.data));
			persistStore(getState());
		});
	};

export const createTask =
	(title: string, description: string): AppThunk =>
	async (dispatch, getState, { api, persistStore }) => {
		await networkCallWithReduxState(dispatch, 'tasks.createTask', async () => {
			const res = await api.post('/tasks', {
				title,
				description
			});
			dispatch(tasksActions.addTask(res.data));
			persistStore(getState());
		});
	};

export const updateTask =
	(taskId: string, status: TaskStatus): AppThunk =>
	async (dispatch, getState, { api, persistStore }) => {
		await networkCallWithReduxState(dispatch, 'tasks.updateTask', async () => {
			const res = await api.put(`/tasks/${taskId}`, {
				status
			});
			dispatch(tasksActions.updateTask(res.data));
			persistStore(getState());
		});
	};

export const deleteTask =
	(taskId: string): AppThunk =>
	async (dispatch, getState, { api, persistStore }) => {
		await networkCallWithReduxState(dispatch, 'tasks.deleteTask', async () => {
			await api.delete(`/tasks/${taskId}`);
			dispatch(tasksActions.deleteTask(taskId));
			persistStore(getState());
		});
	};

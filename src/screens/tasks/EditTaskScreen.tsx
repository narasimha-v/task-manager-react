import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUpdateEffect } from '../../lib';
import {
	AppDispatch,
	TaskStatus,
	fetchTask,
	taskSelector,
	updateTask,
	useAppSelector,
	useNetworkState
} from '../../redux';
import { getFormattedDate } from '../../utils';

export const EditTaskScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const task = useAppSelector(taskSelector);
	const taskId = useAppSelector((state) => state.tasks.currentTaskId);
	const { isLoading } = useNetworkState('tasks.fetchTask');
	const { isLoading: editTaskLoading } = useNetworkState('tasks.updateTask');

	const [taskStatus, setTaskStatus] = useState<TaskStatus | undefined>(
		task?.status
	);

	useEffect(() => {
		if (!taskId) {
			return navigate('/dashboard');
		}
		dispatch(fetchTask(taskId));
	}, []);

	useUpdateEffect(() => {
		if (!isLoading && !task) {
			navigate('/dashboard');
		}
	}, [task, isLoading]);

	if (isLoading) {
		return <div className='text-center'>Loading Task details...</div>;
	}

	if (!task) {
		return null;
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!taskStatus) {
			return;
		}
		if (taskStatus === task.status) {
			return navigate('/dashboard');
		}
		await dispatch(updateTask(task._id, taskStatus));
		navigate('/dashboard');
	};

	return (
		<main>
			<nav>
				<h2>Update Task Status</h2>
			</nav>
			<div className='card'>
				<h3>{task.title}</h3>
				<small>Created at: {getFormattedDate(task.createdAt)}</small>

				<form className='my-4 w-full md:w-1/2' onSubmit={handleSubmit}>
					<label>
						<h3>Update Status</h3>
						<select
							value={taskStatus}
							onChange={(e) => setTaskStatus(e.target.value as TaskStatus)}
						>
							<option value={TaskStatus.TODO}>To Do</option>
							<option value={TaskStatus.IN_PROGRESS}>In Progress</option>
							<option value={TaskStatus.COMPLETED}>Completed</option>
						</select>
					</label>
					<button className='btn-primary w-full' disabled={editTaskLoading}>
						{editTaskLoading ? (
							<span>Updating Task...</span>
						) : (
							<span>Update Task</span>
						)}
					</button>
				</form>
			</div>
		</main>
	);
};

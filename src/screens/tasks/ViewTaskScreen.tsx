import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUpdateEffect } from '../../lib';
import {
	AppDispatch,
	deleteTask,
	fetchTask,
	taskSelector,
	useAppSelector,
	useNetworkState
} from '../../redux';
import { getFormattedDate, taskStatusClass } from '../../utils';

export const ViewTaskScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const task = useAppSelector(taskSelector);
	const taskId = useAppSelector((state) => state.tasks.currentTaskId);
	const { isLoading } = useNetworkState('tasks.fetchTask');
	const { isLoading: deleteTaskLoading } = useNetworkState('tasks.deleteTask');

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

	const deleteCurrentTask = async () => {
		if (!taskId) {
			return;
		}
		await dispatch(deleteTask(taskId));
		navigate('/dashboard');
	};

	if (isLoading) {
		return <div className='text-center'>Loading Task details...</div>;
	}

	if (!task) {
		return null;
	}

	return (
		<main>
			<nav>
				<h2>Task Details</h2>
			</nav>
			<div className='card'>
				<h3>{task.title}</h3>
				<small>Created at: {getFormattedDate(task.createdAt)}</small>
				<p>{task.description}</p>
				<div className={`pill ${taskStatusClass(task.status)}`}>
					{task.status.replace('_', ' ')}
				</div>
				<div className='flex items-center space-x-4 pb-6'>
					<button
						disabled={deleteTaskLoading}
						className='btn btn-primary min-w-20'
						onClick={() => navigate(`/task/edit/${task._id}`)}
					>
						Edit
					</button>
					<button
						disabled={deleteTaskLoading}
						className='btn btn-danger y min-w-20'
						onClick={deleteCurrentTask}
					>
						{deleteTaskLoading ? 'Deleting...' : 'Delete'}
					</button>
				</div>
			</div>
		</main>
	);
};

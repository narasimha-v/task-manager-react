import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	AppDispatch,
	TaskStatus,
	fetchTasks,
	tasksActions,
	tasksSelector,
	useAppSelector,
	useNetworkState
} from '../../redux';
import { taskStatusClass } from '../../utils';

export const TasksList = () => {
	const dispatch = useDispatch<AppDispatch>();

	const [taskFilter, setTaskFilter] = useState<TaskStatus | ''>('');

	const tasks = useAppSelector(tasksSelector);
	const { isLoading } = useNetworkState('tasks.fetchTasks');

	useEffect(() => {
		dispatch(tasksActions.setCurrentTaskId(undefined));
	}, []);

	useEffect(() => {
		dispatch(fetchTasks(taskFilter));
	}, [taskFilter]);

	return (
		<main>
			<nav>
				<div>
					<h2>Tasks</h2>
				</div>
				<div>
					<select onChange={(e) => setTaskFilter(e.target.value as TaskStatus)}>
						<option value=''>All</option>
						<option value={TaskStatus.TODO}>To Do</option>
						<option value={TaskStatus.IN_PROGRESS}>In Progress</option>
						<option value={TaskStatus.COMPLETED}>Completed</option>
					</select>
				</div>
			</nav>
			<section>
				{isLoading && <p>Loading...</p>}
				{!isLoading && tasks.length === 0 && (
					<p className='text-center'>No tasks found</p>
				)}
				{!isLoading && tasks.length > 0 && (
					<>
						{tasks.map((task) => {
							return (
								<div key={task._id} className='card my-4'>
									<Link
										to={`/task/view/${task._id}`}
										onClick={() => {
											dispatch(tasksActions.setCurrentTaskId(task._id));
										}}
									>
										<h3>{task.title}</h3>
										<p>{task.description.slice(0, 200)}...</p>
										<div className={`pill ${taskStatusClass(task.status)}`}>
											{task.status.replace('_', ' ')}
										</div>
									</Link>
								</div>
							);
						})}
					</>
				)}
			</section>
		</main>
	);
};

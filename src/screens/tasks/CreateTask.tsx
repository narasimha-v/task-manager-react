import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask, useAppDispatch, useNetworkState } from '../../redux';

export const CreateTask = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isLoading } = useNetworkState('tasks.createTask');

	const [data, setData] = useState({
		title: '',
		description: ''
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await dispatch(createTask(data.title, data.description));
		navigate('/dashboard');
	};

	return (
		<main>
			<h2 className='text-primary text-center'>Create a new task</h2>
			<form className='w-full md:w-1/2' onSubmit={handleSubmit}>
				<label>
					<span>Title</span>
					<input
						required
						type='text'
						onChange={(e) => setData({ ...data, title: e.target.value })}
						value={data.title}
					/>
				</label>
				<label>
					<span>Body:</span>
					<textarea
						required
						onChange={(e) => setData({ ...data, description: e.target.value })}
						value={data.description}
					/>
				</label>
				<button className='btn-primary' disabled={isLoading}>
					{isLoading && <span>Creating Task...</span>}
					{!isLoading && <span>Create Task</span>}
				</button>
			</form>
		</main>
	);
};

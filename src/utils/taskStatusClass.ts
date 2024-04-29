import { TaskStatus } from '../redux';

export const taskStatusClass = (status: TaskStatus) => {
	switch (status) {
		case TaskStatus.TODO:
			return 'todo';
		case TaskStatus.IN_PROGRESS:
			return 'in-progress';
		case TaskStatus.COMPLETED:
			return 'completed';
		default:
			return '';
	}
};

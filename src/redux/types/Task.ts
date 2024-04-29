export enum TaskStatus {
	TODO = 'TODO',
	IN_PROGRESS = 'IN_PROGRESS',
	COMPLETED = 'COMPLETED'
}

export interface Task {
	_id: string;
	user: string;
	title: string;
	description: string;
	status: TaskStatus;
	createdAt: Date;
	updatedAt: Date;
}

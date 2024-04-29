export const getFormattedDate = (createdAt: Date) => {
	const date = new Date(createdAt);
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? 'PM' : 'AM';
	const formattedHours = hours % 12 || 12;

	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${formattedHours}:${minutes} ${ampm}`;
};

import { Link } from '../components';

export const NotFound404Screen = () => {
	return (
		<div className='flex justify-center items-center'>
			<div className='card w-3/6'>
				<div className='error'>Page not found</div>
				<Link text='Back to home' url='/' />
			</div>
		</div>
	);
};

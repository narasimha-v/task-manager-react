import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LinkProps {
	url: string;
	text: string;
}

export const Link: React.FunctionComponent<LinkProps> = ({ url, text }) => {
	const navigate = useNavigate();

	return (
		<p
			onClick={() => navigate(url)}
			className={
				'cursor-pointer text-end font-semibold text-primary dark:text-primary/70'
			}
		>
			{text}
		</p>
	);
};

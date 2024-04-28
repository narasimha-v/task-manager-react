import React from 'react';
import './authenticationLayout.css';

export const AuthenticationLayout: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	return (
		<div className='auth-layout'>
			<div className='card auth-card'>
				<img src='logo.svg' alt='Logo' className='auth-logo' />
				{children}
			</div>
		</div>
	);
};

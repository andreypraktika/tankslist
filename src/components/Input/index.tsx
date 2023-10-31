import React from 'react';
import './styles.scss';

const Input = (props: React.HTMLProps<HTMLInputElement>) => {
	return <input {...props} className={'input'}/>;
};

export default Input;
 
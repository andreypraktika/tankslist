import React from 'react';
import './styles.scss';

export interface OptionType {
  label: string;
  value: string | number;
}

interface SelectProps {
  options: OptionType[];
  value: OptionType;
  onChange: (value: OptionType) => void;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange, disabled }) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedOption = options.find(
			(option) => option.value == event.target.value,
		) as OptionType;
		onChange(selectedOption);
	};

	return (
		<select className={'select'} value={value?.value} onChange={handleChange} disabled={disabled}>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
};

export default Select;

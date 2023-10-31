import React from 'react';
import './styles.scss';

interface TableElementsProps {
  children: React.ReactNode;
}

export const TableHeadingCell = ({ children }: TableElementsProps) => (
	<th className={'table__heading'}>{children}</th>
);
export const TableRow = ({ children }: TableElementsProps) => (
	<tr>{children}</tr>
);
export const TableCell = ({ children }: TableElementsProps) => (
	<td className={'table__cell'}>{children}</td>
);
export const TableBody = ({ children }: TableElementsProps) => (
	<tbody className={'table__body'}>{children}</tbody>
);

export const Table = ({ children }: TableElementsProps) => {
	return <table className={'table'}>{children}</table>;
};

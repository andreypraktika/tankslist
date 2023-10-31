import {
	Table,
	TableBody,
	TableCell,
	TableHeadingCell,
	TableRow,
} from '../../../components/Table';
import React, { useContext } from 'react';
import ErrorBoundary from '../../../components/ErrorBoundary';
import { TableContext } from '../index';
import './styles.scss';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

const TanksBody = () => {
	useBottomScrollListener(() => {
		if (search === '') {
			setPage((page: number) => page + 1);
		}
	});

	const { setPage, loading, tanks, search } = useContext(TableContext);

	if (loading) return <TableRow>Загрузка данных...</TableRow>;

	if (!tanks || Object.keys(tanks).length === 0) return <TableRow>Данных нет</TableRow>;

	return (
		<>
			{Object.keys(tanks).map((index) => {
				const { images, name, nation, price_credit, price_gold, description } =
          tanks[+index];
				return (
					<TableRow key={index}>
						<TableCell>
							<img src={images.small_icon} alt={name} />
						</TableCell>
						<TableCell>{name}</TableCell>
						<TableCell>{nation}</TableCell>
						<TableCell>{price_credit}</TableCell>
						<TableCell>{price_gold}</TableCell>
						<TableCell>{description}</TableCell>
					</TableRow>
				);
			})}
		</>
	);
};

export default function TanksList() {
	return (
		<ErrorBoundary>
			<div className={'tanklist__wrapper'}>
				<Table>
					<TableBody>
						<TableRow>
							<TableHeadingCell>Превью</TableHeadingCell>
							<TableHeadingCell>Название</TableHeadingCell>
							<TableHeadingCell>Нация</TableHeadingCell>
							<TableHeadingCell>Цена (Credits)</TableHeadingCell>
							<TableHeadingCell>Цена (Gold)</TableHeadingCell>
							<TableHeadingCell>Описание</TableHeadingCell>
						</TableRow>
						<TanksBody />
					</TableBody>
				</Table>
			</div>
		</ErrorBoundary>
	);
}

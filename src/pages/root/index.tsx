import React, { createContext, useContext, useEffect, useState } from 'react';
import Input from '../../components/Input';
import TanksList from './components/TanksList';
import './styles.scss';
import Select, { OptionType } from '../../components/Select';
import { useGettingTanks } from '../../hooks/useGettingTanks';
import { GettingTankDTO } from '../../api/tanks.api';

interface TableContextProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  tanks: GettingTankDTO[];
  take: OptionType;
  setTake: React.Dispatch<React.SetStateAction<OptionType>>;
  loading: boolean;
  getDataBySearch: () => void;
  getDataByLimit: () => void;
}

const SEARCH_INIT = '';

const TAKE_OPTIONS: OptionType[] = [
	{ value: 10, label: '10' },
	{ value: 50, label: '50' },
	{ value: 100, label: '100' },
	{ value: 200, label: '200' },
];

const MODE_OPTIONS: OptionType[] = [
	{ value: 'all', label: 'Все' },
	{ value: 'search', label: 'Поиск' },
];

export const TableContext = createContext<TableContextProps>({} as TableContextProps);

const ControlPanel = () => {
	const { search, setSearch, take, setTake, getDataBySearch, getDataByLimit, setPage } = useContext(TableContext);

	const [mode, setMode] = useState(MODE_OPTIONS[0]);

	useEffect(() => {
		if (mode.value === 'all') {
			setSearch(SEARCH_INIT);
			setPage(1);
			getDataByLimit();
		}
	}, [mode]);

	useEffect(() => {
		if (mode.value === 'all') {
			setSearch(SEARCH_INIT);
			setPage(1);
			getDataByLimit();
		}
	}, [take]);

	return (
		<div className={'root__control'}>
			<Select options={MODE_OPTIONS} onChange={setMode} value={mode} />
			{mode.value === 'search' && (
				<>
					<Input
						placeholder={'Поиск...'}
						value={search}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
							setSearch(event.target.value)
						}
						onKeyDown={e => e.key === 'Enter' ?? getDataBySearch}
					/>
					<button onClick={getDataBySearch}>Поиск
					</button>
				</>
			)}
			{mode.value === 'all' && (
				<Select options={TAKE_OPTIONS} onChange={setTake} value={take} />
			)}
		</div>);
};

export default function Root() {
	const [search, setSearch] = useState<string>(SEARCH_INIT);

	const [take, setTake] = useState<OptionType>(TAKE_OPTIONS[0]);

	const { loading, tanks, setPage, getDataBySearch, getDataByLimit } = useGettingTanks({
		take: take.value as number, search,
	});

	return (
		<section className={'root__section'}>
			<TableContext.Provider
				value={{ search, setSearch, take, setTake, setPage, tanks, loading, getDataBySearch, getDataByLimit }}
			>
				<ControlPanel />
				<TanksList />
			</TableContext.Provider>
		</section>
	);
}

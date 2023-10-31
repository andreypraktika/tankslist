import { useEffect, useState } from 'react';
import { GettingTankDTO, TanksApi } from '../api/tanks.api';
import { replaceDiacritics } from '../utilities/replaceDiacritics';

export interface UseGettingTanksProps {
  take: number;
  search: string;
}

export const checkIsWordMatch = (word1: string, word2: string) => {
	return replaceDiacritics(word1.toLowerCase()).includes(replaceDiacritics(word2.toLowerCase()));
};

export function useGettingTanks({ take, search }: UseGettingTanksProps) {

	const [tanks, setTanks] = useState<GettingTankDTO[]>([]);

	const [page, setPage] = useState<number>(1);

	const [loading, setLoading] = useState<boolean>(true);

	const getDataBySearch = async () => {
		setLoading(true);
		try {
			const tanksData = await TanksApi.getAll({ limit: null, page: null });

			if (tanksData) {
				const filteredTanks = { ...tanksData.data };

				for (const tank in filteredTanks) {
					if (!checkIsWordMatch(filteredTanks[tank].name, search)) {
						delete filteredTanks[tank];
					}
				}
				setTanks({ ...filteredTanks });
			}
		} catch (error) { /* empty */
		}
		setLoading(false);
	};

	const getDataByLimit = async () => {
		setLoading(true);
		await getData();
		setLoading(false);
	};

	const getData = async () => {
		try {
			const tanksData = await TanksApi.getAll({ limit: take, page });

			if (page === 1) {
				setTanks({ ...tanksData.data });
			} else {
				setTanks({ ...tanks, ...tanksData.data });
			}
		} catch (error) { /* empty */
		}
		setLoading(false);
	};
	
	useEffect(() => {
		getData();
	}, [page]);

	return { loading, tanks, setPage, getDataBySearch, getDataByLimit };
}

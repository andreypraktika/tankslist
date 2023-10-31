import { $api } from './instance';
import { convertArrayToQueryParameter } from '../utilities/convertArrayToQueryParameter';

export interface GettingTankDTO {
  images: Record<string, string>;
  name: string;
  nation: string;
  price_credit: number;
  price_gold: number;
  description: string;
}

interface GettingTankQueryProps {
  search?: string;
  limit: number | null;
  page: number | null;
}

export class TanksApi {
	private static readonly application_id = '2b0adae8aa6efcbaf9abba08c10e8a3d';

	private static requiredFieldsList = ['nation', 'name', 'images', 'price_gold', 'price_credit', 'description'];

	static async getAll({ limit, page }: GettingTankQueryProps) {
		try {
			let queryString = `/wot/encyclopedia/vehicles/?application_id=${this.application_id}&fields=${convertArrayToQueryParameter(this.requiredFieldsList)}`;

			if (typeof limit === 'number') {
				queryString += `&limit=${limit}`;
			}

			if (typeof page === 'number') {
				queryString += `&page_no=${page}`;
			}
			const response = await $api.get(
				queryString,
			);
			return await response.data;
		} catch (e) {
			return {};
		}
	}
}

import { GettingTankDTO } from '../api/tanks.api';

export function search(searchString: string, itemsArray: GettingTankDTO[]): GettingTankDTO[] {
	return itemsArray.filter((item) => item.name.includes(searchString));
}
import { checkIsWordMatch } from './hooks/useGettingTanks';
import { replaceDiacritics } from './utilities/replaceDiacritics';
import { convertArrayToQueryParameter } from './utilities/convertArrayToQueryParameter';

jest.mock('./api/tanks.api', () => ({
	GettingTankDTO: jest.fn(),
	TanksApi: jest.fn(),
}));

describe('checkIsWordMatch', () => {
	test('checkIsWordMatch returns true for matching words', () => {
		expect(checkIsWordMatch('hello', 'hello')).toBe(true);
	});

	test('checkIsWordMatch returns false for non-matching words', () => {
		expect(checkIsWordMatch('Lowe', 'T-34')).toBe(false);
	});

	test('checkIsWordMatch returns true in registry depended cases', () => {
		expect(checkIsWordMatch('Löwe', 'löwe')).toBe(true);
	});

	test('checkIsWordMatch diacritics independent', () => {
		expect(checkIsWordMatch('Lowe', 'Löwe')).toBe(true);
	});

	test('checkIsWordMatch where type diacritics', () => {
		expect(checkIsWordMatch('Löwe', 'Lowe')).toBe(true);
	});
});

describe('replaceDiacritics', () => {
	test('checkIsWordMatch returns similar non diacritic string', () => {
		expect(replaceDiacritics('Löwe')).toStrictEqual('Lowe');

	});
	test('checkIsWordMatch returns similar string when does not contain diacritic symbols', () => {
		expect(replaceDiacritics('Lowe')).toStrictEqual('Lowe');
	});
});

describe('convertArrayToQueryParameter', () => {
	test('check correctness', () => {
		expect(convertArrayToQueryParameter(['nation', 'name', 'images', 'price_gold', 'price_credit', 'description'])).toStrictEqual('description%2C+images%2C+name%2C+nation%2C+price_credit%2C+price_gold');
	});
});

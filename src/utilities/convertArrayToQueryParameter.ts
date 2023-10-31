export function convertArrayToQueryParameter(inputArray: string[]) {
	return inputArray.slice().sort().join('%2C+');
}
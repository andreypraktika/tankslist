export function replaceDiacritics(inputString: string) {
	const diacriticsMap = {
		'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A',
		'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a',
		'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E',
		'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
		'Ì': 'I', 'Í': 'I', 'Î': 'I', 'Ï': 'I',
		'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
		'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O',
		'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
		'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U',
		'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
		'Ñ': 'N', 'ñ': 'n',
		'Ç': 'C', 'ç': 'c',
	};

	return inputString.replace(/[^\u0000-\u007E]/g, function(a: string) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return diacriticsMap[a] || a;
	});
}
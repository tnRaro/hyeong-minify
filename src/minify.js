import { tokenize } from "./tokenize";

import { createGenerator } from "./generator";

export const minify = (hyeong, options) => {
	const generator = createGenerator(options);

	const result = tokenize(hyeong).map(token => {
		return generator(token);
	}).join("");

	return {
		original: hyeong,
		result
	};
}

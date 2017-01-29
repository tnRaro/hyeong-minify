import { tokenize } from "./tokenize";

const ellipsis = (ellipsis, { ellipsisType }) => {
	let e = "";

	for(let i = 0; i < Math.floor(ellipsis / 3); i ++){
		e += ellipsisType || "…";
	}
	for(let i = 0; i < ellipsis % 3; i ++){
		e += ".";
	}

	return e;
}

export const minify = (hyeong, options = {}) => {
	if(options.ellipsisType){
		if(!/[…⋯⋮]/.test(options.ellipsisType)){
			throw new Error("options.ellipsisType must be '…', '⋯' or '⋮'.");
		}
	}

	const result = tokenize(hyeong).map(token => {
		return `${
			token.input.replace(/[^.…⋯⋮가-힣♥❤💕💖💗💘💙💚💛💜💝♡?!]/g, "")
		}${
			ellipsis(token.ellipsis, options)
		}${
			token.heart || ""
		}`;
	}).join("");

	return {
		original: hyeong,
		result
	};
}

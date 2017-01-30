import { minimalize } from "./hyeong-min";

const mojiMap = {
	형: {
		first: "혀",
		middle: "어",
		last: "엉"
	},
	항: {
		first: "하",
		middle: "아",
		last: "앙"
	},
	핫: {
		first: "하",
		middle: "아",
		last: "앗"
	},
	흣: {
		first: "흐",
		middle: "으",
		last: "읏"
	},
	흡: {
		first: "흐",
		middle: "으",
		last: "읍"
	},
	흑: {
		first: "흐",
		middle: "으",
		last: "윽"
	},
};

const hangul = ({ command, inst, input }, options) => {
	if(options.hangul.keep){
		return input;
	}

	if(inst === 1){
		return command;
	} else
	if(inst > 1) {
		let res = mojiMap[command].first;

		for(let i = 0; i < inst - 2; i ++){
			res += mojiMap[command].middle;
		}

		res += mojiMap[command].last;

		return res;
	}

	throw new Error("");
}

const ellipsis = ({ ellipsis }, options) => {
	let e = "";

	if(options.ellipsis.keep){
		for(let i = 0; i < ellipsis; i ++){
			e += ".";
		}
	} else {
		for(let i = 0; i < Math.floor(ellipsis / 3); i ++){
			e += options.ellipsis.type;
		}
		for(let i = 0; i < ellipsis % 3; i ++){
			e += ".";
		}
	}

	return e;
};

const heart = ({ heart }, {  }) => {
	if(typeof heart !== "undefined"){
		return heart;
	}
	return "";
};

const generate = (token, options) => hangul(token, options)
					+ ellipsis(token, options)
					+ heart(token, options);

export const createGenerator = (userOptions = {}) => {
	const options = {
		useHyeongMin: false,
		...userOptions,
		hangul: {
			keep: false,
			...userOptions.hangul
		},
		ellipsis: {
			keep: false,
			type: "…",
			...userOptions.ellipsis
		}
	};

	if(typeof options.hangul.keep !== "boolean"){
		throw new Error("options.hangul.keep must be boolean.");
	}
	if(typeof options.ellipsis.keep !== "boolean"){
		throw new Error("options.ellipsis.keep must be boolean.");
	}
	if(!/[…⋯⋮]/.test(options.ellipsis.type)){
		throw new Error("options.ellipsis.type must be '…', '⋯' or '⋮'.");
	}
	if(typeof options.useHyeongMin !== "boolean"){
		throw new Error("options.useHyeongMin must be boolean.");
	}

	return (token) => {
		if(options.useHyeongMin){
			return generate(minimalize(token, !options.ellipsis.keep), options);
		}
		return generate(token, options);
	};
};

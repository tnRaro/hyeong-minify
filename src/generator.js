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
		last: "흑"
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

export const createGenerator = (userOptions = {}) => {
	const options = {
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
	if(!/[…⋯⋮]/.test(options.ellipsis.type)){
		throw new Error("options.ellipsis.type must be '…', '⋯' or '⋮'.");
	}

	return (token) => hangul(token, options)
					+ ellipsis(token, options)
					+ heart(token, options);
};

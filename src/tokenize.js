const map = {
	혀: {
		엉: "형"
	},
	하: {
		앙: "항",
		앗: "핫"
	},
	흐: {
		읏: "흣",
		읍: "흡",
		윽: "흑"
	}
};

const regs = {
	hangul: () => /([형항핫흣흡흑]|혀.*?엉|하.*?[앙앗]|흐.*?[읏읍윽])/g,
	heart: () => /[♥❤💕💖💗💘💙💚💛💜💝♡?!].*/
};

const ellipsis = (suffix) => {
	let i = 0;

	for(let c of suffix){
		if(/[.]/.test(c)){
			i ++;
		} else
		if(/[…⋯⋮]/.test(c)){
			i += 3;
		}
	}
	return i;
}

export const tokenize = (hyeong) => {
	let pos = 0;

	let phase = 0;

	let tokens = [];

	let res;

	let hanguls = [];

	const rhangul = regs.hangul();

	while(res = rhangul.exec(hyeong)){
		hanguls.push(res);
	}

	for(let [ index, hangul ] of hanguls.entries()){
		const h = hangul[0];
		const next = hanguls[index + 1] || { index: Number.MAX_SAFE_INTEGER };

		const c = h.charAt(0);
		const e = h.charAt(h.length - 1);

		const token = {
			command: undefined,
			inst: undefined,
			ellipsis: undefined,
			heart: undefined,
			input: h
		};

		switch(c){
			case "형":
			case "항":
			case "핫":
			case "흣":
			case "흡":
			case "흑": {
				token.command = h;
				token.inst = 1;

				let suffix = hangul.input.slice(hangul.index + h.length, next.index);

				const heart = regs.heart().exec(suffix);

				if(heart !== null){
					token.heart = heart[0].replace(/[^♥❤💕💖💗💘💙💚💛💜💝♡?!]/, "");

					suffix = suffix.slice(0, heart.index);
				}

				token.ellipsis = ellipsis(suffix);
			}
			break;
			case "혀":
			case "하":
			case "흐": {
				token.command = map[c][e];
				token.inst = h.match(/[가-힣]/g).length;

				let suffix = hangul.input.slice(hangul.index + h.length, next.index);

				const heart = regs.heart().exec(suffix);

				if(heart !== null){
					token.heart = heart[0].replace(/[^♥❤💕💖💗💘💙💚💛💜💝♡?!]/, "");

					suffix = suffix.slice(0, heart.index);
				}

				token.ellipsis = ellipsis(suffix);
			}
			break;
		}

		tokens.push(token);
	}
	return tokens;
}

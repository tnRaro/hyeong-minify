const getHalfDivisors = n => {
	const divisors = [[1, n]];

	let i, d;

	for(i = 2; i * i < n; i ++){
		if(n % i === 0){
			divisors.push([i, n / i | 0]);
		}
	}

	if(i * i === n){
		divisors.push([i, n / i | 0]);
	}

	return divisors;
};

const getMin = (n) => {
	const divisors = getHalfDivisors(n).reverse();

	for(let i in divisors){
		const [a, b] = divisors[i];
		const next = divisors[parseInt(i) + 1];

		if(typeof next === "undefined"){
			return [a, b];
		}

		const score0 = a + Math.floor(b / 3) + b % 3;
		const score1 = next[0] + Math.floor(next[1] / 3) + next[1] % 3;

		if(score1 >= score0){
			return [a, b];
		}
	}
}

const getMinWithout3Ellipsis = (n) => getHalfDivisors(n).pop();

export const minimalize = (token, use3Ellipsis = true) => {
	if(token.command === "형"){
		const [inst, ellipsis] = use3Ellipsis
							? getMin(token.inst * token.ellipsis)
							: getMinWithout3Ellipsis(token.inst * token.ellipsis);

		return {
			...token,
			inst,
			ellipsis
		};
	}

	return token;
}

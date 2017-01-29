import assert from "assert";

import { tokenize } from "../src/tokenize";

/*
https://github.com/xnuk/hyeong-testcases/blob/master/syntax.txt
*/

const wrap = token => {
	return [
		token[0].command,
		token[0].inst,
		token[0].ellipsis,
		token[0].heart
	];
};

// 한글 해석

assert.deepEqual(wrap(tokenize("형")), ["형", 1, 0, undefined]);

assert.deepEqual(wrap(tokenize("항")), ["항", 1, 0, undefined]);

assert.deepEqual(wrap(tokenize("핫")), ["핫", 1, 0, undefined]);

assert.deepEqual(wrap(tokenize("흣")), ["흣", 1, 0, undefined]);

assert.deepEqual(wrap(tokenize("흡")), ["흡", 1, 0, undefined]);

assert.deepEqual(wrap(tokenize("흑")), ["흑", 1, 0, undefined]);


assert.deepEqual(wrap(tokenize("혀엉")), ["형", 2, 0, undefined]);

assert.deepEqual(wrap(tokenize("하앙")), ["항", 2, 0, undefined]);

assert.deepEqual(wrap(tokenize("하앗")), ["핫", 2, 0, undefined]);

assert.deepEqual(wrap(tokenize("흐읏")), ["흣", 2, 0, undefined]);

assert.deepEqual(wrap(tokenize("흐읍")), ["흡", 2, 0, undefined]);

assert.deepEqual(wrap(tokenize("흐윽")), ["흑", 2, 0, undefined]);


assert.deepEqual(wrap(tokenize("흐...읍")), ["흡", 2, 0, undefined]);


assert.deepEqual(wrap(tokenize("혀일이삼사오육앙앗읏읍엉")), ["형", 12, 0, undefined]);

assert.deepEqual(wrap(tokenize("혀일....이삼사오육앙♥앗?!읏♡읍...엉")), ["형", 12, 0, undefined]);

assert.deepEqual(wrap(tokenize("흐일이삼사 오육앙하앗읏읍엉")), ["흣", 11, 0, undefined]);

assert.deepEqual(wrap(tokenize("하흐읏앗앙")), ["핫", 4, 0, undefined]);

assert.deepEqual(wrap(tokenize("혀흐하윽")), ["흑", 3, 0, undefined]);


// 말줄임표 해석

assert.deepEqual(wrap(tokenize("혀엉....")), ["형", 2, 4, undefined]);

assert.deepEqual(wrap(tokenize("하앗. … ⋯ ⋮")), ["핫", 2, 10, undefined]);

assert.deepEqual(wrap(tokenize("혀읏......잠....하앙....혀엉. .....")), ["형", 7, 6, undefined]);


// 하트 구역 해석

assert.deepEqual(wrap(tokenize("하앗....♥♡!")), ["핫", 2, 4, "!♥_"]);

assert.deepEqual(wrap(tokenize("하아앗.. . ? ♥ ! 💖")), ["핫", 3, 3, "?_!♥💖"]);

assert.deepEqual(wrap(tokenize("혀엉...♥?!♡")), ["형", 2, 3, "형 2 3 ?♥!_♡"]);

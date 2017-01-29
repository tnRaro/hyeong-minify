import assert from "assert";

import { hyeong } from "../src/index";

/*
https://github.com/xnuk/hyeong-testcases/blob/master/syntax.txt
*/

// 한글 해석

assert.deepEqual(hyeong("형"), ["형", 1, 0]);

assert.deepEqual(hyeong("항"), ["항", 1, 0]);

assert.deepEqual(hyeong("핫"), ["핫", 1, 0]);

assert.deepEqual(hyeong("흣"), ["흣", 1, 0]);

assert.deepEqual(hyeong("흡"), ["흡", 1, 0]);

assert.deepEqual(hyeong("흑"), ["흑", 1, 0]);


assert.deepEqual(hyeong("혀엉"), ["형", 2, 0]);

assert.deepEqual(hyeong("하앙"), ["항", 2, 0]);

assert.deepEqual(hyeong("하앗"), ["핫", 2, 0]);

assert.deepEqual(hyeong("흐읏"), ["흣", 2, 0]);

assert.deepEqual(hyeong("흐읍"), ["흡", 2, 0]);

assert.deepEqual(hyeong("흐윽"), ["흑", 2, 0]);


assert.deepEqual(hyeong("흐...읍"), ["흡", 2, 0]);


assert.deepEqual(hyeong("혀일이삼사오육앙앗읏읍엉"), ["형", 12, 0]);

assert.deepEqual(hyeong("혀일....이삼사오육앙♥앗?!읏♡읍...엉"), ["형", 12, 0]);

assert.deepEqual(hyeong("흐일이삼사 오육앙하앗읏읍엉"), ["흣", 11, 0]);

assert.deepEqual(hyeong("하흐읏앗앙"), ["핫", 4, 0]);

assert.deepEqual(hyeong("혀흐하윽"), ["흑", 3, 0]);


// 말줄임표 해석

assert.deepEqual(hyeong("혀엉...."), ["형", 2, 4]);

assert.deepEqual(hyeong("하앗. … ⋯ ⋮"), ["핫", 2, 10]);

assert.deepEqual(hyeong("혀읏......잠....하앙....혀엉. ....."), ["형", 7, 6]);


// 하트 구역 해석

assert.deepEqual(hyeong("하앗....♥♡!"), ["핫", 2, 4, "!♥_"]);

assert.deepEqual(hyeong("하아앗.. . ? ♥ ! 💖"), ["핫", 3, 3, "?_!♥💖"]);

assert.deepEqual(hyeong("혀엉...♥?!♡"), ["형", 2, 3, "형 2 3 ?♥!_♡"]);

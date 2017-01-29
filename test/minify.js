import assert from "assert";

import { minify } from "../src/minify";

//

assert.equal(minify("형").result, "형");

assert.equal(minify("혀엉").result, "혀엉");

assert.equal(minify("형..").result, "형..");

assert.equal(minify("혀엉..").result, "혀엉..");

assert.equal(minify("형♥").result, "형♥");

assert.equal(minify("혀엉♥").result, "혀엉♥");

assert.equal(minify("형..♥").result, "형..♥");

assert.equal(minify("혀엉..♥").result, "혀엉..♥");

// 한글(가-힣)이 아닌 문자 제거

assert.equal(minify("형.. 형..\n하앙.").result, "형..형..하앙.");

assert.equal(minify("혀아이ㅎ우ㅎ에오엉..").result, "혀아이우에오엉..");

// ... to …

assert.equal(minify("형...").result, "형…");
assert.equal(minify("형....").result, "형….");
assert.equal(minify("형.....").result, "형…..");
assert.equal(minify("혀어어엉......").result, "혀어어엉……");

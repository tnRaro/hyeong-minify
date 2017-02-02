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

assert.equal(minify("혀아이ㅎ우ㅎ에오엉..").result, "혀어어어어어엉..");

assert.equal(minify("흐...읍").result, "흐읍");

assert.equal(minify("혀일....이삼사오육앙♥앗?!읏♡읍...엉").result, "혀어어어어어어어어어어엉");

assert.equal(minify("흐일이삼사 오육앙하앗읏읍엉").result, "흐으으으으으으으으으읏");

// ... to …

assert.equal(minify("형...").result, "형…");
assert.equal(minify("형....").result, "형….");
assert.equal(minify("형.....").result, "형…..");
assert.equal(minify("혀어어엉......").result, "혀어어엉……");

// 하트 구역

assert.equal(minify("형♥❤💕💖💗💘💙💚💛💜💝♡?!").result, "형♥❤💕💖💗💘💙💚💛💜💝♡?!");
assert.equal(minify("혀엉♥?ㅁㄴㅇㅁㄴㅇ....♥").result, "혀엉♥?♥");
assert.equal(minify("형..?....").result, "형..?");
assert.equal(minify("혀♥엉♥").result, "혀엉♥");


// options

// options.hangul

// options.hangul.keep

assert.equal(minify("혀어.. 너무커엇...♥ 엉..", { hangul: { keep: true } }).result, "혀어.. 너무커엇...♥ 엉..");

assert.throws(() => minify("", { hangul: { keep: "type error" }}), Error);

// options.ellipsis

// options.ellipsis.keep

assert.equal(minify("혀엉.......", { ellipsis: { keep: true } }).result, "혀엉.......");

assert.throws(() => minify("", { ellipsis: { keep: "type error" }}), Error);

// options.ellipsis.type

assert.equal(minify("혀엉.......", { ellipsis: { type: "…" } }).result, "혀엉…….");
assert.equal(minify("혀엉.......", { ellipsis: { type: "⋯" } }).result, "혀엉⋯⋯.");
assert.equal(minify("혀엉.......", { ellipsis: { type: "⋮" } }).result, "혀엉⋮⋮.");

assert.throws(() => minify("", { ellipsis: { type: "error" }}), Error);

// options.useHyeongMin

assert.equal(minify("형..", { useHyeongMin: true }).result, "형..");
assert.equal(minify("형........", { useHyeongMin: true }).result, "혀엉….");
assert.equal(minify("형..........", { useHyeongMin: true }).result, "혀엉…..");
assert.equal(minify("형....................", { useHyeongMin: true }).result, "혀엉……….");
assert.equal(minify("형....................", { useHyeongMin: true, ellipsis: { keep: true } }).result, "혀어어엉.....");

assert.throws(() => minify("", { useHyeongMin: "type error" }), Error);

assert.throws(() => minify("", { hangul: { keep: true }, useHyeongMin: true }), Error);

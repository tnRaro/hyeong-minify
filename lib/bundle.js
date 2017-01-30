(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["hyeong"] = factory();
	else
		root["hyeong"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createGenerator = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _hyeongMin = __webpack_require__(2);

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var mojiMap = {
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
	}
};

var hangul = function hangul(_ref, options) {
	var command = _ref.command,
	    inst = _ref.inst,
	    input = _ref.input;

	if (options.hangul.keep) {
		return input;
	}

	if (inst === 1) {
		return command;
	} else if (inst > 1) {
		var res = mojiMap[command].first;

		for (var i = 0; i < inst - 2; i++) {
			res += mojiMap[command].middle;
		}

		res += mojiMap[command].last;

		return res;
	}

	throw new Error("");
};

var ellipsis = function ellipsis(_ref2, options) {
	var ellipsis = _ref2.ellipsis;

	var e = "";

	if (options.ellipsis.keep) {
		for (var i = 0; i < ellipsis; i++) {
			e += ".";
		}
	} else {
		for (var _i = 0; _i < Math.floor(ellipsis / 3); _i++) {
			e += options.ellipsis.type;
		}
		for (var _i2 = 0; _i2 < ellipsis % 3; _i2++) {
			e += ".";
		}
	}

	return e;
};

var heart = function heart(_ref3, _ref4) {
	var heart = _ref3.heart;

	_objectDestructuringEmpty(_ref4);

	if (typeof heart !== "undefined") {
		return heart;
	}
	return "";
};

var generate = function generate(token, options) {
	return hangul(token, options) + ellipsis(token, options) + heart(token, options);
};

var createGenerator = exports.createGenerator = function createGenerator() {
	var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var options = _extends({
		useHyeongMin: false
	}, userOptions, {
		hangul: _extends({
			keep: false
		}, userOptions.hangul),
		ellipsis: _extends({
			keep: false,
			type: "…"
		}, userOptions.ellipsis)
	});

	if (typeof options.hangul.keep !== "boolean") {
		throw new Error("options.hangul.keep must be boolean.");
	}
	if (typeof options.ellipsis.keep !== "boolean") {
		throw new Error("options.ellipsis.keep must be boolean.");
	}
	if (!/[…⋯⋮]/.test(options.ellipsis.type)) {
		throw new Error("options.ellipsis.type must be '…', '⋯' or '⋮'.");
	}
	if (typeof options.useHyeongMin !== "boolean") {
		throw new Error("options.useHyeongMin must be boolean.");
	}

	return function (token) {
		if (options.useHyeongMin) {
			return generate((0, _hyeongMin.minimalize)(token, !options.ellipsis.keep), options);
		}
		return generate(token, options);
	};
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var map = {
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

var regs = {
	hangul: function hangul() {
		return (/([형항핫흣흡흑]|혀.*?엉|하.*?[앙앗]|흐.*?[읏읍윽])/g
		);
	},
	heart: function heart() {
		return (/[♥❤💕💖💗💘💙💚💛💜💝♡?!].*/
		);
	}
};

var ellipsis = function ellipsis(suffix) {
	var i = 0;

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = suffix[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var c = _step.value;

			if (/[.]/.test(c)) {
				i++;
			} else if (/[…⋯⋮]/.test(c)) {
				i += 3;
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return i;
};

var heartWrap = function heartWrap(heart) {
	return heart.replace(/[^♥❤💕💖💗💘💙💚💛💜💝♡?!]/g, "");
};

var tokenize = exports.tokenize = function tokenize(hyeong) {
	var pos = 0;

	var phase = 0;

	var tokens = [];

	var res = void 0;

	var hanguls = [];

	var rhangul = regs.hangul();

	while (res = rhangul.exec(hyeong)) {
		hanguls.push(res);
	}

	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = hanguls.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var _step2$value = _slicedToArray(_step2.value, 2),
			    index = _step2$value[0],
			    hangul = _step2$value[1];

			var h = hangul[0];
			var next = hanguls[index + 1] || { index: Number.MAX_SAFE_INTEGER };

			var c = h.charAt(0);
			var e = h.charAt(h.length - 1);

			var token = {
				command: undefined,
				inst: 0,
				ellipsis: 0,
				heart: undefined,
				input: h
			};

			switch (c) {
				case "형":
				case "항":
				case "핫":
				case "흣":
				case "흡":
				case "흑":
					{
						token.command = h;
						token.inst = 1;

						var suffix = hangul.input.slice(hangul.index + h.length, next.index);

						var heart = regs.heart().exec(suffix);

						if (heart !== null) {
							token.heart = heartWrap(heart[0]);

							suffix = suffix.slice(0, heart.index);
						}

						token.ellipsis = ellipsis(suffix);
					}
					break;
				case "혀":
				case "하":
				case "흐":
					{
						token.command = map[c][e];
						token.inst = h.match(/[가-힣]/g).length;

						var _suffix = hangul.input.slice(hangul.index + h.length, next.index);

						var _heart = regs.heart().exec(_suffix);

						if (_heart !== null) {
							token.heart = heartWrap(_heart[0]);

							_suffix = _suffix.slice(0, _heart.index);
						}

						token.ellipsis = ellipsis(_suffix);
					}
					break;
			}

			tokens.push(token);
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}

	return tokens;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var getHalfDivisors = function getHalfDivisors(n) {
	var divisors = [[1, n]];

	var i = void 0,
	    d = void 0;

	for (i = 2; i * i < n; i++) {
		if (n % i === 0) {
			divisors.push([i, n / i | 0]);
		}
	}

	if (i * i === n) {
		divisors.push([i, n / i | 0]);
	}

	return divisors;
};

var getMin = function getMin(n) {
	var divisors = getHalfDivisors(n).reverse();

	for (var i in divisors) {
		var _divisors$i = _slicedToArray(divisors[i], 2),
		    a = _divisors$i[0],
		    b = _divisors$i[1];

		var next = divisors[parseInt(i) + 1];

		if (typeof next === "undefined") {
			return [a, b];
		}

		var score0 = a + Math.floor(b / 3) + b % 3;
		var score1 = next[0] + Math.floor(next[1] / 3) + next[1] % 3;

		if (score1 >= score0) {
			return [a, b];
		}
	}
};

var getMinWithout3Ellipsis = function getMinWithout3Ellipsis(n) {
	return getHalfDivisors(n).pop();
};

var minimalize = exports.minimalize = function minimalize(token) {
	var use3Ellipsis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	if (token.command === "형") {
		var _ref = use3Ellipsis ? getMin(token.inst * token.ellipsis) : getMinWithout3Ellipsis(token.inst * token.ellipsis),
		    _ref2 = _slicedToArray(_ref, 2),
		    inst = _ref2[0],
		    ellipsis = _ref2[1];

		return _extends({}, token, {
			inst: inst,
			ellipsis: ellipsis
		});
	}

	return token;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.minify = undefined;

var _tokenize = __webpack_require__(1);

var _generator = __webpack_require__(0);

var minify = exports.minify = function minify(hyeong, options) {
	var generator = (0, _generator.createGenerator)(options);

	var result = (0, _tokenize.tokenize)(hyeong).map(function (token) {
		return generator(token);
	}).join("");

	return {
		original: hyeong,
		result: result
	};
};

/***/ })
/******/ ]);
});
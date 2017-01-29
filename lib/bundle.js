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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
				inst: undefined,
				ellipsis: undefined,
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
							token.heart = heart[0].replace(/[^♥❤💕💖💗💘💙💚💛💜💝♡?!]/, "");

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
							token.heart = _heart[0].replace(/[^♥❤💕💖💗💘💙💚💛💜💝♡?!]/, "");

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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.minify = undefined;

var _tokenize = __webpack_require__(0);

var ellipsis = function ellipsis(_ellipsis, _ref) {
	var ellipsisType = _ref.ellipsisType;

	var e = "";

	for (var i = 0; i < Math.floor(_ellipsis / 3); i++) {
		e += ellipsisType || "…";
	}
	for (var _i = 0; _i < _ellipsis % 3; _i++) {
		e += ".";
	}

	return e;
};

var minify = exports.minify = function minify(hyeong) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	if (options.ellipsisType) {
		if (!/[…⋯⋮]/.test(options.ellipsisType)) {
			throw new Error("options.ellipsisType must be '…', '⋯' or '⋮'.");
		}
	}

	var result = (0, _tokenize.tokenize)(hyeong).map(function (token) {
		return "" + token.input.replace(/[^.…⋯⋮가-힣♥❤💕💖💗💘💙💚💛💜💝♡?!]/g, "") + ellipsis(token.ellipsis, options) + (token.heart || "");
	}).join("");

	return {
		original: hyeong,
		result: result
	};
};

/***/ })
/******/ ]);
});
(function (exports) {
'use strict';

function noop() {}

function assign(target) {
	var k,
		source,
		i = 1,
		len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) target[k] = source[k];
	}

	return target;
}

function appendNode(node, target) {
	target.appendChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function detachBetween(before, after) {
	while (before.nextSibling && before.nextSibling !== after) {
		before.parentNode.removeChild(before.nextSibling);
	}
}

function reinsertChildren(parent, target) {
	while (parent.firstChild) target.appendChild(parent.firstChild);
}

function destroyEach(iterations) {
	for (var i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d();
	}
}

function createFragment() {
	return document.createDocumentFragment();
}

function createElement(name) {
	return document.createElement(name);
}

function createText(data) {
	return document.createTextNode(data);
}

function createComment() {
	return document.createComment('');
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function setStyle(node, key, value) {
	node.style.setProperty(key, value);
}

function blankObject() {
	return Object.create(null);
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function differs(a, b) {
	return a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

function dispatchObservers(component, group, changed, newState, oldState) {
	for (var key in group) {
		if (!changed[key]) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}

function fire(eventName, data) {
	var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function init(component, options) {
	component.options = options;

	component._observers = { pre: blankObject(), post: blankObject() };
	component._handlers = blankObject();
	component._root = options._root || component;
	component._yield = options._yield;
	component._bind = options._bind;
}

function observe(key, callback, options) {
	var group = options && options.defer
		? this._observers.post
		: this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this._root._lock) return;
	this._root._lock = true;
	callAll(this._root._beforecreate);
	callAll(this._root._oncreate);
	callAll(this._root._aftercreate);
	this._root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
		changed = {},
		dirty = false;

	for (var key in newState) {
		if (differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign({}, oldState, newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);
	dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
	this._fragment.p(changed, this._state);
	dispatchObservers(this, this._observers.post, changed, this._state, oldState);
}

function callAll(fns) {
	while (fns && fns.length) fns.pop()();
}

function _mount(target, anchor) {
	this._fragment.m(target, anchor);
}

function _unmount() {
	this._fragment.u();
}

var proto = {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_recompute: noop,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};



function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var fuse = createCommonjsModule(function (module, exports) {
/*!
 * Fuse.js v3.0.5 - Lightweight fuzzy-search (http://fusejs.io)
 * 
 * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	module.exports = factory();
})(commonjsGlobal, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bitapRegexSearch = __webpack_require__(5);
var bitapSearch = __webpack_require__(7);
var patternAlphabet = __webpack_require__(4);

var Bitap = function () {
  function Bitap(pattern, _ref) {
    var _ref$location = _ref.location,
        location = _ref$location === undefined ? 0 : _ref$location,
        _ref$distance = _ref.distance,
        distance = _ref$distance === undefined ? 100 : _ref$distance,
        _ref$threshold = _ref.threshold,
        threshold = _ref$threshold === undefined ? 0.6 : _ref$threshold,
        _ref$maxPatternLength = _ref.maxPatternLength,
        maxPatternLength = _ref$maxPatternLength === undefined ? 32 : _ref$maxPatternLength,
        _ref$isCaseSensitive = _ref.isCaseSensitive,
        isCaseSensitive = _ref$isCaseSensitive === undefined ? false : _ref$isCaseSensitive,
        _ref$tokenSeparator = _ref.tokenSeparator,
        tokenSeparator = _ref$tokenSeparator === undefined ? / +/g : _ref$tokenSeparator,
        _ref$findAllMatches = _ref.findAllMatches,
        findAllMatches = _ref$findAllMatches === undefined ? false : _ref$findAllMatches,
        _ref$minMatchCharLeng = _ref.minMatchCharLength,
        minMatchCharLength = _ref$minMatchCharLeng === undefined ? 1 : _ref$minMatchCharLeng;

    _classCallCheck(this, Bitap);

    this.options = {
      location: location,
      distance: distance,
      threshold: threshold,
      maxPatternLength: maxPatternLength,
      isCaseSensitive: isCaseSensitive,
      tokenSeparator: tokenSeparator,
      findAllMatches: findAllMatches,
      minMatchCharLength: minMatchCharLength
    };

    this.pattern = this.options.isCaseSensitive ? pattern : pattern.toLowerCase();

    if (this.pattern.length <= maxPatternLength) {
      this.patternAlphabet = patternAlphabet(this.pattern);
    }
  }

  _createClass(Bitap, [{
    key: 'search',
    value: function search(text) {
      if (!this.options.isCaseSensitive) {
        text = text.toLowerCase();
      }

      // Exact match
      if (this.pattern === text) {
        return {
          isMatch: true,
          score: 0,
          matchedIndices: [[0, text.length - 1]]
        };
      }

      // When pattern length is greater than the machine word length, just do a a regex comparison
      var _options = this.options,
          maxPatternLength = _options.maxPatternLength,
          tokenSeparator = _options.tokenSeparator;

      if (this.pattern.length > maxPatternLength) {
        return bitapRegexSearch(text, this.pattern, tokenSeparator);
      }

      // Otherwise, use Bitap algorithm
      var _options2 = this.options,
          location = _options2.location,
          distance = _options2.distance,
          threshold = _options2.threshold,
          findAllMatches = _options2.findAllMatches,
          minMatchCharLength = _options2.minMatchCharLength;

      return bitapSearch(text, this.pattern, this.patternAlphabet, {
        location: location,
        distance: distance,
        threshold: threshold,
        findAllMatches: findAllMatches,
        minMatchCharLength: minMatchCharLength
      });
    }
  }]);

  return Bitap;
}();

// let x = new Bitap("od mn war", {})
// let result = x.search("Old Man's War")
// console.log(result)

module.exports = Bitap;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = __webpack_require__(0);

var deepValue = function deepValue(obj, path, list) {
  if (!path) {
    // If there's no path left, we've gotten to the object we care about.
    list.push(obj);
  } else {
    var dotIndex = path.indexOf('.');
    var firstSegment = path;
    var remaining = null;

    if (dotIndex !== -1) {
      firstSegment = path.slice(0, dotIndex);
      remaining = path.slice(dotIndex + 1);
    }

    var value = obj[firstSegment];

    if (value !== null && value !== undefined) {
      if (!remaining && (typeof value === 'string' || typeof value === 'number')) {
        list.push(value);
      } else if (isArray(value)) {
        // Search each item in the array.
        for (var i = 0, len = value.length; i < len; i += 1) {
          deepValue(value[i], remaining, list);
        }
      } else if (remaining) {
        // An object. Recurse further.
        deepValue(value, remaining, list);
      }
    }
  }

  return list;
};

module.exports = function (obj, path) {
  return deepValue(obj, path, []);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  var matchmask = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var minMatchCharLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var matchedIndices = [];
  var start = -1;
  var end = -1;
  var i = 0;

  for (var len = matchmask.length; i < len; i += 1) {
    var match = matchmask[i];
    if (match && start === -1) {
      start = i;
    } else if (!match && start !== -1) {
      end = i - 1;
      if (end - start + 1 >= minMatchCharLength) {
        matchedIndices.push([start, end]);
      }
      start = -1;
    }
  }

  // (i-1 - start) + 1 => i - start
  if (matchmask[i - 1] && i - start >= minMatchCharLength) {
    matchedIndices.push([start, i - 1]);
  }

  return matchedIndices;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (pattern) {
  var mask = {};
  var len = pattern.length;

  for (var i = 0; i < len; i += 1) {
    mask[pattern.charAt(i)] = 0;
  }

  for (var _i = 0; _i < len; _i += 1) {
    mask[pattern.charAt(_i)] |= 1 << len - _i - 1;
  }

  return mask;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SPECIAL_CHARS_REGEX = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;

module.exports = function (text, pattern) {
  var tokenSeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : / +/g;

  var regex = new RegExp(pattern.replace(SPECIAL_CHARS_REGEX, '\\$&').replace(tokenSeparator, '|'));
  var matches = text.match(regex);
  var isMatch = !!matches;
  var matchedIndices = [];

  if (isMatch) {
    for (var i = 0, matchesLen = matches.length; i < matchesLen; i += 1) {
      var match = matches[i];
      matchedIndices.push([text.indexOf(match), match.length - 1]);
    }
  }

  return {
    // TODO: revisit this score
    score: isMatch ? 0.5 : 1,
    isMatch: isMatch,
    matchedIndices: matchedIndices
  };
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (pattern, _ref) {
  var _ref$errors = _ref.errors,
      errors = _ref$errors === undefined ? 0 : _ref$errors,
      _ref$currentLocation = _ref.currentLocation,
      currentLocation = _ref$currentLocation === undefined ? 0 : _ref$currentLocation,
      _ref$expectedLocation = _ref.expectedLocation,
      expectedLocation = _ref$expectedLocation === undefined ? 0 : _ref$expectedLocation,
      _ref$distance = _ref.distance,
      distance = _ref$distance === undefined ? 100 : _ref$distance;

  var accuracy = errors / pattern.length;
  var proximity = Math.abs(expectedLocation - currentLocation);

  if (!distance) {
    // Dodge divide by zero error.
    return proximity ? 1.0 : accuracy;
  }

  return accuracy + proximity / distance;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bitapScore = __webpack_require__(6);
var matchedIndices = __webpack_require__(3);

module.exports = function (text, pattern, patternAlphabet, _ref) {
  var _ref$location = _ref.location,
      location = _ref$location === undefined ? 0 : _ref$location,
      _ref$distance = _ref.distance,
      distance = _ref$distance === undefined ? 100 : _ref$distance,
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === undefined ? 0.6 : _ref$threshold,
      _ref$findAllMatches = _ref.findAllMatches,
      findAllMatches = _ref$findAllMatches === undefined ? false : _ref$findAllMatches,
      _ref$minMatchCharLeng = _ref.minMatchCharLength,
      minMatchCharLength = _ref$minMatchCharLeng === undefined ? 1 : _ref$minMatchCharLeng;

  var expectedLocation = location;
  // Set starting location at beginning text and initialize the alphabet.
  var textLen = text.length;
  // Highest score beyond which we give up.
  var currentThreshold = threshold;
  // Is there a nearby exact match? (speedup)
  var bestLocation = text.indexOf(pattern, expectedLocation);

  var patternLen = pattern.length;

  // a mask of the matches
  var matchMask = [];
  for (var i = 0; i < textLen; i += 1) {
    matchMask[i] = 0;
  }

  if (bestLocation !== -1) {
    var score = bitapScore(pattern, {
      errors: 0,
      currentLocation: bestLocation,
      expectedLocation: expectedLocation,
      distance: distance
    });
    currentThreshold = Math.min(score, currentThreshold);

    // What about in the other direction? (speed up)
    bestLocation = text.lastIndexOf(pattern, expectedLocation + patternLen);

    if (bestLocation !== -1) {
      var _score = bitapScore(pattern, {
        errors: 0,
        currentLocation: bestLocation,
        expectedLocation: expectedLocation,
        distance: distance
      });
      currentThreshold = Math.min(_score, currentThreshold);
    }
  }

  // Reset the best location
  bestLocation = -1;

  var lastBitArr = [];
  var finalScore = 1;
  var binMax = patternLen + textLen;

  var mask = 1 << patternLen - 1;

  for (var _i = 0; _i < patternLen; _i += 1) {
    // Scan for the best match; each iteration allows for one more error.
    // Run a binary search to determine how far from the match location we can stray
    // at this error level.
    var binMin = 0;
    var binMid = binMax;

    while (binMin < binMid) {
      var _score3 = bitapScore(pattern, {
        errors: _i,
        currentLocation: expectedLocation + binMid,
        expectedLocation: expectedLocation,
        distance: distance
      });

      if (_score3 <= currentThreshold) {
        binMin = binMid;
      } else {
        binMax = binMid;
      }

      binMid = Math.floor((binMax - binMin) / 2 + binMin);
    }

    // Use the result from this iteration as the maximum for the next.
    binMax = binMid;

    var start = Math.max(1, expectedLocation - binMid + 1);
    var finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;

    // Initialize the bit array
    var bitArr = Array(finish + 2);

    bitArr[finish + 1] = (1 << _i) - 1;

    for (var j = finish; j >= start; j -= 1) {
      var currentLocation = j - 1;
      var charMatch = patternAlphabet[text.charAt(currentLocation)];

      if (charMatch) {
        matchMask[currentLocation] = 1;
      }

      // First pass: exact match
      bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;

      // Subsequent passes: fuzzy match
      if (_i !== 0) {
        bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
      }

      if (bitArr[j] & mask) {
        finalScore = bitapScore(pattern, {
          errors: _i,
          currentLocation: currentLocation,
          expectedLocation: expectedLocation,
          distance: distance
        });

        // This match will almost certainly be better than any existing match.
        // But check anyway.
        if (finalScore <= currentThreshold) {
          // Indeed it is
          currentThreshold = finalScore;
          bestLocation = currentLocation;

          // Already passed `loc`, downhill from here on in.
          if (bestLocation <= expectedLocation) {
            break;
          }

          // When passing `bestLocation`, don't exceed our current distance from `expectedLocation`.
          start = Math.max(1, 2 * expectedLocation - bestLocation);
        }
      }
    }

    // No hope for a (better) match at greater error levels.
    var _score2 = bitapScore(pattern, {
      errors: _i + 1,
      currentLocation: expectedLocation,
      expectedLocation: expectedLocation,
      distance: distance
    });

    if (_score2 > currentThreshold) {
      break;
    }

    lastBitArr = bitArr;
  }

  // Count exact matches (those with a score of 0) to be "almost" exact
  return {
    isMatch: bestLocation >= 0,
    score: finalScore === 0 ? 0.001 : finalScore,
    matchedIndices: matchedIndices(matchMask, minMatchCharLength)
  };
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bitap = __webpack_require__(1);
var deepValue = __webpack_require__(2);
var isArray = __webpack_require__(0);

var Fuse = function () {
  function Fuse(list, _ref) {
    var _ref$location = _ref.location,
        location = _ref$location === undefined ? 0 : _ref$location,
        _ref$distance = _ref.distance,
        distance = _ref$distance === undefined ? 100 : _ref$distance,
        _ref$threshold = _ref.threshold,
        threshold = _ref$threshold === undefined ? 0.6 : _ref$threshold,
        _ref$maxPatternLength = _ref.maxPatternLength,
        maxPatternLength = _ref$maxPatternLength === undefined ? 32 : _ref$maxPatternLength,
        _ref$caseSensitive = _ref.caseSensitive,
        caseSensitive = _ref$caseSensitive === undefined ? false : _ref$caseSensitive,
        _ref$tokenSeparator = _ref.tokenSeparator,
        tokenSeparator = _ref$tokenSeparator === undefined ? / +/g : _ref$tokenSeparator,
        _ref$findAllMatches = _ref.findAllMatches,
        findAllMatches = _ref$findAllMatches === undefined ? false : _ref$findAllMatches,
        _ref$minMatchCharLeng = _ref.minMatchCharLength,
        minMatchCharLength = _ref$minMatchCharLeng === undefined ? 1 : _ref$minMatchCharLeng,
        _ref$id = _ref.id,
        id = _ref$id === undefined ? null : _ref$id,
        _ref$keys = _ref.keys,
        keys = _ref$keys === undefined ? [] : _ref$keys,
        _ref$shouldSort = _ref.shouldSort,
        shouldSort = _ref$shouldSort === undefined ? true : _ref$shouldSort,
        _ref$getFn = _ref.getFn,
        getFn = _ref$getFn === undefined ? deepValue : _ref$getFn,
        _ref$sortFn = _ref.sortFn,
        sortFn = _ref$sortFn === undefined ? function (a, b) {
      return a.score - b.score;
    } : _ref$sortFn,
        _ref$tokenize = _ref.tokenize,
        tokenize = _ref$tokenize === undefined ? false : _ref$tokenize,
        _ref$matchAllTokens = _ref.matchAllTokens,
        matchAllTokens = _ref$matchAllTokens === undefined ? false : _ref$matchAllTokens,
        _ref$includeMatches = _ref.includeMatches,
        includeMatches = _ref$includeMatches === undefined ? false : _ref$includeMatches,
        _ref$includeScore = _ref.includeScore,
        includeScore = _ref$includeScore === undefined ? false : _ref$includeScore,
        _ref$verbose = _ref.verbose,
        verbose = _ref$verbose === undefined ? false : _ref$verbose;

    _classCallCheck(this, Fuse);

    this.options = {
      location: location,
      distance: distance,
      threshold: threshold,
      maxPatternLength: maxPatternLength,
      isCaseSensitive: caseSensitive,
      tokenSeparator: tokenSeparator,
      findAllMatches: findAllMatches,
      minMatchCharLength: minMatchCharLength,
      id: id,
      keys: keys,
      includeMatches: includeMatches,
      includeScore: includeScore,
      shouldSort: shouldSort,
      getFn: getFn,
      sortFn: sortFn,
      verbose: verbose,
      tokenize: tokenize,
      matchAllTokens: matchAllTokens
    };

    this.setCollection(list);
  }

  _createClass(Fuse, [{
    key: 'setCollection',
    value: function setCollection(list) {
      this.list = list;
      return list;
    }
  }, {
    key: 'search',
    value: function search(pattern) {
      this._log('---------\nSearch pattern: "' + pattern + '"');

      var _prepareSearchers2 = this._prepareSearchers(pattern),
          tokenSearchers = _prepareSearchers2.tokenSearchers,
          fullSearcher = _prepareSearchers2.fullSearcher;

      var _search2 = this._search(tokenSearchers, fullSearcher),
          weights = _search2.weights,
          results = _search2.results;

      this._computeScore(weights, results);

      if (this.options.shouldSort) {
        this._sort(results);
      }

      return this._format(results);
    }
  }, {
    key: '_prepareSearchers',
    value: function _prepareSearchers() {
      var pattern = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var tokenSearchers = [];

      if (this.options.tokenize) {
        // Tokenize on the separator
        var tokens = pattern.split(this.options.tokenSeparator);
        for (var i = 0, len = tokens.length; i < len; i += 1) {
          tokenSearchers.push(new Bitap(tokens[i], this.options));
        }
      }

      var fullSearcher = new Bitap(pattern, this.options);

      return { tokenSearchers: tokenSearchers, fullSearcher: fullSearcher };
    }
  }, {
    key: '_search',
    value: function _search() {
      var tokenSearchers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var fullSearcher = arguments[1];

      var list = this.list;
      var resultMap = {};
      var results = [];

      // Check the first item in the list, if it's a string, then we assume
      // that every item in the list is also a string, and thus it's a flattened array.
      if (typeof list[0] === 'string') {
        // Iterate over every item
        for (var i = 0, len = list.length; i < len; i += 1) {
          this._analyze({
            key: '',
            value: list[i],
            record: i,
            index: i
          }, {
            resultMap: resultMap,
            results: results,
            tokenSearchers: tokenSearchers,
            fullSearcher: fullSearcher
          });
        }

        return { weights: null, results: results };
      }

      // Otherwise, the first item is an Object (hopefully), and thus the searching
      // is done on the values of the keys of each item.
      var weights = {};
      for (var _i = 0, _len = list.length; _i < _len; _i += 1) {
        var item = list[_i];
        // Iterate over every key
        for (var j = 0, keysLen = this.options.keys.length; j < keysLen; j += 1) {
          var key = this.options.keys[j];
          if (typeof key !== 'string') {
            weights[key.name] = {
              weight: 1 - key.weight || 1
            };
            if (key.weight <= 0 || key.weight > 1) {
              throw new Error('Key weight has to be > 0 and <= 1');
            }
            key = key.name;
          } else {
            weights[key] = {
              weight: 1
            };
          }

          this._analyze({
            key: key,
            value: this.options.getFn(item, key),
            record: item,
            index: _i
          }, {
            resultMap: resultMap,
            results: results,
            tokenSearchers: tokenSearchers,
            fullSearcher: fullSearcher
          });
        }
      }

      return { weights: weights, results: results };
    }
  }, {
    key: '_analyze',
    value: function _analyze(_ref2, _ref3) {
      var key = _ref2.key,
          value = _ref2.value,
          record = _ref2.record,
          index = _ref2.index;
      var _ref3$tokenSearchers = _ref3.tokenSearchers,
          tokenSearchers = _ref3$tokenSearchers === undefined ? [] : _ref3$tokenSearchers,
          _ref3$fullSearcher = _ref3.fullSearcher,
          fullSearcher = _ref3$fullSearcher === undefined ? [] : _ref3$fullSearcher,
          _ref3$resultMap = _ref3.resultMap,
          resultMap = _ref3$resultMap === undefined ? {} : _ref3$resultMap,
          _ref3$results = _ref3.results,
          results = _ref3$results === undefined ? [] : _ref3$results;

      // Check if the texvaluet can be searched
      if (value === undefined || value === null) {
        return;
      }

      var exists = false;
      var averageScore = -1;
      var numTextMatches = 0;

      if (typeof value === 'string') {
        this._log('\nKey: ' + (key === '' ? '-' : key));

        var mainSearchResult = fullSearcher.search(value);
        this._log('Full text: "' + value + '", score: ' + mainSearchResult.score);

        if (this.options.tokenize) {
          var words = value.split(this.options.tokenSeparator);
          var scores = [];

          for (var i = 0; i < tokenSearchers.length; i += 1) {
            var tokenSearcher = tokenSearchers[i];

            this._log('\nPattern: "' + tokenSearcher.pattern + '"');

            // let tokenScores = []
            var hasMatchInText = false;

            for (var j = 0; j < words.length; j += 1) {
              var word = words[j];
              var tokenSearchResult = tokenSearcher.search(word);
              var obj = {};
              if (tokenSearchResult.isMatch) {
                obj[word] = tokenSearchResult.score;
                exists = true;
                hasMatchInText = true;
                scores.push(tokenSearchResult.score);
              } else {
                obj[word] = 1;
                if (!this.options.matchAllTokens) {
                  scores.push(1);
                }
              }
              this._log('Token: "' + word + '", score: ' + obj[word]);
              // tokenScores.push(obj)
            }

            if (hasMatchInText) {
              numTextMatches += 1;
            }
          }

          averageScore = scores[0];
          var scoresLen = scores.length;
          for (var _i2 = 1; _i2 < scoresLen; _i2 += 1) {
            averageScore += scores[_i2];
          }
          averageScore = averageScore / scoresLen;

          this._log('Token score average:', averageScore);
        }

        var finalScore = mainSearchResult.score;
        if (averageScore > -1) {
          finalScore = (finalScore + averageScore) / 2;
        }

        this._log('Score average:', finalScore);

        var checkTextMatches = this.options.tokenize && this.options.matchAllTokens ? numTextMatches >= tokenSearchers.length : true;

        this._log('\nCheck Matches: ' + checkTextMatches);

        // If a match is found, add the item to <rawResults>, including its score
        if ((exists || mainSearchResult.isMatch) && checkTextMatches) {
          // Check if the item already exists in our results
          var existingResult = resultMap[index];

          if (existingResult) {
            // Use the lowest score
            // existingResult.score, bitapResult.score
            existingResult.output.push({
              key: key,
              score: finalScore,
              matchedIndices: mainSearchResult.matchedIndices
            });
          } else {
            // Add it to the raw result list
            resultMap[index] = {
              item: record,
              output: [{
                key: key,
                score: finalScore,
                matchedIndices: mainSearchResult.matchedIndices
              }]
            };

            results.push(resultMap[index]);
          }
        }
      } else if (isArray(value)) {
        for (var _i3 = 0, len = value.length; _i3 < len; _i3 += 1) {
          this._analyze({
            key: key,
            value: value[_i3],
            record: record,
            index: index
          }, {
            resultMap: resultMap,
            results: results,
            tokenSearchers: tokenSearchers,
            fullSearcher: fullSearcher
          });
        }
      }
    }
  }, {
    key: '_computeScore',
    value: function _computeScore(weights, results) {
      this._log('\n\nComputing score:\n');

      for (var i = 0, len = results.length; i < len; i += 1) {
        var output = results[i].output;
        var scoreLen = output.length;

        var totalScore = 0;
        var bestScore = 1;

        for (var j = 0; j < scoreLen; j += 1) {
          var score = output[j].score;
          var weight = weights ? weights[output[j].key].weight : 1;
          var nScore = score * weight;

          if (weight !== 1) {
            bestScore = Math.min(bestScore, nScore);
          } else {
            output[j].nScore = nScore;
            totalScore += nScore;
          }
        }

        results[i].score = bestScore === 1 ? totalScore / scoreLen : bestScore;

        this._log(results[i]);
      }
    }
  }, {
    key: '_sort',
    value: function _sort(results) {
      this._log('\n\nSorting....');
      results.sort(this.options.sortFn);
    }
  }, {
    key: '_format',
    value: function _format(results) {
      var finalOutput = [];

      this._log('\n\nOutput:\n\n', results);

      var transformers = [];

      if (this.options.includeMatches) {
        transformers.push(function (result, data) {
          var output = result.output;
          data.matches = [];

          for (var i = 0, len = output.length; i < len; i += 1) {
            var item = output[i];
            var obj = {
              indices: item.matchedIndices
            };
            if (item.key) {
              obj.key = item.key;
            }
            data.matches.push(obj);
          }
        });
      }

      if (this.options.includeScore) {
        transformers.push(function (result, data) {
          data.score = result.score;
        });
      }

      for (var i = 0, len = results.length; i < len; i += 1) {
        var result = results[i];

        if (this.options.id) {
          result.item = this.options.getFn(result.item, this.options.id)[0];
        }

        if (!transformers.length) {
          finalOutput.push(result.item);
          continue;
        }

        var data = {
          item: result.item
        };

        for (var j = 0, _len2 = transformers.length; j < _len2; j += 1) {
          transformers[j](result, data);
        }

        finalOutput.push(data);
      }

      return finalOutput;
    }
  }, {
    key: '_log',
    value: function _log() {
      if (this.options.verbose) {
        var _console;

        (_console = console).log.apply(_console, arguments);
      }
    }
  }]);

  return Fuse;
}();

module.exports = Fuse;

/***/ })
/******/ ]);
});
//# sourceMappingURL=fuse.js.map
});

var Fuse = unwrapExports(fuse);

/* src\paginate.html generated by Svelte v1.40.2 */
const splitObject = o => Object.keys(o).map(e => (o[e]));  

function pages(selected, pageCount, pageRange, marginPages) {
    let items = {};
    if (pageCount <= pageRange) {
        for (let index = 0; index < pageCount; index++) {
            let page = {
            index: index,
            content: index + 1,
            selected: index === selected
            };
            items[index] = page;
        }
    } else {
        let leftPart = pageRange / 2;
        let rightPart = pageRange - leftPart;

        if (selected < leftPart) {
            leftPart = selected;
            rightPart = pageRange - leftPart;
        } else if (selected > pageCount - pageRange / 2) {
            rightPart = pageCount - selected;
            leftPart = pageRange - rightPart;
        }

        // items logic extracted into this function
        let mapItems = index => {
            let page = {
                index: index,
                content: index + 1,
                selected: index === selected
            };

            if (index <= marginPages - 1 || index >= pageCount - marginPages) {
                items[index] = page;
                return
            }

            let breakView = {
                content: '...',
                disabled: true
            };

            if ((selected - leftPart) > marginPages && items[marginPages] !== breakView) {
                items[marginPages] = breakView;
            }

            if ((selected + rightPart) < (pageCount - marginPages - 1) && items[pageCount - marginPages - 1] !== breakView) {
                items[pageCount - marginPages - 1] = breakView;
            }

            let overCount = selected + rightPart - pageCount + 1;

            if (overCount > 0 && index === selected - leftPart - overCount) {
                items[index] = page;
            }

            if ((index >= selected - leftPart) && (index <= selected + rightPart)) {
                items[index] = page;
                return
            }
        };

        // 1st - loop thru low end of margin pages
        for (let i = 0; i < marginPages; i++) {
            mapItems(i);
        }

        // 2nd - loop thru high end of margin pages
        for (let i = pageCount - 1; i >= pageCount - marginPages; i--) {
            mapItems(i);
        }

        // 3rd - loop thru selected range
        let selectedRangeLow = 0;
        if (selected - pageRange > 0) {
            selectedRangeLow = selected - pageRange;
        }

        let selectedRangeHigh = pageCount;
        if (selected + pageRange < pageCount) {
            selectedRangeHigh = selected + pageRange;
        }

        for (let i = selectedRangeLow; i < selectedRangeHigh; i++) {
            mapItems(i);
        }
    }
    return splitObject(items);
}

function data$1() {
	return {
    selected: 0,
    pageCount: 0,
    initialPage: 0,
    forcePage: 0,
    clickHandler:() => { },
    pageRange: 3,
    marginPages: 1,
    prevText: 'Prev',
    nextText: 'Next',
    containerClass: '',
    pageClass: '',
    pageLinkClass:'',
    prevClass: '',
    prevLinkClass: '',
    nextClass: '',
    nextLinkClass: '',
    activeClass: 'active',
    disabledClass: 'disabled',
    noLiSurround: false,
    // pages: []
};
}

function lastPageSelected(selected, pageCount) {
    return (selected === pageCount - 1) || (pageCount === 0);
}

function firstPageSelected(selected) {
    return selected === 0;
}

var methods$1 = {
    handlePageSelected(selectedIndex) {
        let {selected, clickHandler} = this.get();
        if (selected === selectedIndex) return;
            
        this.set({selected: selected = selectedIndex});
        clickHandler(selected + 1);
    },
    prevPage() {
        let {selected, clickHandler} = this.get();
        if (selected <= 0) return;

        this.set({selected: --selected});
        clickHandler(selected + 1);
    },
    nextPage() {
        let {selected, pageCount, clickHandler} = this.get();
        if (selected >= pageCount - 1) return;

        this.set({selected: ++selected});
        clickHandler(selected + 1);
    }
};

function oncreate$1() {
    this.observe('forcePage', forcePage => {
        if (forcePage !== this.get('selected')) {
            this.set({selected: forcePage});
        }
    });       
}

function encapsulateStyles$1(node) {
	setAttribute(node, "svelte-694586458", "");
}

function create_main_fragment$1(state, component) {
	var if_block_anchor;

	var current_block_type = select_block_type_2(state);
	var if_block = current_block_type(state, component);

	return {
		c: function create() {
			if_block.c();
			if_block_anchor = createComment();
		},

		m: function mount(target, anchor) {
			if_block.m(target, anchor);
			insertNode(if_block_anchor, target, anchor);
		},

		p: function update(changed, state) {
			if (current_block_type === (current_block_type = select_block_type_2(state)) && if_block) {
				if_block.p(changed, state);
			} else {
				if_block.u();
				if_block.d();
				if_block = current_block_type(state, component);
				if_block.c();
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},

		u: function unmount() {
			if_block.u();
			detachNode(if_block_anchor);
		},

		d: function destroy$$1() {
			if_block.d();
		}
	};
}

// (6:4) {{#each pages as page}}
function create_each_block$1(state, pages_1, page, page_index, component) {
	var li;

	var current_block_type = select_block_type$1(state, pages_1, page, page_index);
	var if_block = current_block_type(state, pages_1, page, page_index, component);

	return {
		c: function create() {
			li = createElement("li");
			if_block.c();
		},

		m: function mount(target, anchor) {
			insertNode(li, target, anchor);
			if_block.m(li, null);
		},

		p: function update(changed, state, pages_1, page, page_index) {
			if (current_block_type === (current_block_type = select_block_type$1(state, pages_1, page, page_index)) && if_block) {
				if_block.p(changed, state, pages_1, page, page_index);
			} else {
				if_block.u();
				if_block.d();
				if_block = current_block_type(state, pages_1, page, page_index, component);
				if_block.c();
				if_block.m(li, null);
			}
		},

		u: function unmount() {
			detachNode(li);
			if_block.u();
		},

		d: function destroy$$1() {
			if_block.d();
		}
	};
}

// (8:12) {{#if page.disabled}}
function create_if_block_1$1(state, pages_1, page, page_index, component) {
	var a, text_value = page.content, text;

	return {
		c: function create() {
			a = createElement("a");
			text = createText(text_value);
			this.h();
		},

		h: function hydrate() {
			a.className = state.pageLinkClass;
			a.tabIndex = "0";
		},

		m: function mount(target, anchor) {
			insertNode(a, target, anchor);
			appendNode(text, a);
		},

		p: function update(changed, state, pages_1, page, page_index) {
			if (changed.pageLinkClass) {
				a.className = state.pageLinkClass;
			}

			if ((changed.pages) && text_value !== (text_value = page.content)) {
				text.data = text_value;
			}
		},

		u: function unmount() {
			detachNode(a);
		},

		d: noop
	};
}

// (10:12) {{else}}
function create_if_block_2$1(state, pages_1, page, page_index, component) {
	var a, text_value = page.content, text;

	return {
		c: function create() {
			a = createElement("a");
			text = createText(text_value);
			this.h();
		},

		h: function hydrate() {
			a.className = state.pageLinkClass;
			a.tabIndex = "0";
			addListener(a, "click", click_handler$1);

			a._svelte = {
				component: component,
				pages_1: pages_1,
				page_index: page_index
			};
		},

		m: function mount(target, anchor) {
			insertNode(a, target, anchor);
			appendNode(text, a);
		},

		p: function update(changed, state, pages_1, page, page_index) {
			if (changed.pageLinkClass) {
				a.className = state.pageLinkClass;
			}

			a._svelte.pages_1 = pages_1;
			a._svelte.page_index = page_index;

			if ((changed.pages) && text_value !== (text_value = page.content)) {
				text.data = text_value;
			}
		},

		u: function unmount() {
			detachNode(a);
		},

		d: function destroy$$1() {
			removeListener(a, "click", click_handler$1);
		}
	};
}

// (23:4) {{#each pages as page}}
function create_each_block_1$1(state, pages_1, page_1, page_index, component) {
	var if_block_anchor;

	var current_block_type = select_block_type_1(state, pages_1, page_1, page_index);
	var if_block = current_block_type(state, pages_1, page_1, page_index, component);

	return {
		c: function create() {
			if_block.c();
			if_block_anchor = createComment();
		},

		m: function mount(target, anchor) {
			if_block.m(target, anchor);
			insertNode(if_block_anchor, target, anchor);
		},

		p: function update(changed, state, pages_1, page_1, page_index) {
			if (current_block_type === (current_block_type = select_block_type_1(state, pages_1, page_1, page_index)) && if_block) {
				if_block.p(changed, state, pages_1, page_1, page_index);
			} else {
				if_block.u();
				if_block.d();
				if_block = current_block_type(state, pages_1, page_1, page_index, component);
				if_block.c();
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},

		u: function unmount() {
			if_block.u();
			detachNode(if_block_anchor);
		},

		d: function destroy$$1() {
			if_block.d();
		}
	};
}

// (24:8) {{#if page.disabled}}
function create_if_block_4$1(state, pages_1, page_1, page_index, component) {
	var a, a_class_value, text_value = page_1.content, text;

	return {
		c: function create() {
			a = createElement("a");
			text = createText(text_value);
			this.h();
		},

		h: function hydrate() {
			a.className = a_class_value = "" + state.pageLinkClass + " " + (page_1.selected ? state.activeClass : '') + " " + (page_1.disabled ? state.disabledClass : '');
			a.tabIndex = "0";
		},

		m: function mount(target, anchor) {
			insertNode(a, target, anchor);
			appendNode(text, a);
		},

		p: function update(changed, state, pages_1, page_1, page_index) {
			if ((changed.pageLinkClass || changed.pages || changed.activeClass || changed.disabledClass) && a_class_value !== (a_class_value = "" + state.pageLinkClass + " " + (page_1.selected ? state.activeClass : '') + " " + (page_1.disabled ? state.disabledClass : ''))) {
				a.className = a_class_value;
			}

			if ((changed.pages) && text_value !== (text_value = page_1.content)) {
				text.data = text_value;
			}
		},

		u: function unmount() {
			detachNode(a);
		},

		d: noop
	};
}

// (26:8) {{else}}
function create_if_block_5$1(state, pages_1, page_1, page_index, component) {
	var a, a_class_value, text_value = page_1.content, text;

	return {
		c: function create() {
			a = createElement("a");
			text = createText(text_value);
			this.h();
		},

		h: function hydrate() {
			a.className = a_class_value = "" + state.pageLinkClass + " " + (page_1.selected ? state.activeClass : '') + " " + (page_1.disabled ? state.disabledClass : '');
			a.tabIndex = "0";
			addListener(a, "click", click_handler_1$1);

			a._svelte = {
				component: component,
				pages_1: pages_1,
				page_index: page_index
			};
		},

		m: function mount(target, anchor) {
			insertNode(a, target, anchor);
			appendNode(text, a);
		},

		p: function update(changed, state, pages_1, page_1, page_index) {
			if ((changed.pageLinkClass || changed.pages || changed.activeClass || changed.disabledClass) && a_class_value !== (a_class_value = "" + state.pageLinkClass + " " + (page_1.selected ? state.activeClass : '') + " " + (page_1.disabled ? state.disabledClass : ''))) {
				a.className = a_class_value;
			}

			a._svelte.pages_1 = pages_1;
			a._svelte.page_index = page_index;

			if ((changed.pages) && text_value !== (text_value = page_1.content)) {
				text.data = text_value;
			}
		},

		u: function unmount() {
			detachNode(a);
		},

		d: function destroy$$1() {
			removeListener(a, "click", click_handler_1$1);
		}
	};
}

// (1:0) {{#if !noLiSurround}}
function create_if_block$1(state, component) {
	var ul, li, li_class_value, a, slot_content_prevContent = component._slotted.prevContent, text, li_1, li_1_class_value, a_1, slot_content_nextContent = component._slotted.nextContent, text_2;

	function click_handler(event) {
		component.prevPage();
	}

	var pages_1 = state.pages;

	var each_blocks = [];

	for (var i = 0; i < pages_1.length; i += 1) {
		each_blocks[i] = create_each_block$1(state, pages_1, pages_1[i], i, component);
	}

	function click_handler_1(event) {
		component.nextPage();
	}

	return {
		c: function create() {
			ul = createElement("ul");
			li = createElement("li");
			a = createElement("a");
			if (!slot_content_prevContent) {
				text = createText(state.prevText);
			}

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			li_1 = createElement("li");
			a_1 = createElement("a");
			if (!slot_content_nextContent) {
				text_2 = createText(state.nextText);
			}
			this.h();
		},

		h: function hydrate() {
			encapsulateStyles$1(ul);
			ul.className = state.containerClass;
			li.className = li_class_value = "" + state.prevClass + " " + (firstPageSelected(state.selected) ? state.disabledClass : '');
			a.className = state.prevLinkClass;
			a.tabIndex = "0";
			addListener(a, "click", click_handler);
			li_1.className = li_1_class_value = "" + state.nextClass + " " + (lastPageSelected(state.selected, state.pageCount) ? state.disabledClass : '');
			a_1.className = state.nextLinkClass;
			a_1.tabIndex = "0";
			addListener(a_1, "click", click_handler_1);
		},

		m: function mount(target, anchor) {
			insertNode(ul, target, anchor);
			appendNode(li, ul);
			appendNode(a, li);
			if (!slot_content_prevContent) {
				appendNode(text, a);
			}

			if (slot_content_prevContent) {
				appendNode(slot_content_prevContent, a);
			}

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			appendNode(li_1, ul);
			appendNode(a_1, li_1);
			if (!slot_content_nextContent) {
				appendNode(text_2, a_1);
			}

			if (slot_content_nextContent) {
				appendNode(slot_content_nextContent, a_1);
			}
		},

		p: function update(changed, state) {
			if (changed.containerClass) {
				ul.className = state.containerClass;
			}

			if ((changed.prevClass || changed.selected || changed.disabledClass) && li_class_value !== (li_class_value = "" + state.prevClass + " " + (firstPageSelected(state.selected) ? state.disabledClass : ''))) {
				li.className = li_class_value;
			}

			if (changed.prevLinkClass) {
				a.className = state.prevLinkClass;
			}

			if (changed.prevText) {
				text.data = state.prevText;
			}

			var pages_1 = state.pages;

			if (changed.pages || changed.pageLinkClass) {
				for (var i = 0; i < pages_1.length; i += 1) {
					if (each_blocks[i]) {
						each_blocks[i].p(changed, state, pages_1, pages_1[i], i);
					} else {
						each_blocks[i] = create_each_block$1(state, pages_1, pages_1[i], i, component);
						each_blocks[i].c();
						each_blocks[i].m(ul, li_1);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
					each_blocks[i].d();
				}
				each_blocks.length = pages_1.length;
			}

			if ((changed.nextClass || changed.selected || changed.pageCount || changed.disabledClass) && li_1_class_value !== (li_1_class_value = "" + state.nextClass + " " + (lastPageSelected(state.selected, state.pageCount) ? state.disabledClass : ''))) {
				li_1.className = li_1_class_value;
			}

			if (changed.nextLinkClass) {
				a_1.className = state.nextLinkClass;
			}

			if (changed.nextText) {
				text_2.data = state.nextText;
			}
		},

		u: function unmount() {
			detachNode(ul);

			if (slot_content_prevContent) {
				reinsertChildren(a, slot_content_prevContent);
			}

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].u();
			}

			if (slot_content_nextContent) {
				reinsertChildren(a_1, slot_content_nextContent);
			}
		},

		d: function destroy$$1() {
			removeListener(a, "click", click_handler);

			destroyEach(each_blocks);

			removeListener(a_1, "click", click_handler_1);
		}
	};
}

// (19:0) {{else}}
function create_if_block_3$1(state, component) {
	var div, a, a_class_value, slot_content_prevContentNoLi = component._slotted.prevContentNoLi, text, text_1, text_2, a_1, a_1_class_value, slot_content_nextContentNoLi = component._slotted.nextContentNoLi, text_3;

	function click_handler_1(event) {
		component.prevPage();
	}

	var pages_1 = state.pages;

	var each_blocks = [];

	for (var i = 0; i < pages_1.length; i += 1) {
		each_blocks[i] = create_each_block_1$1(state, pages_1, pages_1[i], i, component);
	}

	function click_handler_2(event) {
		component.nextPage();
	}

	return {
		c: function create() {
			div = createElement("div");
			a = createElement("a");
			if (!slot_content_prevContentNoLi) {
				text = createText(state.prevText);
			}
			text_1 = createText("\r\n    ");

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			text_2 = createText("\r\n    ");
			a_1 = createElement("a");
			if (!slot_content_nextContentNoLi) {
				text_3 = createText(state.nextText);
			}
			this.h();
		},

		h: function hydrate() {
			encapsulateStyles$1(div);
			div.className = state.containerClass;
			a.className = a_class_value = "" + state.prevLinkClass + " " + (firstPageSelected(state.selected) ? state.disabledClass : '');
			a.tabIndex = "0";
			addListener(a, "click", click_handler_1);
			a_1.className = a_1_class_value = "" + state.nextLinkClass + " " + (lastPageSelected(state.selected, state.pageCount) ? state.disabledClass : '');
			a_1.tabIndex = "0";
			addListener(a_1, "click", click_handler_2);
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(a, div);
			if (!slot_content_prevContentNoLi) {
				appendNode(text, a);
			}

			if (slot_content_prevContentNoLi) {
				appendNode(slot_content_prevContentNoLi, a);
			}

			appendNode(text_1, div);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			appendNode(text_2, div);
			appendNode(a_1, div);
			if (!slot_content_nextContentNoLi) {
				appendNode(text_3, a_1);
			}

			if (slot_content_nextContentNoLi) {
				appendNode(slot_content_nextContentNoLi, a_1);
			}
		},

		p: function update(changed, state) {
			if (changed.containerClass) {
				div.className = state.containerClass;
			}

			if ((changed.prevLinkClass || changed.selected || changed.disabledClass) && a_class_value !== (a_class_value = "" + state.prevLinkClass + " " + (firstPageSelected(state.selected) ? state.disabledClass : ''))) {
				a.className = a_class_value;
			}

			if (changed.prevText) {
				text.data = state.prevText;
			}

			var pages_1 = state.pages;

			if (changed.pages || changed.pageLinkClass || changed.activeClass || changed.disabledClass) {
				for (var i = 0; i < pages_1.length; i += 1) {
					if (each_blocks[i]) {
						each_blocks[i].p(changed, state, pages_1, pages_1[i], i);
					} else {
						each_blocks[i] = create_each_block_1$1(state, pages_1, pages_1[i], i, component);
						each_blocks[i].c();
						each_blocks[i].m(div, text_2);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
					each_blocks[i].d();
				}
				each_blocks.length = pages_1.length;
			}

			if ((changed.nextLinkClass || changed.selected || changed.pageCount || changed.disabledClass) && a_1_class_value !== (a_1_class_value = "" + state.nextLinkClass + " " + (lastPageSelected(state.selected, state.pageCount) ? state.disabledClass : ''))) {
				a_1.className = a_1_class_value;
			}

			if (changed.nextText) {
				text_3.data = state.nextText;
			}
		},

		u: function unmount() {
			detachNode(div);

			if (slot_content_prevContentNoLi) {
				reinsertChildren(a, slot_content_prevContentNoLi);
			}

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].u();
			}

			if (slot_content_nextContentNoLi) {
				reinsertChildren(a_1, slot_content_nextContentNoLi);
			}
		},

		d: function destroy$$1() {
			removeListener(a, "click", click_handler_1);

			destroyEach(each_blocks);

			removeListener(a_1, "click", click_handler_2);
		}
	};
}

function click_handler$1(event) {
	var component = this._svelte.component;
	var pages_1 = this._svelte.pages_1, page_index = this._svelte.page_index, page = pages_1[page_index];
	component.handlePageSelected(page.index);
}

function select_block_type$1(state, pages_1, page, page_index) {
	if (page.disabled) return create_if_block_1$1;
	return create_if_block_2$1;
}

function click_handler_1$1(event) {
	var component = this._svelte.component;
	var pages_1 = this._svelte.pages_1, page_index = this._svelte.page_index, page_1 = pages_1[page_index];
	component.handlePageSelected(page_1.index);
}

function select_block_type_1(state, pages_1, page_1, page_index) {
	if (page_1.disabled) return create_if_block_4$1;
	return create_if_block_5$1;
}

function select_block_type_2(state) {
	if (!state.noLiSurround) return create_if_block$1;
	return create_if_block_3$1;
}

function Paginate(options) {
	init(this, options);
	this._state = assign(data$1(), options.data);
	this._recompute({ selected: 1, pageCount: 1, pageRange: 1, marginPages: 1 }, this._state);

	this._slotted = options.slots || {};

	var _oncreate = oncreate$1.bind(this);

	if (!options._root) {
		this._oncreate = [_oncreate];
	} else {
	 	this._root._oncreate.push(_oncreate);
	 }

	this.slots = {};

	this._fragment = create_main_fragment$1(this._state, this);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		callAll(this._oncreate);
	}
}

assign(Paginate.prototype, methods$1, proto);

Paginate.prototype._recompute = function _recompute(changed, state) {
	if (changed.selected || changed.pageCount || changed.pageRange || changed.marginPages) {
		if (differs(state.pages, (state.pages = pages(state.selected, state.pageCount, state.pageRange, state.marginPages)))) changed.pages = true;
	}
};

/* src\DataTable.html generated by Svelte v1.40.2 */
function dig(obj, selector) {
        var result = obj;
        const splitter = selector.split('.');

        for (let i = 0; i < splitter.length; i++){
            if (result == undefined)
                return undefined;                
            result = result[splitter[i]];
        }

        return result;
    }

    const collect = function(obj, field) {
	if (typeof(field) === 'function')
		return field(obj);
	else if (typeof(field) === 'string')
		return dig(obj, field);
	else
		return undefined;
};

function data() {
	return {
	selectedPage: 1,
	currentPage: 1,
	currentPerPage: 10,
	sortColumn: -1,
	sortType: 'asc',
	searching: false,
	searchInput: '',
            // props
            title: '',
	columns: [],
	rows: [],
	processedRows: [],
	paginated: [],
	clickable:true,
	customButtons: [],
	perPage:  [10, 20, 30, 40, 50],
	perPageOptions: [],
	defaultPerPage: null,
	sortable: true,
	searchable: true,
	exactSearch: false,
	paginate: true,
	exportable: true,
	printable: true,		
};
}

var methods = {
	setPage(reload, currentPage, offset = 0) {
		if (reload) {
			this.set({currentPage: currentPage + offset});
			this.processRows(this.get('rows'));
		}
	},

	nextPage: function(e) {
		e.preventDefault();
		const { processedRows, currentPerPage, currentPage } = this.get();
		this.setPage(processedRows.length > currentPerPage * currentPage, currentPage, 1);
	},

	previousPage: function(e) {
		e.preventDefault();
		const { currentPage } = this.get();
		this.setPage(currentPage > 1, currentPage, -1);
	},

	onTableLength: function(e) {
		const { rows, currentPage } = this.get();
		this.set({currentPerPage: e.target.value});
		this.setPage(true, currentPage);
	},

	sort: function(index) {
		console.log('sort', index);
		let { sortable, sortColumn, sortType, currentPage } = this.get();
		if (!sortable)
			return;
		if (sortColumn === index) {
			sortType = sortType === 'asc' ? 'desc' : 'asc';
		} else {
			sortType = 'asc';
			sortColumn = index;
		}
		this.set({sortType, sortColumn});
		this.setPage(true, currentPage);
	},

	searchData(searchText) {
		this.processRows(this.get('rows'), searchText);
	},

	search: function(e) {
		this.set({searching: !this.get('searching')});
		setTimeout(() => {
			this.refs.searchInput.focus();
		}, 100);
	},

	click: function(row) {
		if(!this.get('clickable')){
			return;
		}

		if(getSelection().toString()){
			// Return if some text is selected instead of firing the row-click event.
			return;
		}
		// this.$emit('row-click', row)
	},

	exportExcel: function() {
		const {title} = this.get();
		const mimeType = 'data:application/vnd.ms-excel';
		const html = this.renderTable().replace(/ /g, '%20');

		const documentPrefix = title != '' ? title.replace(/ /g, '-') : 'Sheet';
		const d = new Date();

		var dummy = document.createElement('a');
		dummy.href = mimeType + ', ' + html;
		dummy.download = documentPrefix
			+ '-' + d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate()
			+ '-' + d.getHours() + '-' + d.getMinutes() + '-' + d.getSeconds()
			+'.xls';
		dummy.click();
	},

	print: function() {
		let win = window.open("");
		win.document.write(this.renderTable());
		win.print();
		win.close();
	},

	renderTable: function() {
		const { currentPage, columns, rows } = this.get();
		let table = '<table><thead>';

		table += '<tr>';
		for (let i = 0; i < columns.length; i++) {
			const column = columns[i];
			table += '<th>';
			table += 	column.label;
			table += '</th>';
		}
		table += '</tr>';
 
		table += '</thead><tbody>';
		
		for (let i = 0; i < rows.length; i++) {
			const row = rows[i];
			table += '<tr>';
			for (let j = 0; j < columns.length; j++) {
				const column = columns[j];
				table += '<td>';
				table +=	collect(row, column.field);
				table += '</td>';
			}
			table += '</tr>';
		}

		table += '</tbody></table>';

		return table;
	},

	paginateRows: function(rows) {
		const { currentPerPage, currentPage, paginate } = this.get();
		let paginatedRows = rows;
		if (paginate)
                    paginatedRows = paginatedRows.slice((currentPage - 1) * currentPerPage, currentPerPage === -1 ? paginatedRows.length + 1 : currentPage * currentPerPage);
		this.set({paginated: paginatedRows});
		console.log('paginatedRows', paginatedRows);
	},

	processRows: function(rows, searchText) {
		let computedRows = rows;				
		const { currentPage, columns,
			sortable, sortColumn, sortType, 
			searching, searchInput, exactSearch } = this.get();
		if (!searchText) {
			searchText = searchInput;
		}	
		if (sortable !== false && sortColumn > -1 && columns)
			computedRows = computedRows.sort((x,y) => {
				if (!columns[sortColumn])
					return 0;

				const cook = (x) => {
					x = collect(x, columns[sortColumn].field);
					if (typeof(x) === 'string') {
						x = x.toLowerCase();
					 	if (columns[sortColumn].numeric)
							x = x.indexOf('.') >= 0 ? parseFloat(x) : parseInt(x);
					}
					return x;
				};

				x = cook(x);
				y = cook(y);

				return (x < y ? -1 : (x > y ? 1 : 0)) * (sortType === 'desc' ? -1 : 1);
			});

		if (searching && searchText) {
			const searchConfig = { keys: columns.map(c => c.field) };

			// Enable searching of numbers (non-string)
			// Temporary fix of https://github.com/krisk/Fuse/issues/144
		    	searchConfig.getFn = function (obj, path) {
				if(Number.isInteger(obj[path]))
				return JSON.stringify(obj[path]);
			    	return obj[path];
			};

			if (exactSearch) {
				//return only exact matches
				searchConfig.threshold = 0,
				searchConfig.distance = 0;
			}

			computedRows = (new Fuse(computedRows, searchConfig)).search(searchText);
		}

		this.set({processedRows: computedRows});
		this.paginateRows(computedRows);
	},

	setPerPageOptions() {
		let { currentPerPage, defaultPerPage, perPage } = this.get();
		let options = perPage;

		// Force numbers
		options = options.map( v => parseInt(v));
		
		// Set current page to first value
		currentPerPage = options[0];

		// Sort options
		options.sort((a,b) => a - b);

		// And add "All"
		options.push(-1);

		// If defaultPerPage is provided and it's a valid option, set as current per page
		if (options.indexOf(defaultPerPage) > -1) {
			currentPerPage = parseInt(defaultPerPage);
		}

		console.log('currentPerPage', currentPerPage, options);
		this.set({currentPerPage, perPageOptions: options});
	},
};

function oncreate() {
	this.observe('rows', rows => {
		this.processRows(rows);
	});
	this.observe('selectedPage', selected => {
		this.setPage(true, selected + 1);
            });
	this.observe('searchInput', searchInput => {
		this.searchData(searchInput);
	});				
	this.setPerPageOptions();
}

function encapsulateStyles(node) {
	setAttribute(node, "svelte-3531723352", "");
}

function create_main_fragment(state, component) {
	var div, div_1, span, text, text_1, div_2, text_2, text_3, text_4, text_7, text_8, table, thead, tr, text_11, tbody, text_14;

	var customButtons = state.customButtons;

	var each_blocks = [];

	for (var i = 0; i < customButtons.length; i += 1) {
		each_blocks[i] = create_each_block(state, customButtons, customButtons[i], i, component);
	}

	var if_block = (state.printable) && create_if_block_1(state, component);

	var if_block_1 = (state.exportable) && create_if_block_2(state, component);

	var if_block_2 = (state.searchable) && create_if_block_3(state, component);

	var if_block_3 = (state.searching) && create_if_block_4(state, component);

	var columns = state.columns;

	var each_1_blocks = [];

	for (var i = 0; i < columns.length; i += 1) {
		each_1_blocks[i] = create_each_block_1(state, columns, columns[i], i, component);
	}

	var paginated = state.paginated;

	var each_2_blocks = [];

	for (var i = 0; i < paginated.length; i += 1) {
		each_2_blocks[i] = create_each_block_2(state, paginated, paginated[i], i, component);
	}

	var if_block_4 = (state.paginate) && create_if_block_7(state, component);

	return {
		c: function create() {
			div = createElement("div");
			div_1 = createElement("div");
			span = createElement("span");
			text = createText(state.title);
			text_1 = createText("\n\t\t");
			div_2 = createElement("div");

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			text_2 = createText("\n\t\t\t");
			if (if_block) if_block.c();
			text_3 = createText("\n\t\t\t");
			if (if_block_1) if_block_1.c();
			text_4 = createText("\n\t\t\t");
			if (if_block_2) if_block_2.c();
			text_7 = createText("\n\t");
			if (if_block_3) if_block_3.c();
			text_8 = createText("\n\n    ");
			table = createElement("table");
			thead = createElement("thead");
			tr = createElement("tr");

			for (var i = 0; i < each_1_blocks.length; i += 1) {
				each_1_blocks[i].c();
			}

			text_11 = createText("\n\n        ");
			tbody = createElement("tbody");

			for (var i = 0; i < each_2_blocks.length; i += 1) {
				each_2_blocks[i].c();
			}

			text_14 = createText("\n");
			if (if_block_4) if_block_4.c();
			this.h();
		},

		h: function hydrate() {
			encapsulateStyles(div);
			div.className = "material-table";
			div_1.className = "table-header";
			span.className = "table-title";
			div_2.className = "actions";
			setAttribute(table, "ref", "table");
			table.className = "table table-striped table-hover";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(div_1, div);
			appendNode(span, div_1);
			appendNode(text, span);
			appendNode(text_1, div_1);
			appendNode(div_2, div_1);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div_2, null);
			}

			appendNode(text_2, div_2);
			if (if_block) if_block.m(div_2, null);
			appendNode(text_3, div_2);
			if (if_block_1) if_block_1.m(div_2, null);
			appendNode(text_4, div_2);
			if (if_block_2) if_block_2.m(div_2, null);
			appendNode(text_7, div);
			if (if_block_3) if_block_3.m(div, null);
			appendNode(text_8, div);
			appendNode(table, div);
			appendNode(thead, table);
			appendNode(tr, thead);

			for (var i = 0; i < each_1_blocks.length; i += 1) {
				each_1_blocks[i].m(tr, null);
			}

			appendNode(text_11, table);
			appendNode(tbody, table);

			for (var i = 0; i < each_2_blocks.length; i += 1) {
				each_2_blocks[i].m(tbody, null);
			}

			appendNode(text_14, div);
			if (if_block_4) if_block_4.m(div, null);
		},

		p: function update(changed, state) {
			if (changed.title) {
				text.data = state.title;
			}

			var customButtons = state.customButtons;

			if (changed.customButtons) {
				for (var i = 0; i < customButtons.length; i += 1) {
					if (each_blocks[i]) {
						each_blocks[i].p(changed, state, customButtons, customButtons[i], i);
					} else {
						each_blocks[i] = create_each_block(state, customButtons, customButtons[i], i, component);
						each_blocks[i].c();
						each_blocks[i].m(div_2, text_2);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
					each_blocks[i].d();
				}
				each_blocks.length = customButtons.length;
			}

			if (state.printable) {
				if (!if_block) {
					if_block = create_if_block_1(state, component);
					if_block.c();
					if_block.m(div_2, text_3);
				}
			} else if (if_block) {
				if_block.u();
				if_block.d();
				if_block = null;
			}

			if (state.exportable) {
				if (!if_block_1) {
					if_block_1 = create_if_block_2(state, component);
					if_block_1.c();
					if_block_1.m(div_2, text_4);
				}
			} else if (if_block_1) {
				if_block_1.u();
				if_block_1.d();
				if_block_1 = null;
			}

			if (state.searchable) {
				if (!if_block_2) {
					if_block_2 = create_if_block_3(state, component);
					if_block_2.c();
					if_block_2.m(div_2, null);
				}
			} else if (if_block_2) {
				if_block_2.u();
				if_block_2.d();
				if_block_2 = null;
			}

			if (state.searching) {
				if (if_block_3) {
					if_block_3.p(changed, state);
				} else {
					if_block_3 = create_if_block_4(state, component);
					if_block_3.c();
					if_block_3.m(div, text_8);
				}
			} else if (if_block_3) {
				if_block_3.u();
				if_block_3.d();
				if_block_3 = null;
			}

			var columns = state.columns;

			if (changed.sortable || changed.sortColumn || changed.sortType || changed.columns) {
				for (var i = 0; i < columns.length; i += 1) {
					if (each_1_blocks[i]) {
						each_1_blocks[i].p(changed, state, columns, columns[i], i);
					} else {
						each_1_blocks[i] = create_each_block_1(state, columns, columns[i], i, component);
						each_1_blocks[i].c();
						each_1_blocks[i].m(tr, null);
					}
				}

				for (; i < each_1_blocks.length; i += 1) {
					each_1_blocks[i].u();
					each_1_blocks[i].d();
				}
				each_1_blocks.length = columns.length;
			}

			var paginated = state.paginated;

			if (changed.clickable || changed.paginated || changed.columns) {
				for (var i = 0; i < paginated.length; i += 1) {
					if (each_2_blocks[i]) {
						each_2_blocks[i].p(changed, state, paginated, paginated[i], i);
					} else {
						each_2_blocks[i] = create_each_block_2(state, paginated, paginated[i], i, component);
						each_2_blocks[i].c();
						each_2_blocks[i].m(tbody, null);
					}
				}

				for (; i < each_2_blocks.length; i += 1) {
					each_2_blocks[i].u();
					each_2_blocks[i].d();
				}
				each_2_blocks.length = paginated.length;
			}

			if (state.paginate) {
				if (if_block_4) {
					if_block_4.p(changed, state);
				} else {
					if_block_4 = create_if_block_7(state, component);
					if_block_4.c();
					if_block_4.m(div, null);
				}
			} else if (if_block_4) {
				if_block_4.u();
				if_block_4.d();
				if_block_4 = null;
			}
		},

		u: function unmount() {
			detachNode(div);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].u();
			}

			if (if_block) if_block.u();
			if (if_block_1) if_block_1.u();
			if (if_block_2) if_block_2.u();
			if (if_block_3) if_block_3.u();

			for (var i = 0; i < each_1_blocks.length; i += 1) {
				each_1_blocks[i].u();
			}

			for (var i = 0; i < each_2_blocks.length; i += 1) {
				each_2_blocks[i].u();
			}

			if (if_block_4) if_block_4.u();
		},

		d: function destroy$$1() {
			destroyEach(each_blocks);

			if (if_block) if_block.d();
			if (if_block_1) if_block_1.d();
			if (if_block_2) if_block_2.d();
			if (if_block_3) if_block_3.d();

			destroyEach(each_1_blocks);

			destroyEach(each_2_blocks);

			if (if_block_4) if_block_4.d();
		}
	};
}

// (6:3) {{#each customButtons as button, x}}
function create_each_block(state, customButtons, button, x, component) {
	var if_block_anchor;

	var if_block = (!button.hide) && create_if_block(state, customButtons, button, x, component);

	return {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = createComment();
		},

		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insertNode(if_block_anchor, target, anchor);
		},

		p: function update(changed, state, customButtons, button, x) {
			if (!button.hide) {
				if (if_block) {
					if_block.p(changed, state, customButtons, button, x);
				} else {
					if_block = create_if_block(state, customButtons, button, x, component);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.u();
				if_block.d();
				if_block = null;
			}
		},

		u: function unmount() {
			if (if_block) if_block.u();
			detachNode(if_block_anchor);
		},

		d: function destroy$$1() {
			if (if_block) if_block.d();
		}
	};
}

// (7:3) {{#if !button.hide}}
function create_if_block(state, customButtons, button, x, component) {
	var a, i, text_value = button.icon, text;

	return {
		c: function create() {
			a = createElement("a");
			i = createElement("i");
			text = createText(text_value);
			this.h();
		},

		h: function hydrate() {
			a.href = "javascript:undefined";
			a.className = "waves-effect btn-flat nopadding";
			addListener(a, "click", click_handler);
			i.className = "material-icons";
		},

		m: function mount(target, anchor) {
			insertNode(a, target, anchor);
			appendNode(i, a);
			appendNode(text, i);
		},

		p: function update(changed, state, customButtons, button, x) {
			if ((changed.customButtons) && text_value !== (text_value = button.icon)) {
				text.data = text_value;
			}
		},

		u: function unmount() {
			detachNode(a);
		},

		d: function destroy$$1() {
			removeListener(a, "click", click_handler);
		}
	};
}

// (15:3) {{#if printable}}
function create_if_block_1(state, component) {
	var a;

	function click_handler_1(event) {
		component.print();
	}

	return {
		c: function create() {
			a = createElement("a");
			a.innerHTML = "<i class=\"material-icons\">print</i>";
			this.h();
		},

		h: function hydrate() {
			a.href = "javascript:undefined";
			a.className = "waves-effect btn-flat nopadding";
			addListener(a, "click", click_handler_1);
		},

		m: function mount(target, anchor) {
			insertNode(a, target, anchor);
		},

		u: function unmount() {
			detachNode(a);
		},

		d: function destroy$$1() {
			removeListener(a, "click", click_handler_1);
		}
	};
}

// (22:3) {{#if exportable}}
function create_if_block_2(state, component) {
	var a;

	function click_handler_1(event) {
		component.exportExcel();
	}

	return {
		c: function create() {
			a = createElement("a");
			a.innerHTML = "<i class=\"material-icons\">description</i>";
			this.h();
		},

		h: function hydrate() {
			a.href = "javascript:undefined";
			a.className = "waves-effect btn-flat nopadding";
			setAttribute(a, "v-if", "this.exportable");
			addListener(a, "click", click_handler_1);
		},

		m: function mount(target, anchor) {
			insertNode(a, target, anchor);
		},

		u: function unmount() {
			detachNode(a);
		},

		d: function destroy$$1() {
			removeListener(a, "click", click_handler_1);
		}
	};
}

// (30:3) {{#if searchable}}
function create_if_block_3(state, component) {
	var a;

	function click_handler_1(event) {
		component.search();
	}

	return {
		c: function create() {
			a = createElement("a");
			a.innerHTML = "<i class=\"material-icons\">search</i>";
			this.h();
		},

		h: function hydrate() {
			a.href = "javascript:undefined";
			a.className = "waves-effect btn-flat nopadding";
			addListener(a, "click", click_handler_1);
		},

		m: function mount(target, anchor) {
			insertNode(a, target, anchor);
		},

		u: function unmount() {
			detachNode(a);
		},

		d: function destroy$$1() {
			removeListener(a, "click", click_handler_1);
		}
	};
}

// (39:1) {{#if searching}}
function create_if_block_4(state, component) {
	var div, div_1, label, input, input_updating = false;

	function input_input_handler() {
		input_updating = true;
		component.set({ searchInput: input.value });
		input_updating = false;
	}

	return {
		c: function create() {
			div = createElement("div");
			div_1 = createElement("div");
			label = createElement("label");
			input = createElement("input");
			this.h();
		},

		h: function hydrate() {
			div_1.id = "search-input-container";
			input.type = "search";
			input.id = "search-input";
			input.className = "form-control";
			input.placeholder = "Search data";
			addListener(input, "input", input_input_handler);
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(div_1, div);
			appendNode(label, div_1);
			appendNode(input, label);
			component.refs.searchInput = input;

			input.value = state.searchInput;
		},

		p: function update(changed, state) {
			if (!input_updating) {
				input.value = state.searchInput;
			}
		},

		u: function unmount() {
			detachNode(div);
		},

		d: function destroy$$1() {
			removeListener(input, "input", input_input_handler);
			if (component.refs.searchInput === input) component.refs.searchInput = null;
		}
	};
}

// (54:16) {{#each columns as column, x}}
function create_each_block_1(state, columns, column, x, component) {
	var th, th_class_value, text_value = column.label, text;

	return {
		c: function create() {
			th = createElement("th");
			text = createText(text_value);
			this.h();
		},

		h: function hydrate() {
			th.className = th_class_value = "" + (state.sortable ? 'sorting ' : '') + "\n                        " + (state.sortColumn === x ?
                            (state.sortType === 'desc' ? 'sorting-desc' : 'sorting-asc')
                            : '') + "\n                        " + (column.numeric ? ' numeric' : '');
			setStyle(th, "width", ( column.width ? column.width : 'auto' ));
			addListener(th, "click", click_handler_1);

			th._svelte = {
				component: component,
				columns: columns,
				x: x
			};
		},

		m: function mount(target, anchor) {
			insertNode(th, target, anchor);
			appendNode(text, th);
		},

		p: function update(changed, state, columns, column, x) {
			if ((changed.sortable || changed.sortColumn || changed.sortType || changed.columns) && th_class_value !== (th_class_value = "" + (state.sortable ? 'sorting ' : '') + "\n                        " + (state.sortColumn === x ?
                            (state.sortType === 'desc' ? 'sorting-desc' : 'sorting-asc')
                            : '') + "\n                        " + (column.numeric ? ' numeric' : ''))) {
				th.className = th_class_value;
			}

			if (changed.columns) {
				setStyle(th, "width", ( column.width ? column.width : 'auto' ));
			}

			th._svelte.columns = columns;
			th._svelte.x = x;

			if ((changed.columns) && text_value !== (text_value = column.label)) {
				text.data = text_value;
			}
		},

		u: function unmount() {
			detachNode(th);
		},

		d: function destroy$$1() {
			removeListener(th, "click", click_handler_1);
		}
	};
}

// (69:12) {{#each paginated as row, y}}
function create_each_block_2(state, paginated, row, y, component) {
	var tr, tr_class_value;

	var columns = state.columns;

	var each_blocks = [];

	for (var i = 0; i < columns.length; i += 1) {
		each_blocks[i] = create_each_block_3(state, paginated, row, y, columns, columns[i], i, component);
	}

	return {
		c: function create() {
			tr = createElement("tr");

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}
			this.h();
		},

		h: function hydrate() {
			tr.className = tr_class_value = state.clickable ? 'clickable' : '';
			addListener(tr, "click", click_handler_2);

			tr._svelte = {
				component: component,
				paginated: paginated,
				y: y
			};
		},

		m: function mount(target, anchor) {
			insertNode(tr, target, anchor);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(tr, null);
			}
		},

		p: function update(changed, state, paginated, row, y) {
			if ((changed.clickable) && tr_class_value !== (tr_class_value = state.clickable ? 'clickable' : '')) {
				tr.className = tr_class_value;
			}

			tr._svelte.paginated = paginated;
			tr._svelte.y = y;

			var columns = state.columns;

			if (changed.columns || changed.paginated) {
				for (var i = 0; i < columns.length; i += 1) {
					if (each_blocks[i]) {
						each_blocks[i].p(changed, state, paginated, row, y, columns, columns[i], i);
					} else {
						each_blocks[i] = create_each_block_3(state, paginated, row, y, columns, columns[i], i, component);
						each_blocks[i].c();
						each_blocks[i].m(tr, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
					each_blocks[i].d();
				}
				each_blocks.length = columns.length;
			}
		},

		u: function unmount() {
			detachNode(tr);

			for (var i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].u();
			}
		},

		d: function destroy$$1() {
			removeListener(tr, "click", click_handler_2);

			destroyEach(each_blocks);
		}
	};
}

// (71:20) {{#each columns as column, x}}
function create_each_block_3(state, paginated, row, y, columns, column_1, x, component) {
	var td;

	var current_block_type = select_block_type(state, paginated, row, y, columns, column_1, x);
	var if_block = current_block_type(state, paginated, row, y, columns, column_1, x, component);

	return {
		c: function create() {
			td = createElement("td");
			if_block.c();
		},

		m: function mount(target, anchor) {
			insertNode(td, target, anchor);
			if_block.m(td, null);
		},

		p: function update(changed, state, paginated, row, y, columns, column_1, x) {
			if (current_block_type === (current_block_type = select_block_type(state, paginated, row, y, columns, column_1, x)) && if_block) {
				if_block.p(changed, state, paginated, row, y, columns, column_1, x);
			} else {
				if_block.u();
				if_block.d();
				if_block = current_block_type(state, paginated, row, y, columns, column_1, x, component);
				if_block.c();
				if_block.m(td, null);
			}
		},

		u: function unmount() {
			detachNode(td);
			if_block.u();
		},

		d: function destroy$$1() {
			if_block.d();
		}
	};
}

// (73:28) {{#if column.html}}
function create_if_block_5(state, paginated, row, y, columns, column_1, x, component) {
	var raw_value = collect(row, column_1.field), raw_before, raw_after;

	return {
		c: function create() {
			raw_before = createElement('noscript');
			raw_after = createElement('noscript');
		},

		m: function mount(target, anchor) {
			insertNode(raw_before, target, anchor);
			raw_before.insertAdjacentHTML("afterend", raw_value);
			insertNode(raw_after, target, anchor);
		},

		p: function update(changed, state, paginated, row, y, columns, column_1, x) {
			if ((changed.paginated || changed.columns) && raw_value !== (raw_value = collect(row, column_1.field))) {
				detachBetween(raw_before, raw_after);
				raw_before.insertAdjacentHTML("afterend", raw_value);
			}
		},

		u: function unmount() {
			detachBetween(raw_before, raw_after);

			detachNode(raw_before);
			detachNode(raw_after);
		},

		d: noop
	};
}

// (75:28) {{else}}
function create_if_block_6(state, paginated, row, y, columns, column_1, x, component) {
	var text_value = collect(row, column_1.field), text;

	return {
		c: function create() {
			text = createText(text_value);
		},

		m: function mount(target, anchor) {
			insertNode(text, target, anchor);
		},

		p: function update(changed, state, paginated, row, y, columns, column_1, x) {
			if ((changed.paginated || changed.columns) && text_value !== (text_value = collect(row, column_1.field))) {
				text.data = text_value;
			}
		},

		u: function unmount() {
			detachNode(text);
		},

		d: noop
	};
}

// (90:5) {{#each perPageOptions as option, x}}
function create_each_block_4(state, perPageOptions, option, x, component) {
	var option_1, option_1_value_value, option_1_selected_value, text_value = option === -1 ? 'All' : option, text;

	return {
		c: function create() {
			option_1 = createElement("option");
			text = createText(text_value);
			this.h();
		},

		h: function hydrate() {
			option_1.__value = option_1_value_value = option;
			option_1.value = option_1.__value;
			option_1.selected = option_1_selected_value = option == state.currentPerPage;
		},

		m: function mount(target, anchor) {
			insertNode(option_1, target, anchor);
			appendNode(text, option_1);
		},

		p: function update(changed, state, perPageOptions, option, x) {
			if ((changed.perPageOptions) && option_1_value_value !== (option_1_value_value = option)) {
				option_1.__value = option_1_value_value;
			}

			option_1.value = option_1.__value;
			if ((changed.perPageOptions || changed.currentPerPage) && option_1_selected_value !== (option_1_selected_value = option == state.currentPerPage)) {
				option_1.selected = option_1_selected_value;
			}

			if ((changed.perPageOptions) && text_value !== (text_value = option === -1 ? 'All' : option)) {
				text.data = text_value;
			}
		},

		u: function unmount() {
			detachNode(option_1);
		},

		d: noop
	};
}

// (84:0) {{#if paginate}}
function create_if_block_7(state, component) {
	var div, div_1, label, span, text_1, select, text_4, div_2, text_5_value = (state.currentPage - 1) * state.currentPerPage ? (state.currentPage - 1) * state.currentPerPage : 1, text_5, text_6, text_7_value = ('Math' in state ? state.Math : Math).min(state.processedRows.length, state.currentPerPage * state.currentPage), text_7, text_8, text_9_value = state.processedRows.length, text_9, text_11, div_3, i, text_12, text_13, i_1, text_14, paginate_updating = {};

	var perPageOptions = state.perPageOptions;

	var each_blocks = [];

	for (var i_2 = 0; i_2 < perPageOptions.length; i_2 += 1) {
		each_blocks[i_2] = create_each_block_4(state, perPageOptions, perPageOptions[i_2], i_2, component);
	}

	function change_handler(event) {
		component.onTableLength((event));
	}

	var paginate_initial_data = {
		pageCount: ('Math' in state ? state.Math : Math).ceil(state.rows.length / state.currentPerPage),
		marginPages: 2,
		pageRange: 4,
		containerClass: "material-pagination",
		pageLinkClass: "waves-effect btn-flat",
		prevLinkClass: "waves-effect btn-flat nopadding",
		nextLinkClass: "waves-effect btn-flat nopadding"
	};
	if ('selectedPage' in state) {
		paginate_initial_data.selected = state.selectedPage;
		paginate_updating.selected = true;
	}
	var paginate = new Paginate({
		_root: component._root,
		slots: { default: createFragment(), prevContent: createFragment(), nextContent: createFragment() },
		data: paginate_initial_data,
		_bind: function(changed, childState) {
			var state = component.get(), newState = {};
			if (!paginate_updating.selected && changed.selected) {
				newState.selectedPage = childState.selected;
			}
			paginate_updating = assign({}, changed);
			component._set(newState);
			paginate_updating = {};
		}
	});

	component._root._beforecreate.push(function () {
		var state = component.get(), childState = paginate.get(), newState = {};
		if (!childState) return;
		if (!paginate_updating.selected) {
			newState.selectedPage = childState.selected;
		}
		paginate_updating = { selected: true };
		component._set(newState);
		paginate_updating = {};
	});

	var paginate_context = {
		state: state
	};

	return {
		c: function create() {
			div = createElement("div");
			div_1 = createElement("div");
			label = createElement("label");
			span = createElement("span");
			span.textContent = "Rows per page:";
			text_1 = createText("\n\t\t\t\t");
			select = createElement("select");

			for (var i_2 = 0; i_2 < each_blocks.length; i_2 += 1) {
				each_blocks[i_2].c();
			}

			text_4 = createText("\n\t\t");
			div_2 = createElement("div");
			text_5 = createText(text_5_value);
			text_6 = createText("\n\t\t\t\t-");
			text_7 = createText(text_7_value);
			text_8 = createText(" of ");
			text_9 = createText(text_9_value);
			text_11 = createText("\n\t\t");
			div_3 = createElement("div");
			i = createElement("i");
			text_12 = createText("chevron_left");
			text_13 = createText("\n\t\t\t\t");
			i_1 = createElement("i");
			text_14 = createText("chevron_right");
			paginate._fragment.c();
			this.h();
		},

		h: function hydrate() {
			div.className = "table-footer";
			div_1.className = "datatable-length";
			select.className = "browser-default";
			addListener(select, "change", change_handler);
			div_2.className = "datatable-info";
			i.className = "material-icons";
			setAttribute(i, "slot", "prevContent");
			i_1.className = "material-icons";
			setAttribute(i_1, "slot", "nextContent");
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(div_1, div);
			appendNode(label, div_1);
			appendNode(span, label);
			appendNode(text_1, label);
			appendNode(select, label);

			for (var i_2 = 0; i_2 < each_blocks.length; i_2 += 1) {
				each_blocks[i_2].m(select, null);
			}

			appendNode(text_4, div);
			appendNode(div_2, div);
			appendNode(text_5, div_2);
			appendNode(text_6, div_2);
			appendNode(text_7, div_2);
			appendNode(text_8, div_2);
			appendNode(text_9, div_2);
			appendNode(text_11, div);
			appendNode(div_3, div);
			appendNode(i, paginate._slotted.prevContent);
			appendNode(text_12, i);
			appendNode(text_13, paginate._slotted.default);
			appendNode(i_1, paginate._slotted.nextContent);
			appendNode(text_14, i_1);
			paginate._mount(div_3, null);
		},

		p: function update(changed, state) {
			var perPageOptions = state.perPageOptions;

			if (changed.perPageOptions || changed.currentPerPage) {
				for (var i_2 = 0; i_2 < perPageOptions.length; i_2 += 1) {
					if (each_blocks[i_2]) {
						each_blocks[i_2].p(changed, state, perPageOptions, perPageOptions[i_2], i_2);
					} else {
						each_blocks[i_2] = create_each_block_4(state, perPageOptions, perPageOptions[i_2], i_2, component);
						each_blocks[i_2].c();
						each_blocks[i_2].m(select, null);
					}
				}

				for (; i_2 < each_blocks.length; i_2 += 1) {
					each_blocks[i_2].u();
					each_blocks[i_2].d();
				}
				each_blocks.length = perPageOptions.length;
			}

			if ((changed.currentPage || changed.currentPerPage) && text_5_value !== (text_5_value = (state.currentPage - 1) * state.currentPerPage ? (state.currentPage - 1) * state.currentPerPage : 1)) {
				text_5.data = text_5_value;
			}

			if ((changed.Math || changed.processedRows || changed.currentPerPage || changed.currentPage) && text_7_value !== (text_7_value = ('Math' in state ? state.Math : Math).min(state.processedRows.length, state.currentPerPage * state.currentPage))) {
				text_7.data = text_7_value;
			}

			if ((changed.processedRows) && text_9_value !== (text_9_value = state.processedRows.length)) {
				text_9.data = text_9_value;
			}

			var paginate_changes = {};
			if (changed.Math || changed.rows || changed.currentPerPage) paginate_changes.pageCount = ('Math' in state ? state.Math : Math).ceil(state.rows.length / state.currentPerPage);
			if (!paginate_updating.selected && changed.selectedPage) {
				paginate_changes.selected = state.selectedPage;
				paginate_updating.selected = true;
			}
			paginate._set( paginate_changes );
			paginate_updating = {};

			paginate_context.state = state;
		},

		u: function unmount() {
			detachNode(div);

			for (var i_2 = 0; i_2 < each_blocks.length; i_2 += 1) {
				each_blocks[i_2].u();
			}
		},

		d: function destroy$$1() {
			destroyEach(each_blocks);

			removeListener(select, "change", change_handler);
			paginate.destroy(false);
		}
	};
}

function click_handler(event) {
	this.click();
}

function click_handler_1(event) {
	var component = this._svelte.component;
	var columns = this._svelte.columns, x = this._svelte.x, column = columns[x];
	component.sort(x);
}

function click_handler_2(event) {
	var component = this._svelte.component;
	var paginated = this._svelte.paginated, y = this._svelte.y, row = paginated[y];
	component.click(row);
}

function select_block_type(state, paginated, row, y, columns, column_1, x) {
	if (column_1.html) return create_if_block_5;
	return create_if_block_6;
}

function DataTable(options) {
	init(this, options);
	this.refs = {};
	this._state = assign(data(), options.data);

	var _oncreate = oncreate.bind(this);

	if (!options._root) {
		this._oncreate = [_oncreate];
		this._beforecreate = [];
		this._aftercreate = [];
	} else {
	 	this._root._oncreate.push(_oncreate);
	 }

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		this._lock = true;
		callAll(this._beforecreate);
		callAll(this._oncreate);
		callAll(this._aftercreate);
		this._lock = false;
	}
}

assign(DataTable.prototype, methods, proto);

exports.DataTable = DataTable;

}((this.app = this.app || {})));

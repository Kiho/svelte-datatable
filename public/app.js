(function (exports) {
'use strict';

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

});

var Fuse = unwrapExports(fuse);

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

// TODO this is out of date
function destroyEach(iterations, detach, start) {
	for (var i = start; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].destroy(detach);
	}
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

function differs(a, b) {
	return a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

function dispatchObservers(component, group, newState, oldState) {
	for (var key in group) {
		if (!(key in newState)) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		if (differs(newValue, oldValue)) {
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
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function fire(eventName, data) {
	var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
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
	callAll(this._root._oncreate);
}

function callAll(fns) {
	while (fns && fns.length) fns.pop()();
}

var proto = {
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set
};

function recompute ( state, newState, oldState, isInitial ) {
	if ( isInitial || ( 'selected' in newState && differs( state.selected, oldState.selected ) ) || ( 'pageCount' in newState && differs( state.pageCount, oldState.pageCount ) ) || ( 'pageRange' in newState && differs( state.pageRange, oldState.pageRange ) ) || ( 'marginPages' in newState && differs( state.marginPages, oldState.marginPages ) ) ) {
		state.pages = newState.pages = template$1.computed.pages( state.selected, state.pageCount, state.pageRange, state.marginPages );
	}
}

var template$1 = (function () {

const splitObject = o => Object.keys(o).map(e => (o[e]));  

return {
    data: () => ({
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
        noLiSurround: false,
        // pages: []
    }),
    oncreate: function() {
        this.observe('forcePage', forcePage => {
            if (forcePage !== this.get('selected')) {
                this.set({selected: forcePage});
            }
        });       
    },
    computed: {
        pages: (selected, pageCount, pageRange, marginPages) => {
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
    },
    methods: {
        handlePageSelected(selectedIndex) {
            let {selected, clickHandler} = this.get();
            if (selected === selectedIndex) return;
                
            this.set({selected: selected = selectedIndex});
            clickHandler(selected + 1);
        },
        prevPage() {
            let {selected, clickHandler} = this.get();
            if (selected <= 0) return;
    
            this.set({selected: selected--});
            clickHandler(selected + 1);
        },
        nextPage() {
            let {selected, pageCount, clickHandler} = this.get();
            if (selected >= pageCount - 1) return;
    
            this.set({selected: selected++});
            clickHandler(selected + 1);
        }
    },
    helpers: {
        lastPageSelected(selected, pageCount) {
            return (selected === pageCount - 1) || (pageCount === 0);
        },  
        firstPageSelected(selected) {
            return selected === 0;
        },
    }
}
}());

function create_main_fragment$1 ( state, component ) {
	var if_block_anchor;

	function get_block ( state ) {
		if ( !state.noLiSurround ) return create_if_block$1;
		return create_if_block_3$1;
	}

	var current_block = get_block( state );
	var if_block = current_block( state, component );

	return {
		create: function () {
			if_block.create();
			if_block_anchor = createComment();
		},

		mount: function ( target, anchor ) {
			if_block.mount( target, anchor );
			insertNode( if_block_anchor, target, anchor );
		},

		update: function ( changed, state ) {
			if ( current_block === ( current_block = get_block( state ) ) && if_block ) {
				if_block.update( changed, state );
			} else {
				if_block.unmount();
				if_block.destroy();
				if_block = current_block( state, component );
				if_block.create();
				if_block.mount( if_block_anchor.parentNode, if_block_anchor );
			}
		},

		unmount: function () {
			if_block.unmount();
			detachNode( if_block_anchor );
		},

		destroy: function () {
			if_block.destroy();
		}
	};
}

function create_each_block$1 ( state, each_block_value, page, page_index, component ) {
	var li;

	function get_block ( state, each_block_value, page, page_index ) {
		if ( page.disabled ) return create_if_block_1$1;
		return create_if_block_2$1;
	}

	var current_block = get_block( state, each_block_value, page, page_index );
	var if_block_1 = current_block( state, each_block_value, page, page_index, component );

	return {
		create: function () {
			li = createElement( 'li' );
			if_block_1.create();
		},

		mount: function ( target, anchor ) {
			insertNode( li, target, anchor );
			if_block_1.mount( li, null );
		},

		update: function ( changed, state, each_block_value, page, page_index ) {
			if ( current_block === ( current_block = get_block( state, each_block_value, page, page_index ) ) && if_block_1 ) {
				if_block_1.update( changed, state, each_block_value, page, page_index );
			} else {
				if_block_1.unmount();
				if_block_1.destroy();
				if_block_1 = current_block( state, each_block_value, page, page_index, component );
				if_block_1.create();
				if_block_1.mount( li, null );
			}
		},

		unmount: function () {
			detachNode( li );
			if_block_1.unmount();
		},

		destroy: function () {
			if_block_1.destroy();
		}
	};
}

function create_if_block_1$1 ( state, each_block_value, page, page_index, component ) {
	var a, text_value, text;

	return {
		create: function () {
			a = createElement( 'a' );
			text = createText( text_value = page.content );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			a.className = "pageLinkClass";
			a.tabIndex = "0";
		},

		mount: function ( target, anchor ) {
			insertNode( a, target, anchor );
			appendNode( text, a );
		},

		update: function ( changed, state, each_block_value, page, page_index ) {
			if ( text_value !== ( text_value = page.content ) ) {
				text.data = text_value;
			}
		},

		unmount: function () {
			detachNode( a );
		},

		destroy: noop
	};
}

function create_if_block_2$1 ( state, each_block_value, page, page_index, component ) {
	var a, text_value, text;

	return {
		create: function () {
			a = createElement( 'a' );
			text = createText( text_value = page.content );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			a.className = "pageLinkClass";
			a.tabIndex = "0";
			addListener( a, 'click', click_handler$1 );

			a._svelte = {
				component: component,
				each_block_value: each_block_value,
				page_index: page_index
			};
		},

		mount: function ( target, anchor ) {
			insertNode( a, target, anchor );
			appendNode( text, a );
		},

		update: function ( changed, state, each_block_value, page, page_index ) {
			a._svelte.each_block_value = each_block_value;
			a._svelte.page_index = page_index;

			if ( text_value !== ( text_value = page.content ) ) {
				text.data = text_value;
			}
		},

		unmount: function () {
			detachNode( a );
		},

		destroy: function () {
			removeListener( a, 'click', click_handler$1 );
		}
	};
}

function create_each_block_1$1 ( state, each_block_value, page_1, page_index, component ) {
	var if_block_2_anchor;

	function get_block ( state, each_block_value, page_1, page_index ) {
		if ( page_1.disabled ) return create_if_block_4$1;
		return create_if_block_5$1;
	}

	var current_block = get_block( state, each_block_value, page_1, page_index );
	var if_block_2 = current_block( state, each_block_value, page_1, page_index, component );

	return {
		create: function () {
			if_block_2.create();
			if_block_2_anchor = createComment();
		},

		mount: function ( target, anchor ) {
			if_block_2.mount( target, anchor );
			insertNode( if_block_2_anchor, target, anchor );
		},

		update: function ( changed, state, each_block_value, page_1, page_index ) {
			if ( current_block === ( current_block = get_block( state, each_block_value, page_1, page_index ) ) && if_block_2 ) {
				if_block_2.update( changed, state, each_block_value, page_1, page_index );
			} else {
				if_block_2.unmount();
				if_block_2.destroy();
				if_block_2 = current_block( state, each_block_value, page_1, page_index, component );
				if_block_2.create();
				if_block_2.mount( if_block_2_anchor.parentNode, if_block_2_anchor );
			}
		},

		unmount: function () {
			if_block_2.unmount();
			detachNode( if_block_2_anchor );
		},

		destroy: function () {
			if_block_2.destroy();
		}
	};
}

function create_if_block_4$1 ( state, each_block_value, page_1, page_index, component ) {
	var a, a_class_value, text_value, text;

	return {
		create: function () {
			a = createElement( 'a' );
			text = createText( text_value = page_1.content );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			a.className = a_class_value = "pageLinkClass " + ( page_1.selected ? 'active' : '' ) + " " + ( page_1.disabled ? 'disabled' : '' );
			a.tabIndex = "0";
		},

		mount: function ( target, anchor ) {
			insertNode( a, target, anchor );
			appendNode( text, a );
		},

		update: function ( changed, state, each_block_value, page_1, page_index ) {
			if ( a_class_value !== ( a_class_value = "pageLinkClass " + ( page_1.selected ? 'active' : '' ) + " " + ( page_1.disabled ? 'disabled' : '' ) ) ) {
				a.className = a_class_value;
			}

			if ( text_value !== ( text_value = page_1.content ) ) {
				text.data = text_value;
			}
		},

		unmount: function () {
			detachNode( a );
		},

		destroy: noop
	};
}

function create_if_block_5$1 ( state, each_block_value, page_1, page_index, component ) {
	var a, a_class_value, text_value, text;

	return {
		create: function () {
			a = createElement( 'a' );
			text = createText( text_value = page_1.content );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			a.className = a_class_value = "pageLinkClass " + ( page_1.selected ? 'active' : '' ) + " " + ( page_1.disabled ? 'disabled' : '' );
			a.tabIndex = "0";
			addListener( a, 'click', click_handler_1$1 );

			a._svelte = {
				component: component,
				each_block_value: each_block_value,
				page_index: page_index
			};
		},

		mount: function ( target, anchor ) {
			insertNode( a, target, anchor );
			appendNode( text, a );
		},

		update: function ( changed, state, each_block_value, page_1, page_index ) {
			if ( a_class_value !== ( a_class_value = "pageLinkClass " + ( page_1.selected ? 'active' : '' ) + " " + ( page_1.disabled ? 'disabled' : '' ) ) ) {
				a.className = a_class_value;
			}

			a._svelte.each_block_value = each_block_value;
			a._svelte.page_index = page_index;

			if ( text_value !== ( text_value = page_1.content ) ) {
				text.data = text_value;
			}
		},

		unmount: function () {
			detachNode( a );
		},

		destroy: function () {
			removeListener( a, 'click', click_handler_1$1 );
		}
	};
}

function create_if_block$1 ( state, component ) {
	var ul, ul_class_value, li, li_class_value, a, a_class_value, slot, text_value, text, each_block_anchor, li_1, li_1_class_value, a_1, slot_1, text_2_value, text_2;

	function click_handler ( event ) {
		component.prevPage();
	}

	var each_block_value = state.pages;

	var each_block_iterations = [];

	for ( var i = 0; i < each_block_value.length; i += 1 ) {
		each_block_iterations[i] = create_each_block$1( state, each_block_value, each_block_value[i], i, component );
	}

	function click_handler_1 ( event ) {
		component.nextPage();
	}

	return {
		create: function () {
			ul = createElement( 'ul' );
			li = createElement( 'li' );
			a = createElement( 'a' );
			slot = createElement( 'slot' );
			text = createText( text_value = state.prevText );

			for ( var i = 0; i < each_block_iterations.length; i += 1 ) {
				each_block_iterations[i].create();
			}

			each_block_anchor = createComment();
			li_1 = createElement( 'li' );
			a_1 = createElement( 'a' );
			slot_1 = createElement( 'slot' );
			text_2 = createText( text_2_value = state.nextText );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			setAttribute( ul, 'svelte-3005581307', '' );
			ul.className = ul_class_value = state.containerClass;
			li.className = li_class_value = "prevClass " + ( template$1.helpers.firstPageSelected(state.selected) ? state.disabled : '' );
			a.className = a_class_value = state.prevLinkClass;
			a.tabIndex = "0";
			addListener( a, 'click', click_handler );
			setAttribute( slot, 'name', "prevContent" );
			li_1.className = li_1_class_value = "nextClass " + ( template$1.helpers.lastPageSelected(state.selected, state.pageCount) ? 'disabled' : '' );
			a_1.className = "nextLinkClass";
			a_1.tabIndex = "0";
			addListener( a_1, 'click', click_handler_1 );
			setAttribute( slot_1, 'name', "nextContent" );
		},

		mount: function ( target, anchor ) {
			insertNode( ul, target, anchor );
			appendNode( li, ul );
			appendNode( a, li );
			appendNode( slot, a );
			appendNode( text, slot );

			for ( var i = 0; i < each_block_iterations.length; i += 1 ) {
				each_block_iterations[i].mount( ul, null );
			}

			appendNode( each_block_anchor, ul );
			appendNode( li_1, ul );
			appendNode( a_1, li_1 );
			appendNode( slot_1, a_1 );
			appendNode( text_2, slot_1 );
		},

		update: function ( changed, state ) {
			if ( ul_class_value !== ( ul_class_value = state.containerClass ) ) {
				ul.className = ul_class_value;
			}

			if ( li_class_value !== ( li_class_value = "prevClass " + ( template$1.helpers.firstPageSelected(state.selected) ? state.disabled : '' ) ) ) {
				li.className = li_class_value;
			}

			if ( a_class_value !== ( a_class_value = state.prevLinkClass ) ) {
				a.className = a_class_value;
			}

			if ( text_value !== ( text_value = state.prevText ) ) {
				text.data = text_value;
			}

			var each_block_value = state.pages;

			if ( 'pages' in changed ) {
				for ( var i = 0; i < each_block_value.length; i += 1 ) {
					if ( each_block_iterations[i] ) {
						each_block_iterations[i].update( changed, state, each_block_value, each_block_value[i], i );
					} else {
						each_block_iterations[i] = create_each_block$1( state, each_block_value, each_block_value[i], i, component );
						each_block_iterations[i].create();
						each_block_iterations[i].mount( ul, each_block_anchor );
					}
				}

				for ( ; i < each_block_iterations.length; i += 1 ) {
					each_block_iterations[i].unmount();
					each_block_iterations[i].destroy();
				}
				each_block_iterations.length = each_block_value.length;
			}

			if ( li_1_class_value !== ( li_1_class_value = "nextClass " + ( template$1.helpers.lastPageSelected(state.selected, state.pageCount) ? 'disabled' : '' ) ) ) {
				li_1.className = li_1_class_value;
			}

			if ( text_2_value !== ( text_2_value = state.nextText ) ) {
				text_2.data = text_2_value;
			}
		},

		unmount: function () {
			detachNode( ul );

			for ( var i = 0; i < each_block_iterations.length; i += 1 ) {
				each_block_iterations[i].unmount();
			}
		},

		destroy: function () {
			removeListener( a, 'click', click_handler );

			destroyEach( each_block_iterations, false, 0 );

			removeListener( a_1, 'click', click_handler_1 );
		}
	};
}

function create_if_block_3$1 ( state, component ) {
	var div, div_class_value, a, a_class_value, slot, text_value, text, text_1, text_2, a_1, a_1_class_value, slot_1, text_3_value, text_3;

	function click_handler_1 ( event ) {
		component.prevPage();
	}

	var each_block_value = state.pages;

	var each_block_1_iterations = [];

	for ( var i = 0; i < each_block_value.length; i += 1 ) {
		each_block_1_iterations[i] = create_each_block_1$1( state, each_block_value, each_block_value[i], i, component );
	}

	function click_handler_2 ( event ) {
		component.nextPage();
	}

	return {
		create: function () {
			div = createElement( 'div' );
			a = createElement( 'a' );
			slot = createElement( 'slot' );
			text = createText( text_value = state.prevText );
			text_1 = createText( "\r\n        " );

			for ( var i = 0; i < each_block_1_iterations.length; i += 1 ) {
				each_block_1_iterations[i].create();
			}

			text_2 = createText( "\r\n        " );
			a_1 = createElement( 'a' );
			slot_1 = createElement( 'slot' );
			text_3 = createText( text_3_value = state.nextText );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			setAttribute( div, 'svelte-3005581307', '' );
			div.className = div_class_value = state.containerClass;
			a.className = a_class_value = "prevLinkClass, " + ( template$1.helpers.firstPageSelected(state.selected) ? state.disabled : '' );
			a.tabIndex = "0";
			addListener( a, 'click', click_handler_1 );
			setAttribute( slot, 'name', "prevContent" );
			a_1.className = a_1_class_value = "nextLinkClass " + ( template$1.helpers.lastPageSelected(state.selected, state.pageCount) ? 'disabled' : '' );
			a_1.tabIndex = "0";
			addListener( a_1, 'click', click_handler_2 );
			setAttribute( slot_1, 'name', "nextContent" );
		},

		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
			appendNode( a, div );
			appendNode( slot, a );
			appendNode( text, slot );
			appendNode( text_1, div );

			for ( var i = 0; i < each_block_1_iterations.length; i += 1 ) {
				each_block_1_iterations[i].mount( div, null );
			}

			appendNode( text_2, div );
			appendNode( a_1, div );
			appendNode( slot_1, a_1 );
			appendNode( text_3, slot_1 );
		},

		update: function ( changed, state ) {
			if ( div_class_value !== ( div_class_value = state.containerClass ) ) {
				div.className = div_class_value;
			}

			if ( a_class_value !== ( a_class_value = "prevLinkClass, " + ( template$1.helpers.firstPageSelected(state.selected) ? state.disabled : '' ) ) ) {
				a.className = a_class_value;
			}

			if ( text_value !== ( text_value = state.prevText ) ) {
				text.data = text_value;
			}

			var each_block_value = state.pages;

			if ( 'pages' in changed ) {
				for ( var i = 0; i < each_block_value.length; i += 1 ) {
					if ( each_block_1_iterations[i] ) {
						each_block_1_iterations[i].update( changed, state, each_block_value, each_block_value[i], i );
					} else {
						each_block_1_iterations[i] = create_each_block_1$1( state, each_block_value, each_block_value[i], i, component );
						each_block_1_iterations[i].create();
						each_block_1_iterations[i].mount( div, text_2 );
					}
				}

				for ( ; i < each_block_1_iterations.length; i += 1 ) {
					each_block_1_iterations[i].unmount();
					each_block_1_iterations[i].destroy();
				}
				each_block_1_iterations.length = each_block_value.length;
			}

			if ( a_1_class_value !== ( a_1_class_value = "nextLinkClass " + ( template$1.helpers.lastPageSelected(state.selected, state.pageCount) ? 'disabled' : '' ) ) ) {
				a_1.className = a_1_class_value;
			}

			if ( text_3_value !== ( text_3_value = state.nextText ) ) {
				text_3.data = text_3_value;
			}
		},

		unmount: function () {
			detachNode( div );

			for ( var i = 0; i < each_block_1_iterations.length; i += 1 ) {
				each_block_1_iterations[i].unmount();
			}
		},

		destroy: function () {
			removeListener( a, 'click', click_handler_1 );

			destroyEach( each_block_1_iterations, false, 0 );

			removeListener( a_1, 'click', click_handler_2 );
		}
	};
}

function click_handler$1 ( event ) {
	var component = this._svelte.component;
	var each_block_value = this._svelte.each_block_value, page_index = this._svelte.page_index, page = each_block_value[page_index];
	component.handlePageSelected(page.index);
}

function click_handler_1$1 ( event ) {
	var component = this._svelte.component;
	var each_block_value = this._svelte.each_block_value, page_index = this._svelte.page_index, page_1 = each_block_value[page_index];
	component.handlePageSelected(page_1.index);
}

function Paginate ( options ) {
	options = options || {};
	this._state = assign( template$1.data(), options.data );
	recompute( this._state, this._state, {}, true );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root || this;
	this._yield = options._yield;

	this._torndown = false;

	this._fragment = create_main_fragment$1( this._state, this );

	if ( options.target ) {
		this._fragment.create();
		this._fragment.mount( options.target, null );
	}

	if ( options._root ) {
		options._root._oncreate.push( template$1.oncreate.bind( this ) );
	} else {
		template$1.oncreate.call( this );
	}
}

assign( Paginate.prototype, template$1.methods, proto );

Paginate.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = assign( {}, oldState, newState );
	recompute( this._state, newState, oldState, false );
	dispatchObservers( this, this._observers.pre, newState, oldState );
	this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

Paginate.prototype.teardown = Paginate.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	if ( detach !== false ) this._fragment.unmount();
	this._fragment.destroy();
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

var template = (function () {
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

	return {
		data: () => ({
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
		}),

		methods: {
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
		},

        helpers: {
			collect,
			// setPage(instance, reload, currentPage, offset = 0) {
			// 	if (reload) {
			// 		instance.set({currentPage: currentPage + offset});
			// 		instance.processRows(instance.get('rows'));
			// 	}
			// },
        },

		oncreate: function() {
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
	}
}());

function create_main_fragment ( state, component ) {
	var div, div_1, span, text_value, text, text_1, div_2, text_2, text_3, text_4, text_7, text_8, table, thead, tr, text_11, tbody, text_14;

	var each_block_value = state.customButtons;

	var each_block_iterations = [];

	for ( var i = 0; i < each_block_value.length; i += 1 ) {
		each_block_iterations[i] = create_each_block( state, each_block_value, each_block_value[i], i, component );
	}

	var if_block_1 = (state.printable) && create_if_block_1( state, component );

	var if_block_2 = (state.exportable) && create_if_block_2( state, component );

	var if_block_3 = (state.searchable) && create_if_block_3( state, component );

	var if_block_4 = (state.searching) && create_if_block_4( state, component );

	var each_block_value_1 = state.columns;

	var each_block_1_iterations = [];

	for ( var i = 0; i < each_block_value_1.length; i += 1 ) {
		each_block_1_iterations[i] = create_each_block_1( state, each_block_value_1, each_block_value_1[i], i, component );
	}

	var each_block_value_2 = state.paginated;

	var each_block_2_iterations = [];

	for ( var i = 0; i < each_block_value_2.length; i += 1 ) {
		each_block_2_iterations[i] = create_each_block_2( state, each_block_value_2, each_block_value_2[i], i, component );
	}

	var if_block_6 = (state.paginate) && create_if_block_7( state, component );

	return {
		create: function () {
			div = createElement( 'div' );
			div_1 = createElement( 'div' );
			span = createElement( 'span' );
			text = createText( text_value = state.title );
			text_1 = createText( "\n\t\t" );
			div_2 = createElement( 'div' );

			for ( var i = 0; i < each_block_iterations.length; i += 1 ) {
				each_block_iterations[i].create();
			}

			text_2 = createText( "\n\t\t\t" );
			if ( if_block_1 ) if_block_1.create();
			text_3 = createText( "\n\t\t\t" );
			if ( if_block_2 ) if_block_2.create();
			text_4 = createText( "\n\t\t\t" );
			if ( if_block_3 ) if_block_3.create();
			text_7 = createText( "\n\t" );
			if ( if_block_4 ) if_block_4.create();
			text_8 = createText( "\n\n    " );
			table = createElement( 'table' );
			thead = createElement( 'thead' );
			tr = createElement( 'tr' );

			for ( var i = 0; i < each_block_1_iterations.length; i += 1 ) {
				each_block_1_iterations[i].create();
			}

			text_11 = createText( "\n\n        " );
			tbody = createElement( 'tbody' );

			for ( var i = 0; i < each_block_2_iterations.length; i += 1 ) {
				each_block_2_iterations[i].create();
			}

			text_14 = createText( "\n" );
			if ( if_block_6 ) if_block_6.create();
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			setAttribute( div, 'svelte-647291077', '' );
			div.className = "material-table";
			div_1.className = "table-header";
			span.className = "table-title";
			div_2.className = "actions";
			setAttribute( table, 'ref', "table" );
			table.className = "table table-striped table-hover";
		},

		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
			appendNode( div_1, div );
			appendNode( span, div_1 );
			appendNode( text, span );
			appendNode( text_1, div_1 );
			appendNode( div_2, div_1 );

			for ( var i = 0; i < each_block_iterations.length; i += 1 ) {
				each_block_iterations[i].mount( div_2, null );
			}

			appendNode( text_2, div_2 );
			if ( if_block_1 ) if_block_1.mount( div_2, null );
			appendNode( text_3, div_2 );
			if ( if_block_2 ) if_block_2.mount( div_2, null );
			appendNode( text_4, div_2 );
			if ( if_block_3 ) if_block_3.mount( div_2, null );
			appendNode( text_7, div );
			if ( if_block_4 ) if_block_4.mount( div, null );
			appendNode( text_8, div );
			appendNode( table, div );
			appendNode( thead, table );
			appendNode( tr, thead );

			for ( var i = 0; i < each_block_1_iterations.length; i += 1 ) {
				each_block_1_iterations[i].mount( tr, null );
			}

			appendNode( text_11, table );
			appendNode( tbody, table );

			for ( var i = 0; i < each_block_2_iterations.length; i += 1 ) {
				each_block_2_iterations[i].mount( tbody, null );
			}

			appendNode( text_14, div );
			if ( if_block_6 ) if_block_6.mount( div, null );
		},

		update: function ( changed, state ) {
			if ( text_value !== ( text_value = state.title ) ) {
				text.data = text_value;
			}

			var each_block_value = state.customButtons;

			if ( 'customButtons' in changed ) {
				for ( var i = 0; i < each_block_value.length; i += 1 ) {
					if ( each_block_iterations[i] ) {
						each_block_iterations[i].update( changed, state, each_block_value, each_block_value[i], i );
					} else {
						each_block_iterations[i] = create_each_block( state, each_block_value, each_block_value[i], i, component );
						each_block_iterations[i].create();
						each_block_iterations[i].mount( div_2, text_2 );
					}
				}

				for ( ; i < each_block_iterations.length; i += 1 ) {
					each_block_iterations[i].unmount();
					each_block_iterations[i].destroy();
				}
				each_block_iterations.length = each_block_value.length;
			}

			if ( state.printable ) {
				if ( !if_block_1 ) {
					if_block_1 = create_if_block_1( state, component );
					if_block_1.create();
					if_block_1.mount( div_2, text_3 );
				}
			} else if ( if_block_1 ) {
				if_block_1.unmount();
				if_block_1.destroy();
				if_block_1 = null;
			}

			if ( state.exportable ) {
				if ( !if_block_2 ) {
					if_block_2 = create_if_block_2( state, component );
					if_block_2.create();
					if_block_2.mount( div_2, text_4 );
				}
			} else if ( if_block_2 ) {
				if_block_2.unmount();
				if_block_2.destroy();
				if_block_2 = null;
			}

			if ( state.searchable ) {
				if ( !if_block_3 ) {
					if_block_3 = create_if_block_3( state, component );
					if_block_3.create();
					if_block_3.mount( div_2, null );
				}
			} else if ( if_block_3 ) {
				if_block_3.unmount();
				if_block_3.destroy();
				if_block_3 = null;
			}

			if ( state.searching ) {
				if ( if_block_4 ) {
					if_block_4.update( changed, state );
				} else {
					if_block_4 = create_if_block_4( state, component );
					if_block_4.create();
					if_block_4.mount( div, text_8 );
				}
			} else if ( if_block_4 ) {
				if_block_4.unmount();
				if_block_4.destroy();
				if_block_4 = null;
			}

			var each_block_value_1 = state.columns;

			if ( 'sortable' in changed || 'sortColumn' in changed || 'sortType' in changed || 'columns' in changed ) {
				for ( var i = 0; i < each_block_value_1.length; i += 1 ) {
					if ( each_block_1_iterations[i] ) {
						each_block_1_iterations[i].update( changed, state, each_block_value_1, each_block_value_1[i], i );
					} else {
						each_block_1_iterations[i] = create_each_block_1( state, each_block_value_1, each_block_value_1[i], i, component );
						each_block_1_iterations[i].create();
						each_block_1_iterations[i].mount( tr, null );
					}
				}

				for ( ; i < each_block_1_iterations.length; i += 1 ) {
					each_block_1_iterations[i].unmount();
					each_block_1_iterations[i].destroy();
				}
				each_block_1_iterations.length = each_block_value_1.length;
			}

			var each_block_value_2 = state.paginated;

			if ( 'clickable' in changed || 'columns' in changed || 'paginated' in changed ) {
				for ( var i = 0; i < each_block_value_2.length; i += 1 ) {
					if ( each_block_2_iterations[i] ) {
						each_block_2_iterations[i].update( changed, state, each_block_value_2, each_block_value_2[i], i );
					} else {
						each_block_2_iterations[i] = create_each_block_2( state, each_block_value_2, each_block_value_2[i], i, component );
						each_block_2_iterations[i].create();
						each_block_2_iterations[i].mount( tbody, null );
					}
				}

				for ( ; i < each_block_2_iterations.length; i += 1 ) {
					each_block_2_iterations[i].unmount();
					each_block_2_iterations[i].destroy();
				}
				each_block_2_iterations.length = each_block_value_2.length;
			}

			if ( state.paginate ) {
				if ( if_block_6 ) {
					if_block_6.update( changed, state );
				} else {
					if_block_6 = create_if_block_7( state, component );
					if_block_6.create();
					if_block_6.mount( div, null );
				}
			} else if ( if_block_6 ) {
				if_block_6.unmount();
				if_block_6.destroy();
				if_block_6 = null;
			}
		},

		unmount: function () {
			detachNode( div );

			for ( var i = 0; i < each_block_iterations.length; i += 1 ) {
				each_block_iterations[i].unmount();
			}

			if ( if_block_1 ) if_block_1.unmount();
			if ( if_block_2 ) if_block_2.unmount();
			if ( if_block_3 ) if_block_3.unmount();
			if ( if_block_4 ) if_block_4.unmount();

			for ( var i = 0; i < each_block_1_iterations.length; i += 1 ) {
				each_block_1_iterations[i].unmount();
			}

			for ( var i = 0; i < each_block_2_iterations.length; i += 1 ) {
				each_block_2_iterations[i].unmount();
			}

			if ( if_block_6 ) if_block_6.unmount();
		},

		destroy: function () {
			destroyEach( each_block_iterations, false, 0 );

			if ( if_block_1 ) if_block_1.destroy();
			if ( if_block_2 ) if_block_2.destroy();
			if ( if_block_3 ) if_block_3.destroy();
			if ( if_block_4 ) if_block_4.destroy();

			destroyEach( each_block_1_iterations, false, 0 );

			destroyEach( each_block_2_iterations, false, 0 );

			if ( if_block_6 ) if_block_6.destroy();
		}
	};
}

function create_each_block ( state, each_block_value, button, x, component ) {
	var if_block_anchor;

	var if_block = (!button.hide) && create_if_block( state, each_block_value, button, x, component );

	return {
		create: function () {
			if ( if_block ) if_block.create();
			if_block_anchor = createComment();
		},

		mount: function ( target, anchor ) {
			if ( if_block ) if_block.mount( target, anchor );
			insertNode( if_block_anchor, target, anchor );
		},

		update: function ( changed, state, each_block_value, button, x ) {
			if ( !button.hide ) {
				if ( if_block ) {
					if_block.update( changed, state, each_block_value, button, x );
				} else {
					if_block = create_if_block( state, each_block_value, button, x, component );
					if_block.create();
					if_block.mount( if_block_anchor.parentNode, if_block_anchor );
				}
			} else if ( if_block ) {
				if_block.unmount();
				if_block.destroy();
				if_block = null;
			}
		},

		unmount: function () {
			if ( if_block ) if_block.unmount();
			detachNode( if_block_anchor );
		},

		destroy: function () {
			if ( if_block ) if_block.destroy();
		}
	};
}

function create_if_block ( state, each_block_value, button, x, component ) {
	var a, i, text_value, text;

	return {
		create: function () {
			a = createElement( 'a' );
			i = createElement( 'i' );
			text = createText( text_value = button.icon );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			a.href = "javascript:undefined";
			a.className = "waves-effect btn-flat nopadding";
			addListener( a, 'click', click_handler );
			i.className = "material-icons";
		},

		mount: function ( target, anchor ) {
			insertNode( a, target, anchor );
			appendNode( i, a );
			appendNode( text, i );
		},

		update: function ( changed, state, each_block_value, button, x ) {
			if ( text_value !== ( text_value = button.icon ) ) {
				text.data = text_value;
			}
		},

		unmount: function () {
			detachNode( a );
		},

		destroy: function () {
			removeListener( a, 'click', click_handler );
		}
	};
}

function create_if_block_1 ( state, component ) {
	var a, i, text;

	function click_handler_1 ( event ) {
		component.print();
	}

	return {
		create: function () {
			a = createElement( 'a' );
			i = createElement( 'i' );
			text = createText( "print" );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			a.href = "javascript:undefined";
			a.className = "waves-effect btn-flat nopadding";
			addListener( a, 'click', click_handler_1 );
			i.className = "material-icons";
		},

		mount: function ( target, anchor ) {
			insertNode( a, target, anchor );
			appendNode( i, a );
			appendNode( text, i );
		},

		unmount: function () {
			detachNode( a );
		},

		destroy: function () {
			removeListener( a, 'click', click_handler_1 );
		}
	};
}

function create_if_block_2 ( state, component ) {
	var a, i, text;

	function click_handler_1 ( event ) {
		component.exportExcel();
	}

	return {
		create: function () {
			a = createElement( 'a' );
			i = createElement( 'i' );
			text = createText( "description" );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			a.href = "javascript:undefined";
			a.className = "waves-effect btn-flat nopadding";
			setAttribute( a, 'v-if', "this.exportable" );
			addListener( a, 'click', click_handler_1 );
			i.className = "material-icons";
		},

		mount: function ( target, anchor ) {
			insertNode( a, target, anchor );
			appendNode( i, a );
			appendNode( text, i );
		},

		unmount: function () {
			detachNode( a );
		},

		destroy: function () {
			removeListener( a, 'click', click_handler_1 );
		}
	};
}

function create_if_block_3 ( state, component ) {
	var a, i, text;

	function click_handler_1 ( event ) {
		component.search();
	}

	return {
		create: function () {
			a = createElement( 'a' );
			i = createElement( 'i' );
			text = createText( "search" );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			a.href = "javascript:undefined";
			a.className = "waves-effect btn-flat nopadding";
			addListener( a, 'click', click_handler_1 );
			i.className = "material-icons";
		},

		mount: function ( target, anchor ) {
			insertNode( a, target, anchor );
			appendNode( i, a );
			appendNode( text, i );
		},

		unmount: function () {
			detachNode( a );
		},

		destroy: function () {
			removeListener( a, 'click', click_handler_1 );
		}
	};
}

function create_if_block_4 ( state, component ) {
	var div, div_1, label, input, input_updating = false;

	function input_input_handler () {
		input_updating = true;
		component._set({ searchInput: input.value });
		input_updating = false;
	}

	return {
		create: function () {
			div = createElement( 'div' );
			div_1 = createElement( 'div' );
			label = createElement( 'label' );
			input = createElement( 'input' );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			div_1.id = "search-input-container";
			input.type = "search";
			input.id = "search-input";
			input.className = "form-control";
			input.placeholder = "Search data";

			addListener( input, 'input', input_input_handler );
		},

		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
			appendNode( div_1, div );
			appendNode( label, div_1 );
			appendNode( input, label );

			input.value = state.searchInput;
		},

		update: function ( changed, state ) {
			if ( !input_updating ) {
				input.value = state.searchInput;
			}
		},

		unmount: function () {
			detachNode( div );
		},

		destroy: function () {
			removeListener( input, 'input', input_input_handler );
		}
	};
}

function create_each_block_1 ( state, each_block_value_1, column, x, component ) {
	var th, th_class_value, th_style_value, text_value, text;

	return {
		create: function () {
			th = createElement( 'th' );
			text = createText( text_value = column.label );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			th.className = th_class_value = "" + ( state.sortable ? 'sorting ' : '' ) + "\n                        " + ( state.sortColumn === x ?
                            (state.sortType === 'desc' ? 'sorting-desc' : 'sorting-asc')
                            : '' ) + "\n                        " + ( column.numeric ? ' numeric' : '' );
			th.style.cssText = th_style_value = "width: " + ( column.width ? column.width : 'auto' );
			addListener( th, 'click', click_handler_1 );

			th._svelte = {
				component: component,
				each_block_value_1: each_block_value_1,
				x: x
			};
		},

		mount: function ( target, anchor ) {
			insertNode( th, target, anchor );
			appendNode( text, th );
		},

		update: function ( changed, state, each_block_value_1, column, x ) {
			if ( th_class_value !== ( th_class_value = "" + ( state.sortable ? 'sorting ' : '' ) + "\n                        " + ( state.sortColumn === x ?
                            (state.sortType === 'desc' ? 'sorting-desc' : 'sorting-asc')
                            : '' ) + "\n                        " + ( column.numeric ? ' numeric' : '' ) ) ) {
				th.className = th_class_value;
			}

			if ( th_style_value !== ( th_style_value = "width: " + ( column.width ? column.width : 'auto' ) ) ) {
				th.style.cssText = th_style_value;
			}

			th._svelte.each_block_value_1 = each_block_value_1;
			th._svelte.x = x;

			if ( text_value !== ( text_value = column.label ) ) {
				text.data = text_value;
			}
		},

		unmount: function () {
			detachNode( th );
		},

		destroy: function () {
			removeListener( th, 'click', click_handler_1 );
		}
	};
}

function create_each_block_2 ( state, each_block_value_2, row, y, component ) {
	var tr, tr_class_value;

	var each_block_value = state.columns;

	var each_block_3_iterations = [];

	for ( var i = 0; i < each_block_value.length; i += 1 ) {
		each_block_3_iterations[i] = create_each_block_3( state, each_block_value_2, row, y, each_block_value, each_block_value[i], i, component );
	}

	return {
		create: function () {
			tr = createElement( 'tr' );

			for ( var i = 0; i < each_block_3_iterations.length; i += 1 ) {
				each_block_3_iterations[i].create();
			}
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			tr.className = tr_class_value = state.clickable ? 'clickable' : '';
			addListener( tr, 'click', click_handler_2 );

			tr._svelte = {
				component: component,
				each_block_value_2: each_block_value_2,
				y: y
			};
		},

		mount: function ( target, anchor ) {
			insertNode( tr, target, anchor );

			for ( var i = 0; i < each_block_3_iterations.length; i += 1 ) {
				each_block_3_iterations[i].mount( tr, null );
			}
		},

		update: function ( changed, state, each_block_value_2, row, y ) {
			if ( tr_class_value !== ( tr_class_value = state.clickable ? 'clickable' : '' ) ) {
				tr.className = tr_class_value;
			}

			tr._svelte.each_block_value_2 = each_block_value_2;
			tr._svelte.y = y;

			var each_block_value = state.columns;

			if ( 'columns' in changed || 'paginated' in changed ) {
				for ( var i = 0; i < each_block_value.length; i += 1 ) {
					if ( each_block_3_iterations[i] ) {
						each_block_3_iterations[i].update( changed, state, each_block_value_2, row, y, each_block_value, each_block_value[i], i );
					} else {
						each_block_3_iterations[i] = create_each_block_3( state, each_block_value_2, row, y, each_block_value, each_block_value[i], i, component );
						each_block_3_iterations[i].create();
						each_block_3_iterations[i].mount( tr, null );
					}
				}

				for ( ; i < each_block_3_iterations.length; i += 1 ) {
					each_block_3_iterations[i].unmount();
					each_block_3_iterations[i].destroy();
				}
				each_block_3_iterations.length = each_block_value.length;
			}
		},

		unmount: function () {
			detachNode( tr );

			for ( var i = 0; i < each_block_3_iterations.length; i += 1 ) {
				each_block_3_iterations[i].unmount();
			}
		},

		destroy: function () {
			removeListener( tr, 'click', click_handler_2 );

			destroyEach( each_block_3_iterations, false, 0 );
		}
	};
}

function create_each_block_3 ( state, each_block_value_2, row, y, each_block_value, column_1, x, component ) {
	var td;

	function get_block ( state, each_block_value_2, row, y, each_block_value, column_1, x ) {
		if ( column_1.html ) return create_if_block_5;
		return create_if_block_6;
	}

	var current_block = get_block( state, each_block_value_2, row, y, each_block_value, column_1, x );
	var if_block_5 = current_block( state, each_block_value_2, row, y, each_block_value, column_1, x, component );

	return {
		create: function () {
			td = createElement( 'td' );
			if_block_5.create();
		},

		mount: function ( target, anchor ) {
			insertNode( td, target, anchor );
			if_block_5.mount( td, null );
		},

		update: function ( changed, state, each_block_value_2, row, y, each_block_value, column_1, x ) {
			if ( current_block === ( current_block = get_block( state, each_block_value_2, row, y, each_block_value, column_1, x ) ) && if_block_5 ) {
				if_block_5.update( changed, state, each_block_value_2, row, y, each_block_value, column_1, x );
			} else {
				if_block_5.unmount();
				if_block_5.destroy();
				if_block_5 = current_block( state, each_block_value_2, row, y, each_block_value, column_1, x, component );
				if_block_5.create();
				if_block_5.mount( td, null );
			}
		},

		unmount: function () {
			detachNode( td );
			if_block_5.unmount();
		},

		destroy: function () {
			if_block_5.destroy();
		}
	};
}

function create_if_block_5 ( state, each_block_value_2, row, y, each_block_value, column_1, x, component ) {
	var raw_value, raw_before, raw_after;

	return {
		create: function () {
			raw_before = createElement( 'noscript' );
			raw_after = createElement( 'noscript' );
		},

		mount: function ( target, anchor ) {
			insertNode( raw_before, target, anchor );
			insertNode( raw_after, target, anchor );
			raw_before.insertAdjacentHTML( 'afterend', raw_value = template.helpers.collect(row, column_1.field) );
		},

		update: function ( changed, state, each_block_value_2, row, y, each_block_value, column_1, x ) {
			if ( raw_value !== ( raw_value = template.helpers.collect(row, column_1.field) ) ) {
				detachBetween( raw_before, raw_after );
				raw_before.insertAdjacentHTML( 'afterend', raw_value = template.helpers.collect(row, column_1.field) );
			}
		},

		unmount: function () {
			detachBetween( raw_before, raw_after );

			detachNode( raw_before );
			detachNode( raw_after );
		},

		destroy: noop
	};
}

function create_if_block_6 ( state, each_block_value_2, row, y, each_block_value, column_1, x, component ) {
	var text_value, text;

	return {
		create: function () {
			text = createText( text_value = template.helpers.collect(row, column_1.field) );
		},

		mount: function ( target, anchor ) {
			insertNode( text, target, anchor );
		},

		update: function ( changed, state, each_block_value_2, row, y, each_block_value, column_1, x ) {
			if ( text_value !== ( text_value = template.helpers.collect(row, column_1.field) ) ) {
				text.data = text_value;
			}
		},

		unmount: function () {
			detachNode( text );
		},

		destroy: noop
	};
}

function create_each_block_4 ( state, each_block_value, option, x, component ) {
	var option_1, option_1_value_value, option_1_selected_value, text_value, text;

	return {
		create: function () {
			option_1 = createElement( 'option' );
			text = createText( text_value = option === -1 ? 'All' : option );
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			option_1.__value = option_1_value_value = option;
			option_1.value = option_1.__value;
			option_1.selected = option_1_selected_value = option == state.currentPerPage;
		},

		mount: function ( target, anchor ) {
			insertNode( option_1, target, anchor );
			appendNode( text, option_1 );
		},

		update: function ( changed, state, each_block_value, option, x ) {
			if ( option_1_value_value !== ( option_1_value_value = option ) ) {
				option_1.__value = option_1_value_value;
			}

			option_1.value = option_1.__value;

			if ( option_1_selected_value !== ( option_1_selected_value = option == state.currentPerPage ) ) {
				option_1.selected = option_1_selected_value;
			}

			if ( text_value !== ( text_value = option === -1 ? 'All' : option ) ) {
				text.data = text_value;
			}
		},

		unmount: function () {
			detachNode( option_1 );
		},

		destroy: noop
	};
}

function create_if_block_7 ( state, component ) {
	var div, div_1, label, span, text, text_1, select, text_4, div_2, text_5_value, text_5, text_6, text_7_value, text_7, text_8, text_9_value, text_9, text_11, div_3, paginate_1_updating = false;

	var each_block_value = state.perPageOptions;

	var each_block_4_iterations = [];

	for ( var i = 0; i < each_block_value.length; i += 1 ) {
		each_block_4_iterations[i] = create_each_block_4( state, each_block_value, each_block_value[i], i, component );
	}

	function change_handler ( event ) {
		component.onTableLength((event));
	}

	var paginate_1_initial_data = {
		marginPages: 2,
		pageRange: 4,
		containerClass: "pagination",
		pageCount: state.rows.length / state.currentPerPage
	};
	if ( 'selectedPage' in state ) paginate_1_initial_data.selected = state.selectedPage;
	var paginate_1 = new Paginate({
		_root: component._root,
		data: paginate_1_initial_data
	});

	component._bindings.push( function () {
		if ( paginate_1._torndown ) return;
		paginate_1.observe( 'selected', function ( value ) {
			if ( paginate_1_updating ) return;
			paginate_1_updating = true;
			component._set({ selectedPage: value });
			paginate_1_updating = false;
		}, { init: differs( paginate_1.get( 'selected' ), state.selectedPage ) });
	});

	paginate_1._context = {
		state: state
	};

	return {
		create: function () {
			div = createElement( 'div' );
			div_1 = createElement( 'div' );
			label = createElement( 'label' );
			span = createElement( 'span' );
			text = createText( "Rows per page:" );
			text_1 = createText( "\n\t\t\t\t" );
			select = createElement( 'select' );

			for ( var i = 0; i < each_block_4_iterations.length; i += 1 ) {
				each_block_4_iterations[i].create();
			}

			text_4 = createText( "\n\t\t" );
			div_2 = createElement( 'div' );
			text_5 = createText( text_5_value = (state.currentPage - 1) * state.currentPerPage ? (state.currentPage - 1) * state.currentPerPage : 1 );
			text_6 = createText( "\n\t\t\t\t-" );
			text_7 = createText( text_7_value = ( 'Math' in state ? state.Math : Math ).min(state.processedRows.length, state.currentPerPage * state.currentPage) );
			text_8 = createText( " of " );
			text_9 = createText( text_9_value = state.processedRows.length );
			text_11 = createText( "\n\t\t" );
			div_3 = createElement( 'div' );
			paginate_1._fragment.create();
			this.hydrate();
		},

		hydrate: function ( nodes ) {
			div.className = "table-footer";
			div_1.className = "datatable-length";
			select.className = "browser-default";
			addListener( select, 'change', change_handler );
			div_2.className = "datatable-info";
		},

		mount: function ( target, anchor ) {
			insertNode( div, target, anchor );
			appendNode( div_1, div );
			appendNode( label, div_1 );
			appendNode( span, label );
			appendNode( text, span );
			appendNode( text_1, label );
			appendNode( select, label );

			for ( var i = 0; i < each_block_4_iterations.length; i += 1 ) {
				each_block_4_iterations[i].mount( select, null );
			}

			appendNode( text_4, div );
			appendNode( div_2, div );
			appendNode( text_5, div_2 );
			appendNode( text_6, div_2 );
			appendNode( text_7, div_2 );
			appendNode( text_8, div_2 );
			appendNode( text_9, div_2 );
			appendNode( text_11, div );
			appendNode( div_3, div );
			paginate_1._fragment.mount( div_3, null );
		},

		update: function ( changed, state ) {
			var each_block_value = state.perPageOptions;

			if ( 'perPageOptions' in changed || 'currentPerPage' in changed ) {
				for ( var i = 0; i < each_block_value.length; i += 1 ) {
					if ( each_block_4_iterations[i] ) {
						each_block_4_iterations[i].update( changed, state, each_block_value, each_block_value[i], i );
					} else {
						each_block_4_iterations[i] = create_each_block_4( state, each_block_value, each_block_value[i], i, component );
						each_block_4_iterations[i].create();
						each_block_4_iterations[i].mount( select, null );
					}
				}

				for ( ; i < each_block_4_iterations.length; i += 1 ) {
					each_block_4_iterations[i].unmount();
					each_block_4_iterations[i].destroy();
				}
				each_block_4_iterations.length = each_block_value.length;
			}

			if ( text_5_value !== ( text_5_value = (state.currentPage - 1) * state.currentPerPage ? (state.currentPage - 1) * state.currentPerPage : 1 ) ) {
				text_5.data = text_5_value;
			}

			if ( text_7_value !== ( text_7_value = ( 'Math' in state ? state.Math : Math ).min(state.processedRows.length, state.currentPerPage * state.currentPage) ) ) {
				text_7.data = text_7_value;
			}

			if ( text_9_value !== ( text_9_value = state.processedRows.length ) ) {
				text_9.data = text_9_value;
			}

			if ( !paginate_1_updating && 'selectedPage' in changed ) {
				paginate_1_updating = true;
				paginate_1._set({ selected: state.selectedPage });
				paginate_1_updating = false;
			}

			paginate_1._context.state = state;

			var paginate_1_changes = {};

			if ( 'rows' in changed||'currentPerPage' in changed ) paginate_1_changes.pageCount = state.rows.length / state.currentPerPage;

			if ( Object.keys( paginate_1_changes ).length ) paginate_1.set( paginate_1_changes );
		},

		unmount: function () {
			detachNode( div );

			for ( var i = 0; i < each_block_4_iterations.length; i += 1 ) {
				each_block_4_iterations[i].unmount();
			}
		},

		destroy: function () {
			destroyEach( each_block_4_iterations, false, 0 );

			removeListener( select, 'change', change_handler );
			paginate_1.destroy( false );
		}
	};
}

function click_handler ( event ) {
	this.click();
}

function click_handler_1 ( event ) {
	var component = this._svelte.component;
	var each_block_value_1 = this._svelte.each_block_value_1, x = this._svelte.x, column = each_block_value_1[x];
	component.sort(x);
}

function click_handler_2 ( event ) {
	var component = this._svelte.component;
	var each_block_value_2 = this._svelte.each_block_value_2, y = this._svelte.y, row = each_block_value_2[y];
	component.click(row);
}

function DataTable ( options ) {
	options = options || {};
	this._state = assign( template.data(), options.data );

	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};

	this._handlers = Object.create( null );

	this._root = options._root || this;
	this._yield = options._yield;

	this._torndown = false;
	this._oncreate = [];
	this._bindings = [];

	this._fragment = create_main_fragment( this._state, this );

	if ( options.target ) {
		this._fragment.create();
		this._fragment.mount( options.target, null );
	}

	callAll(this._oncreate);
	callAll(this._bindings);

	if ( options._root ) {
		options._root._oncreate.push( template.oncreate.bind( this ) );
	} else {
		template.oncreate.call( this );
	}
}

assign( DataTable.prototype, template.methods, proto );

DataTable.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = assign( {}, oldState, newState );
	dispatchObservers( this, this._observers.pre, newState, oldState );
	this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
	callAll(this._oncreate);
	callAll(this._bindings);
};

DataTable.prototype.teardown = DataTable.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	if ( detach !== false ) this._fragment.unmount();
	this._fragment.destroy();
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

exports.DataTable = DataTable;

}((this.app = this.app || {})));

(function webpackUniversalModuleDefinition(root, factory) {
	//Test Comment
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	//Test Comment
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	//Test Comment
	else if(typeof exports === 'object')
		exports["CollectionPathHelper"] = factory();
	//Test Comment
	else
		root["CollectionPathHelper"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(7);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(11);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(50);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(10),
    isObjectLike = __webpack_require__(24);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(6);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(20);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(32),
    getValue = __webpack_require__(37);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(3),
    isKey = __webpack_require__(19),
    stringToPath = __webpack_require__(25),
    toString = __webpack_require__(54);

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(5),
    getRawTag = __webpack_require__(22),
    objectToString = __webpack_require__(23);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var isSymbol = __webpack_require__(4);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(14);

var _objectSpread2 = _interopRequireDefault(__webpack_require__(15));

const lodashGet = __webpack_require__(17);

const lodashSet = __webpack_require__(57);
/**
 * @class CollectionPathHelper
 * @constructor
 */


class CollectionPathHelper {
  /**
   * Method that returns a boolean (true|false) when
   * an object is a RegExp Javascript object or not
   * This is the simplified, portable version of the objectIsRegExp validator {@link BoolValidator.objectIsRegExp}
   * @param {*} property
   * @return {boolean|String}
   */
  static objectIsRegExp(property) {
    if (!(typeof property === 'object' && property !== null)) {
      return false;
    }

    if (!property.constructor) {
      return false;
    }

    return property.constructor.name === 'RegExp';
  }
  /**
   * Method that returns either a boolean (true|false) either an error message as a string when
   * a string starts with a certain template defined under "needle" argument
   * This is the simplified, portable version of the stringStartsWith validator {@link BoolValidator.stringStartsWith}
   * @param {*} property
   * @param {Object=} options
   * @param {Number=} options.needle - Either a string, either a regex that defines a range. The regex expressions passed to this parameter need to start with the symbol "^"
   * @param {Boolean=} options.failWithMsg
   * @param {String=} options.path
   * @param {String=} options.validator
   * @param {String=} options.varName
   * @return {boolean|String}
   */


  static stringStartsWith(property, options) {
    let defaultOptions = {
      failWithMsg: false,
      path: 'property',
      validator: 'stringStartsWith',
      varName: 'property'
    };
    options = (0, _objectSpread2.default)({}, defaultOptions, options);

    if (!(typeof property || property instanceof String)) {
      return false;
    }

    if (typeof options.needle === 'string' || options.needle instanceof String) {
      if (!property.startsWith(options.needle)) {
        return false;
      }
    } else if (CollectionPathHelper.objectIsRegExp(options.needle)) {
      if (!options.needle.test(property)) {
        return false;
      }
    } else {
      return false;
    }

    return true;
  }
  /**
   * For a given string and a part of the string given under "discardedStrings" property,
   * it will return the difference between initial string and discarded one.
   * This is the simplified, portable version of the getRemainingString method {@link BoolValidator.getRemainingString}
   * @param {String} property
   * @param {Object=} options
   * @param {String[]=} options.discardedStrings
   * @param {Boolean=} options.global
   * @return {boolean|String}
   */


  static getRemainingString(property, options) {
    options = (0, _objectSpread2.default)({}, {
      discardedStrings: [''],
      global: false
    }, options);

    if (typeof property === 'string' || property instanceof String) {
      for (let i = 0; i < options.discardedStrings.length; i++) {
        property = options.global ? property.split(options.discardedStrings[i]).join('') : property.replace(options.discardedStrings[i], '');
      }
    }

    return property;
  }
  /**
   * For a given path string, it will return the type of the first fragment within the path
   * @param {String} path - the path that would be exploded and evaluated
   * @returns {String}
   */


  static getStartType(path) {
    if ((typeof path === 'string' || path instanceof String) && path.length > 0) {
      var endBracket;

      if (path[0] === '[' && (endBracket = path.indexOf(']', 1)) > -1) {
        if (path.substring(0, endBracket).indexOf(',', 2) == -1) return 'array';
      }

      return 'object';
    }

    return 'unknown';
  }
  /**
   * This takes a path string according to Lodash specifications for collections and explodes it into multiple path fragments
   * @param {String} path
   * @returns {String[]}
   */


  static explodePath(path) {
    if (Array.isArray(path)) {
      return path;
    }

    return path.split('.').reduce((result, partial) => {
      var fragmentPartial;

      while ((fragmentPartial = partial.indexOf('[', 1)) !== -1) {
        var newFragment = partial.slice(0, fragmentPartial);
        result.push(newFragment);
        partial = CollectionPathHelper.getRemainingString(partial, {
          discardedStrings: [newFragment]
        });
      }

      result.push(partial);
      return result;
    }, []).reduce((result, q) => {
      if (q.slice(1)) result.push(q);
      return result;
    }, []);
  }
  /**
   * This implodes an array of pathFragments into a valid path
   * @param {String[]} pathFragments
   * @return {String}
   */


  static implodePath(pathFragments) {
    return pathFragments.reduce((path, fragment) => {
      switch (CollectionPathHelper.getStartType(fragment)) {
        case 'object':
          path = path === '' ? `${path}${fragment}` : `${path}.${fragment}`;
          break;

        case 'array':
          path = `${path}${fragment}`;
          break;
      }

      return path;
    }, '');
  }
  /**
   * For a given path, it removes pathFragments from either the start or the end of it.
   * Also you can set how many fragments to remove. By default just one fragment is removed.
   * @param {String} path
   * @param {Object=} options
   * @param {Number=} options.count - Default: 1
   * @param {String=} options.termination Default: 'end' - (Possible options: "start" and "end")
   * @param {String=} options.pathIsString Used for storing transience state
   * @returns {String}
   */


  static removePathLevels(path, options) {
    options = (0, _objectSpread2.default)({}, {
      count: 1,
      termination: 'end',
      pathIsString: typeof path === 'string' || path instanceof String
    }, options);
    let pathFragments;

    if (options.pathIsString && path.length > 0) {
      pathFragments = CollectionPathHelper.explodePath(path);
    } else {
      pathFragments = path;
    }

    if (options.termination === 'end') {
      pathFragments.splice(pathFragments.length - options.count, options.count);
    } else if (options.termination === 'start') {
      pathFragments.splice(0, options.count);
    }

    if (options.pathIsString && path.length > 0) {
      return CollectionPathHelper.implodePath(pathFragments);
    }

    return pathFragments;
  }
  /**
   * This will get the name of the first dynamic variable defined in path
   * Works in both object path definitions and array definitions. For both print interpolators and path ones.
   * @param path
   * @returns {*}
   */


  static getFirstDynamicVariableName(path) {
    let regex = new RegExp(/[^{{\}\}]+(?=\}\})/);
    return path.match(regex)[0];
  }
  /**
   * Returns true or false if the start of the path is dynamic or not
   * This is bound to one fragment at time and should be used accordingly.
   * @param path
   * @returns {boolean}
   */


  static isPathStartDynamic(path) {
    return [0, 1].includes(path.indexOf('{'));
  }
  /**
   * Get By path
   * @param collection
   * @param path
   * @param def
   * @returns {*}
   */


  static get(collection, path, def) {
    if (!((typeof path === 'string' || path instanceof String) && path.length > 0 || Array.isArray(path) && path.length > 0)) {
      return collection;
    }

    if ((typeof path === 'string' || path instanceof String) && path.startsWith('.')) {
      path = path.replace('.', '');
    }

    let result = lodashGet(collection, path, 'undefined');

    if (result === 'undefined') {
      path = CollectionPathHelper.explodePath(path);
      result = lodashGet(collection, path, 'undefined');
    }

    return result;
  }
  /**
   * Set by path
   * @param {Object} options
   * @param {Object|Array|*} options.data
   * @param {Array|String} options.path
   * @param {*} options.value
   * @param {String} options.mode - ("lodash" or "precise"). Defaults to "precise"
   * @param {Boolean=} options.ignoreRootPath - (true|false). If this is true, if an empty path is passed, the initial data will be returned with no alterations (This works only on mode: "precise")
   * @param {*=} options.filling - The value passed to this parameter will be used to create dummy elements during array creation (This works only on mode: "precise")
   * @param {Object=} transience - Used to track processing progress
   * @returns {*}
   */


  static set(options, transience) {
    options = (0, _objectSpread2.default)({}, {
      data: null,
      path: '',
      value: null,
      mode: 'lodash',
      ignoreRootPath: false,
      filling: null
    }, options);
    /** Might be unnecesary */

    if (typeof transience === 'undefined') {
      transience = {
        data: options.data
      };
    } // if (path.length === 0) {
    //     return value;
    // }
    // if (!(((typeof path === 'string' || path instanceof String) && path.length > 0) || (Array.isArray(path) && path.length > 0))) {
    //     return collection;
    // }
    //


    if (options.mode === 'precise') {
      /** Mode: "precise" @TODO WIP - This is work in progress */
      options.path = CollectionPathHelper.explodePath(options.path);
      let key = '';

      for (let i = 0; i < options.path.length; i++) {
        if (CollectionPathHelper.getStartType(options.path[i]) === 'array') {
          key = CollectionPathHelper.extractFromArrayNotation(options.path[i]);

          if (!Array.isArray(transience.data)) {
            transience.data = [];
          }
        } else if (CollectionPathHelper.getStartType(options.path[i]) === 'object') {
          key = options.path[i];

          if (!Array.isArray(transience.data)) {
            transience.data = {};
          }
        }

        console.log('bla');

        if (i === options.path.length - 1) {
          transience.data[key] = options.value;
          return options.data;
        }

        CollectionPathHelper.set(options, {
          data: transience.data[key]
        });
      }
    } else {
      /** Mode: "lodash" */
      return lodashSet(options.data, options.path, options.value);
    }
  }
  /**
   * This method will get all possible subpaths out of one path
   * For a path like 'lorem.ipsum[2][1].foo' the subpaths would be:
   * ['', 'lorem', 'lorem.ipsum', 'lorem.ipsum[2]', 'lorem.ipsum[2][1]', 'lorem.ipsum[2][1].foo']
   * @param {String} property
   * @param {Object=} options
   * @param {Boolean=} options.ignoreRoot - This would ignore the empty string at the beginning. (Default false)
   * @param {Boolean=} options.ignoreFull - This would ignore the full path and the end. (Default false)
   * @return {String[]}
   */


  static getSubPaths(property, options) {
    options = (0, _objectSpread2.default)({}, {
      ignoreRoot: false,
      ignoreFull: false
    }, options);
    let result = [];
    if (!(typeof property === 'string' || property instanceof String)) return result;
    if (!options.ignoreRoot) result.push('');
    CollectionPathHelper.explodePath(property).reduce((accumulatedPath, path) => {
      accumulatedPath.push(path);
      result.push(CollectionPathHelper.implodePath(accumulatedPath));
      return accumulatedPath;
    }, []);
    if (result.length > 0 && options.ignoreFull) result.pop();
    return result;
  }
  /**
   * This method replaces the array notations within a path with a certain string defined under options.string argument
   * @param {String} property
   * @param {Object=} options
   * @param {String} options.string - the string which would be put in place of arrays
   * @return {String}
   */


  static replacePathArraysWithString(property, options) {
    options = (0, _objectSpread2.default)({}, {
      string: ''
    }, options);
    return CollectionPathHelper.implodePath(CollectionPathHelper.explodePath(property).map(ep => {
      return CollectionPathHelper.getStartType(ep) === 'array' ? options.string : ep;
    }));
  }
  /**
   * @TODO WIP
   * Method that selectively filters out certain notations or fragments from a collection path.
   * Mainly designed for filtering out path fragments when working with recursive contexts in collections.
   * @param {Object=} options
   * @param {String=} options.path - the initial path on which the filtering out process will be performed
   * @param {Boolean=} options.foArrayNotations - filter out array notations (E.g. "[2]", "[{{x}}]")
   * @param {Boolean=} options.foObjectNotations - filter out object notations (E.g. "dolor", "(2, 3)", ".lorem")
   * @param {Boolean=} options.foIntervalNotations - filter out interval notations (E.g. "(2, 3)", "[2, {{amet}}]", "({{sitConsecteur34_dolor}},3]"). Keep in mind that if you activate "foObjectNotations", interval notations will be filtered out automatically since those are a subset of object notations.
   * @param {Boolean=} options.foInitialDot - filter out the initial dot in paths. (E.g ".lorem.ipsum[2]" will become "lorem.ipsum[2]")
   * @return {*}
   */


  static filterOutPath(options) {
    let defaultOptions = {
      path: '',
      foArrayNotations: false,
      foObjectNotations: false,
      foIntervalNotations: false,
      foInitialDot: false
    };
    options = (0, _objectSpread2.default)({}, defaultOptions, options);
    let convertedPath = options.path;

    if (options.foArrayPath) {
      convertedPath = convertedPath.replace(/\s*\[.*?\]\s*/gm, '');
    }

    if (options.foObjectPath) {
      convertedPath = convertedPath.replace(/[a-zA-Z.]+/gm, '');
    }

    if (options.foInitialDot && convertedPath.startsWith('.')) {
      convertedPath = convertedPath.replace('.', '');
    }

    return convertedPath;
  }
  /**
   * Gets an iterator name
   * @param {*} index
   * @param {Object=} options
   * @param {String=} options.prefix
   * @returns {*}
   */


  static getVarName(index, options) {
    let defaultOptions = {
      prefix: []
    };
    options = (0, _objectSpread2.default)({}, defaultOptions, options);
    return `${options.prefix}${index}`;
  }
  /**
   * This extracts the content out of array notations
   * @param {*} property
   * @param {Object=} options
   * @return {String|Number}
   */


  static extractFromArrayNotation(property, options) {
    let defaultOptions = {};
    options = (0, _objectSpread2.default)({}, defaultOptions, options);

    if (!(typeof property === 'string' || property instanceof String)) {
      return property;
    }

    let regex = /^\[([^,]{1,})\]$/g;
    var matches = regex.exec(property);

    if (matches !== null && typeof matches[1] !== 'undefined') {
      if (!isNaN(parseFloat(matches[1])) && isFinite(matches[1])) {
        return Number(matches[1]);
      }

      return matches[1];
    }

    return property;
  }
  /**
   * Returns true or false if a fragment is an iterator or not
   * @param {String} fragment
   */


  static isPathItr(fragment) {
    let regex = /^([\[|\.]?itr\d*[\]]?)$/g;
    return regex.test(fragment);
  }
  /**
   * Returns a collection of path iterators that can be easily predictable.
   * By default it returns a key/value pair on an object
   * @param {Object=} options
   * @param {String=} options.path - the path from which the iterators values will be extracted
   * @param {Boolean=} options.returnArray - return an array of objects which also tracks down NPath and Level
   * @returns {Array}
   */


  static getPathIterators(options) {
    options = (0, _objectSpread2.default)({}, {
      path: '',
      returnArray: false
    }, options);
    return !(typeof options.path === 'string' || options.path instanceof String) ? options.returnArray ? [] : {} : options.returnArray ? this.explodePath(options.path).reduce((accumulator, ep, i, original) => {
      let value = this.getStartType(ep) === 'array' ? ep.slice(1, ep.length - 1) : ep;

      if (CollectionPathHelper.isPathItr(value)) {
        value = '__iterator__';
      }

      accumulator.push({
        level: i,
        varName: this.getVarName(i, {
          prefix: 'itr'
        }),
        NPath: this.implodePath(original.slice(0, i + 1)),
        value: isFinite(value) ? Number(value) : value
      });
      return accumulator;
    }, []) : this.explodePath(options.path).reduce((accumulator, ep, i) => {
      let value = this.getStartType(ep) === 'array' ? ep.slice(1, ep.length - 1) : ep;

      if (CollectionPathHelper.isPathItr(value)) {
        value = '__iterator__';
      }

      accumulator[this.getVarName(i, {
        prefix: 'itr'
      })] = isFinite(value) ? Number(value) : value;
      return accumulator;
    }, {});
  }
  /**
   * For a given path will return a signature
   * @param {Object=} options
   * @param {Object=|Array=} options.path - the path from which the signature will be extracted
   * @param {Boolean=} options.getPath - (true|false) If true with also include a path with iterators for array fragments
   * @param {*=} options.arrayNotation - ("iterator"|"actual"|*) If this is set as "iterator" then array notations will have iterator in them. If this is set to "actual" it will have the actual values of the arrayNotations. If not arrays will have whatever is passed
   * @param {*=} options.pathIsString - Used for transient state
   * @returns {Object}
   */


  static getPathSignature(options) {
    options = (0, _objectSpread2.default)({}, {
      getPath: false,
      arrayNotation: 'iterator' // pathIsString: typeof options.path === 'string' || options.path instanceof String,

    }, options);
    options.pathIsString = typeof options.path === 'string' || options.path instanceof String;
    let signature = {
      length: 0,
      objects: 0,
      arrays: 0,
      schema: [],
      objProps: []
    };

    if (options.getPath && options.getPath === true) {
      signature.path = [];
    }
    /** Try to work with either strings, either arrays of path fragments. If not, return the empty signature*/


    let exploded;

    if (options.pathIsString && options.path.length > 0) {
      exploded = CollectionPathHelper.explodePath(options.path);
    } else if (Array.isArray(options.path)) {
      exploded = options.path;
    } else {
      return signature;
    }

    signature.length = exploded.length;

    for (let ei = 0; ei < exploded.length; ei++) {
      if (CollectionPathHelper.getStartType(exploded[ei]) === 'object') {
        signature.objects += 1;
        signature.schema.push('object');
        signature.objProps.push(exploded[ei]);

        if (signature.path) {
          signature.path.push(exploded[ei]);
        }
      } else {
        signature.arrays += 1;
        signature.schema.push('array');

        if (signature.path) {
          if (options.arrayNotation === 'iterator') {
            signature.path.push(`[itr${ei}]`);
          } else if (options.arrayNotation === 'actual') {
            signature.path.push(exploded[ei]);
          } else {
            signature.path.push(`[${options.arrayNotation}]`);
          }
        }
      }
    }

    if (signature.path) {
      signature.path = CollectionPathHelper.implodePath(signature.path);
    }

    return signature;
  }
  /**
   * Verifies if options.subpath is a subpath of options.path. E.g. p1.p2[2] is a subpath of p1.p2[2].p3
   * @param {Object=} options
   * @param {Object} options.subpath - the path which will be verified against options.path
   * @param {Object} options.sameSizeCheck - the path which will be verified against options.path
   * @param {Object} options.path - The path to which the subpath will be verified against
   * @returns {Boolean}
   */


  static isSubPath(options) {
    if (typeof options.subpath === 'string' || options.subpath instanceof String) {
      options.subpath = CollectionPathHelper.getPathIterators({
        path: options.subpath
      });
    } else if (!(options.subpath !== null && typeof options.subpath === 'object' && !Array.isArray(options.subpath))) {
      return false;
    }

    if (typeof options.path === 'string' || options.path instanceof String) {
      options.path = CollectionPathHelper.getPathIterators({
        path: options.path
      });
    } else if (!(options.path !== null && typeof options.path === 'object' && !Array.isArray(options.path))) {
      return false;
    }

    if (options.sameSizeCheck && Object.keys(options.subpath).length !== Object.keys(options.path).length) {
      return false;
    }

    for (let property in options.subpath) {
      if (options.path[property] === '__iterator__') {} else if (options.subpath[property] !== options.path[property]) {
        return false;
      }
    }

    return true;
  }
  /**
   * @TODO add unit tests about booleans, nulls, undefined and other similar stuff (safe tests)
   * @param {Object} options
   * @param {Object} options.in - the data from which options.path will extract data
   * @param {Object} options.path - the path that will point to the data desired to be extracted
   * @param {Boolean} options.source - include the source with each value. Instead of being just the value in the array, now you will have an object with {value, source}
   * @param {Object} options.default - the default which will be returned if the data couldn't be found
   * @param {Object=} transience - Object to store transient state of the processing
   * @param {Object=} transience.initial - the pristine initial collection that was passed
   * @param {Object=} transience.level - The level of the iteration
   * @param {Object=} transience.cursor - The current cursor. Basically this indicates where the method is processing currently
   * @param {Object=} transience.pathItrSign - Passed path iterator signature. Based on this we will take the decision if it matches or not a value.
   * @param {Object=} transience.result - The composed result
   */


  static getComposite(options, transience) {
    if (typeof transience === 'undefined') {
      let defaultOptions = {
        default: undefined
      };
      options = (0, _objectSpread2.default)({}, defaultOptions, options);
      transience = {};
      transience.level = -1;
      transience.cursor = '';
      transience.pathItrSign = CollectionPathHelper.getPathIterators({
        path: options.path
      });
      transience.result = [];
    }

    if (options.in !== null && typeof options.in === 'object' && !Array.isArray(options.in)) {
      if (transience.cursor.charAt(0) === '.') {
        transience.cursor = transience.cursor.replace('.', '');
      }

      transience.level += 1;
      Object.entries(options.in).forEach(([key, value]) => {
        /** Updating cursor */
        transience.cursor = `${transience.cursor}.${key}`;
        let cursorItrSign = CollectionPathHelper.getPathIterators({
          path: transience.cursor
        });
        /** Continue just if is a subpath */

        if (CollectionPathHelper.isSubPath({
          subpath: cursorItrSign,
          path: transience.pathItrSign
        })) {
          let compRes = CollectionPathHelper.isSubPath({
            subpath: cursorItrSign,
            path: transience.pathItrSign,
            sameSizeCheck: true
          });

          if (compRes) {
            transience.result.push(value);
          }
          /** Recursive logic */


          if (value !== null && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length > 0 || Array.isArray(value) && value.length > 0) {
            CollectionPathHelper.getComposite({
              in: value
            }, transience);
          }
        }

        transience.cursor = CollectionPathHelper.removePathLevels(transience.cursor);
      });
      transience.level -= 1;
    } else if (Array.isArray(options.in)) {
      transience.level += 1;

      for (let i = 0; i < options.in.length; i++) {
        transience.cursor = `${transience.cursor}[${i}]`;
        let cursorItrSign = CollectionPathHelper.getPathIterators({
          path: transience.cursor
        });
        /** Continue just if is a subpath */

        if (CollectionPathHelper.isSubPath({
          subpath: cursorItrSign,
          path: transience.pathItrSign
        })) {
          if (CollectionPathHelper.isSubPath({
            subpath: cursorItrSign,
            path: transience.pathItrSign,
            sameSizeCheck: true
          })) {
            transience.result.push(options.in[i]);
          }

          CollectionPathHelper.getComposite({
            in: options.in[i]
          }, transience);
        }

        transience.cursor = CollectionPathHelper.removePathLevels(transience.cursor);
      }

      transience.level -= 1;
    } else {} // transience.schema = CollectionPathHelper.getComposite({in: options.in, cursor: transience.cursor, schema: transience.schema});

    /** Cleanup stage. This should be executed the last time before the main return */


    if (transience.level === -1) {
      /** Building the result */
      if (transience.result.length === 0) {
        return options.default;
      }

      if (transience.result.length === 1) {
        return transience.result[0];
      }

      return transience.result;
    }
  }
  /**
   * For a given collection it will return an array of all the possible paths
   * @param {Object=} options
   * @param {Object=|Array=} options.collection - the collection from which all the possible paths will be extracted
   * @param {Object=} transience - Object to store transient state of the processing
   * @returns {Array}
   */
  // static getAllPaths(options, transience) {
  //
  //
  //     if (BoolValidator.isObject(collection)) {
  //
  //         if (options.transience.cursor.charAt(0) === '.') {
  //             options.transience.cursor = options.transience.cursor.replace('.', '');
  //         }
  //
  //         options.transience.level += 1;
  //         for (let key in collection) {
  //
  //             /** Updating cursor */
  //             options.transience.cursor = `${options.transience.cursor}.${key}`;
  //             options.transience.context = collection[key];
  //             options.transience.currentIterators = ObjectHelper.getPathIterators(options.transience.cursor);
  //
  //             /** Push the iterator */
  //             options.transience.iterators.push({
  //                 contextPath: options.transience.cursor,
  //                 varName: ObjectHelper.getVarName(options.transience.level),
  //                 domainLevel: 0,
  //                 level: options.transience.level,
  //                 value: key
  //             });
  //
  //
  //             /** Recursive logic */
  //             if (BoolValidator.objectIsPopulated(collection[key])) {
  //                 collection[key] = await ObjectHelper.query(collection[key], options);
  //             } else if (BoolValidator.arrayIsPopulated(collection[key])) {
  //                 collection[key] = await ObjectHelper.query(collection[key], options);
  //             }
  //
  //             options.transience.cursor = PathHelper.removePathLevels(options.transience.cursor);
  //
  //         }
  //         options.transience.level -= 1;
  //
  //     } else if (BoolValidator.isArray(collection)) {
  //         options.transience.level += 1;
  //         for (let i = 0; i < collection.length; i++) {
  //             options.transience.cursor = `${options.transience.cursor}[${i}]`;
  //             options.transience.context = collection[i];
  //             options.transience.currentIterators = ObjectHelper.getPathIterators(options.transience.cursor);
  //
  //             /** Push the iterator */
  //             options.transience.iterators.push({
  //                 contextPath: options.transience.cursor,
  //                 varName: ObjectHelper.getVarName(options.transience.level),
  //                 domainLevel: 0,
  //                 level: options.transience.level,
  //                 value: i
  //             });
  //
  //             collection[i] = await ObjectHelper.query(collection[i], options);
  //
  //             options.transience.cursor = PathHelper.removePathLevels(options.transience.cursor);
  //         }
  //         options.transience.level -= 1;
  //     } else {
  //         return collection;
  //     }
  // }


}

if ( true && module.exports) {
  module.exports = CollectionPathHelper;
}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(16);

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

module.exports = _objectSpread;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__(18);

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__(9),
    toKey = __webpack_require__(12);

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__(3),
    isSymbol = __webpack_require__(4);

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(21)))

/***/ }),
/* 21 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(5);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(26);

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var memoize = __webpack_require__(27);

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(28);

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(29),
    mapCacheDelete = __webpack_require__(49),
    mapCacheGet = __webpack_require__(51),
    mapCacheHas = __webpack_require__(52),
    mapCacheSet = __webpack_require__(53);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(30),
    ListCache = __webpack_require__(42),
    Map = __webpack_require__(48);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(31),
    hashDelete = __webpack_require__(38),
    hashGet = __webpack_require__(39),
    hashHas = __webpack_require__(40),
    hashSet = __webpack_require__(41);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(0);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(33),
    isMasked = __webpack_require__(34),
    isObject = __webpack_require__(8),
    toSource = __webpack_require__(36);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(10),
    isObject = __webpack_require__(8);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(35);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(6);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 36 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 37 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),
/* 38 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(0);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(0);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(0);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(43),
    listCacheDelete = __webpack_require__(44),
    listCacheGet = __webpack_require__(45),
    listCacheHas = __webpack_require__(46),
    listCacheSet = __webpack_require__(47);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),
/* 43 */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(1);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(1);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(1);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(1);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(7),
    root = __webpack_require__(6);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(2);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),
/* 50 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(2);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(2);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(2);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var baseToString = __webpack_require__(55);

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(5),
    arrayMap = __webpack_require__(56),
    isArray = __webpack_require__(3),
    isSymbol = __webpack_require__(4);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),
/* 56 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var baseSet = __webpack_require__(58);

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `_.setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.set(object, 'a[0].b.c', 4);
 * console.log(object.a[0].b.c);
 * // => 4
 *
 * _.set(object, ['x', '0', 'y', 'z'], 5);
 * console.log(object.x[0].y.z);
 * // => 5
 */
function set(object, path, value) {
  return object == null ? object : baseSet(object, path, value);
}

module.exports = set;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(59),
    castPath = __webpack_require__(9),
    isIndex = __webpack_require__(62),
    isObject = __webpack_require__(8),
    toKey = __webpack_require__(12);

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {});
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

module.exports = baseSet;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(60),
    eq = __webpack_require__(11);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(61);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(7);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),
/* 62 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ })
/******/ ]);
});
//# sourceMappingURL=path.Helper.js.map
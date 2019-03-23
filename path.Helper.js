const Lodash = require('lodash');
let BoolValidator = process.nextTick(() => BoolValidator = require('./bool.Validator'));

/**
 * @class ObjectHelper
 * @constructor
 */
class PathHelper {

    /**
     * Method that returns a boolean (true|false) when
     * an object is a RegExp Javascript object or not
     * This is the simplified, portable version of the objectIsRegExp validator {@link BoolValidator.objectIsRegExp}
     * @param {*} property
     * @param {Object=} options
     * @param {Boolean=} options.failWithMsg
     * @param {String=} options.path
     * @param {String=} options.validator
     * @param {String=} options.varName
     * @return {boolean|String}
     */
    static objectIsRegExp(property, options) {
        let defaultOptions = {
            failWithMsg: false,
            path: 'property',
            validator: 'objectIsRegExp',
            varName: 'property',
        };

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
            varName: 'property',
        };

        options = {...defaultOptions, ...options};

        if (!(typeof property || property instanceof String)) {
            return false;
        }

        if (typeof options.needle === 'string' || options.needle instanceof String) {
            if (!property.startsWith(options.needle)) {
                return false;
            }
        } else if (PathHelper.objectIsRegExp(options.needle)) {
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
        let defaultOptions = {
            discardedStrings: [''],
            global: false
        };

        options = {...defaultOptions, ...options};

        if (typeof property === 'string' || property instanceof String) {
            if (options.global) {
                for (let i = 0; i < options.discardedStrings.length; i++) {
                    property = property.split(options.discardedStrings[i]).join('');
                }
            } else {
                for (let i = 0; i < options.discardedStrings.length; i++) {
                    property = property.replace(options.discardedStrings[i], '');
                }
            }
        }

        return property;
    }

    /**
     * For a given path string, it will return the type of the first fragment within the path
     * @param {String} path
     * @returns {String}
     */
    static getStartType(path) {
        if ((typeof path === 'string' || path instanceof String) && path.length > 0) {
            if (path.charAt(0) === '[') {
                return 'array';
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
        let pathFragments = [];
        let splitted = path.split('.');

        let regex = /^([\{\[\(\w]{1}[a-z\{\}0-9, \)\]]*)([\[]?.*[\]]?)/g;

        let fragments = [];

        for (let i = 0; i < splitted.length; i++) {
            fragments = regex.exec(splitted[i]);
            regex.lastIndex = 0;
            if (fragments !== null) {
                if (fragments[0] === fragments[1]) {
                    pathFragments.push(fragments[0]);
                } else {
                    for (let t = 1; t < fragments.length; t++) {
                        pathFragments.push(fragments[t]);
                    }
                }
            }
        }


        // let pathFragments = [];
        // let remainingPath = path;
        // let initialPath = Lodash.cloneDeep(path);
        // let startingIndex = 0;
        // let fragment = '';
        // if (PathHelper.stringStartsWith(remainingPath, {needle: /^[1-9a-zA-Z]/})) {
        //     startingIndex = 0;
        //     let dotSeparatorIndex = remainingPath.indexOf('.');
        //     let squareBracketSeparatorIndex = remainingPath.indexOf('[');
        //     let cuttingIndex = remainingPath.length;
        //     if (dotSeparatorIndex > -1) {
        //         cuttingIndex = dotSeparatorIndex;
        //     }
        //
        //     if (squareBracketSeparatorIndex > -1 && squareBracketSeparatorIndex < cuttingIndex) {
        //         cuttingIndex = squareBracketSeparatorIndex;
        //     }
        //
        //     fragment = remainingPath.slice(startingIndex, cuttingIndex);
        //     pathFragments.push(fragment);
        //     remainingPath = PathHelper.getRemainingString(remainingPath, {discardedStrings: [fragment]});
        // } else if (PathHelper.stringStartsWith(remainingPath, {needle: '.'})) {
        //     remainingPath = PathHelper.getRemainingString(remainingPath, {discardedStrings: ['.']});
        // } else if (PathHelper.stringStartsWith(remainingPath, {needle: '{{'})) {
        //     startingIndex = 0;
        //     let dotSeparatorIndex = remainingPath.indexOf('.');
        //     let squareBracketSeparatorIndex = remainingPath.indexOf('[');
        //     let cuttingIndex = remainingPath.length;
        //     if (dotSeparatorIndex > -1) {
        //         cuttingIndex = dotSeparatorIndex;
        //     }
        //
        //     if (squareBracketSeparatorIndex > -1 && squareBracketSeparatorIndex < cuttingIndex) {
        //         cuttingIndex = squareBracketSeparatorIndex;
        //     }
        //
        //     fragment = remainingPath.slice(startingIndex, cuttingIndex);
        //     pathFragments.push(fragment);
        //     remainingPath = PathHelper.getRemainingString(remainingPath, {discardedStrings: [fragment]});
        // } else if (PathHelper.stringStartsWith(remainingPath, {needle: '['})) {
        //     startingIndex = 0;
        //     let dotSeparatorIndex = remainingPath.indexOf('.');
        //     let squareBracketSeparatorIndex = PathHelper.getRemainingString(remainingPath, {discardedStrings: '['}).indexOf('[');
        //     let cuttingIndex = remainingPath.length;
        //     if (dotSeparatorIndex > -1) {
        //         cuttingIndex = dotSeparatorIndex;
        //     }
        //
        //     if (squareBracketSeparatorIndex > -1 && squareBracketSeparatorIndex < cuttingIndex) {
        //         cuttingIndex = squareBracketSeparatorIndex + 1;
        //     }
        //
        //     fragment = remainingPath.slice(startingIndex, cuttingIndex);
        //     pathFragments.push(fragment);
        //     remainingPath = PathHelper.getRemainingString(remainingPath, {discardedStrings: [fragment]});
        // }
        //
        // if (((typeof remainingPath === 'string' || remainingPath instanceof String) && remainingPath.length > 0) && remainingPath !== initialPath) {
        //     pathFragments = pathFragments.concat(PathHelper.explodePath(remainingPath));
        // }
        //
        return pathFragments;


    }

    /**
     * This implodes an array of pathFragments into a valid path
     * @param {String[]} pathFragments
     * @return {String}
     */
    static implodePath(pathFragments) {
        let path = '';
        for (let i = 0; i < pathFragments.length; i++) {
            if (PathHelper.getStartType(pathFragments[i]) === 'object') {
                if (path === '') {
                    path = `${path}${pathFragments[i]}`;
                } else {
                    path = `${path}.${pathFragments[i]}`;
                }
            } else if (PathHelper.getStartType(pathFragments[i]) === 'array') {
                path = `${path}${pathFragments[i]}`;
            }
        }

        return path;
    }

    /**
     * For a given path, it removes pathFragments from either the start or the end of it.
     * Also you can set how many fragments to remove. By default just one fragment is removed.
     * @param {String} path
     * @param {Object=} options
     * @param {Number=} options.count - Default: 1
     * @param {String=} options.termination Default: 'end' - (Possible options: "start" and "end")
     * @returns {String}
     */
    static removePathLevels(path, options) {
        let defaultOptions = {
            count: 1,
            termination: 'end'
        };

        options = {...defaultOptions, ...options};

        let pathFragments = PathHelper.explodePath(path);

        if (options.termination === 'end') {
            pathFragments.splice(pathFragments.length - options.count, options.count);
        } else if (options.termination === 'start') {
            pathFragments.splice(0, options.count);
        }

        return PathHelper.implodePath(pathFragments);
    }

    /**
     * This will get the name of the first dynamic variable defined in path
     * Works in both object path definitions and array definitions. For both print interpolators and path ones.
     * @param path
     * @returns {*}
     */
    static getFirstDynamicVariableName(path) {
        let regex = new RegExp(/[^{{\}\}]+(?=\}\})/g);
        return path.match(regex)[0];
    }

    /**
     * Returns true or false if the start of the path is dynamic or not
     * This is bound to one fragment at time and should be used accordingly.
     * @param path
     * @returns {boolean}
     */
    static isPathStartDynamic(path) {
        return path.indexOf('{') === 0 || path.indexOf('{') === 1;
    }

    /**
     * Get By path
     * @param collection
     * @param path
     * @returns {*}
     */
    static get(collection, path) {
        if (!(BoolValidator.stringIsPopulated(path) || BoolValidator.arrayIsPopulated(path))) {
            return collection;
        }
        if (BoolValidator.isString(path) && path.startsWith('.')) {
            path = path.replace('.', '');
        }

        return Lodash.get(collection, path, 'undefined');
    }

    /**
     * Get By path
     * @param {Array|Object|*} collection
     * @param {String} path
     * @param {*} value
     * @returns {*}
     */
    static set(collection, path, value) {
        if (path.length === 0) {
            return value;
        }
        if (!(((typeof path === 'string' || path instanceof String) && path.length > 0) || (Array.isArray(path) && path.length > 0))) {
            return collection;
        }

        if ((typeof path === 'string' || path instanceof String) && path.startsWith('.')) {
            path = path.replace('.', '');
        }

        return Lodash.set(collection, path, value);
    }
}

if (typeof module !== 'undefined' && module.exports) { module.exports = PathHelper; }

const lodashGet = require('lodash/get');
const lodashSet = require('lodash/set');

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
        options = {...{
            discardedStrings: [''],
            global: false
        },
        ...options};

        if (typeof property === 'string' || property instanceof String) {
            for (let i = 0; i < options.discardedStrings.length; i++) {
                property = options.global
                    ? property.split(options.discardedStrings[i]).join('')
                    : property.replace(options.discardedStrings[i], '');
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
                partial = CollectionPathHelper.getRemainingString(partial, { discardedStrings: [newFragment] });
            }
            result.push(partial); return result;
        }, []).reduce((result, q) => {
            if (q.slice(1)) result.push(q); return result;
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
                path = (path === '') ? `${path}${fragment}` : `${path}.${fragment}`;
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
        options = {...{
            count: 1,
            termination: 'end',
            pathIsString: typeof path === 'string' || path instanceof String,
        },
        ...options };

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
        if (!(((typeof path === 'string' || path instanceof String) && path.length > 0) || (Array.isArray(path) && path.length > 0))) {
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
        options = {...{
            data: null,
            path: '',
            value: null,
            mode: 'lodash',
            ignoreRootPath: false,
            filling: null
        },
        ...options };

        /** Might be unnecesary */
        if (typeof transience === 'undefined') {
            transience = {
                data: options.data
            };
        }
        // if (path.length === 0) {
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

                if (i === (options.path.length - 1)) {
                    transience.data[key] = options.value;
                    return options.data;
                }
                CollectionPathHelper.set(options, {data: transience.data[key]});

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
        options = {...{
            ignoreRoot: false,
            ignoreFull: false
        },
        ...options};

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
        options = {...{
            string: '',
        },
        ...options};

        return CollectionPathHelper.implodePath(CollectionPathHelper.explodePath(property).map((ep) => {
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

        options = {...defaultOptions, ...options};

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

        options = {...defaultOptions, ...options};

        return `${options.prefix}${index}`;
    }

    /**
     * This extracts the content out of array notations
     * @param {*} property
     * @param {Object=} options
     * @return {String|Number}
     */
    static extractFromArrayNotation(property, options) {
        let defaultOptions = {
        };

        options = {...defaultOptions, ...options};

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
        options = {...{
            path: '',
            returnArray: false
        },
        ...options};

        return !(typeof options.path === 'string' || options.path instanceof String)
            ? options.returnArray ? [] : {}
            : options.returnArray
                ? this.explodePath(options.path).reduce((accumulator, ep, i, original) => {
                    let value = (this.getStartType(ep) === 'array') ? ep.slice(1, ep.length - 1) : ep;
                    if (CollectionPathHelper.isPathItr(value)) { value = '__iterator__'; }
                    accumulator.push({
                        level: i,
                        varName: this.getVarName(i, {prefix: 'itr'}),
                        NPath: this.implodePath(original.slice(0, i + 1)),
                        value: isFinite(value) ? Number(value) : value
                    });
                    return accumulator;
                }, [])
                : this.explodePath(options.path).reduce((accumulator, ep, i) => {
                    let value = (this.getStartType(ep) === 'array') ? ep.slice(1, ep.length - 1) : ep;
                    if (CollectionPathHelper.isPathItr(value)) { value = '__iterator__'; }
                    accumulator[this.getVarName(i, {prefix: 'itr'})] = isFinite(value) ? Number(value) : value;
                    return accumulator;
                }, {});
    }

    /**
     * For a given path will return a signature
     * @param {Object=} options
     * @param {Object=|Array=} options.path - the path from which the signature will be extracted
     * @param {Boolean=} options.getPathAsString - (true|false) If true with also include a path with iterators for array fragments (as string)
     * @param {Boolean=} options.getPathAsArray - (true|false) If true with also include a path with iterators for array fragments (as array)
     * @param {*=} options.arrayNotation - ("iterator"|"actual"|*) If this is set as "iterator" then array notations will have iterator in them. If this is set to "actual" it will have the actual values of the arrayNotations. If not arrays will have whatever is passed
     * @param {*=} options.pathIsString - Used for transient state
     * @returns {Object}
     */
    static getPathSignature(options) {

        options = {...{
            getPathAsString: false,
            getPathAsArray: false,
            arrayNotation: 'iterator',
            // pathIsString: typeof options.path === 'string' || options.path instanceof String,
        },
        ...options};

        options.pathIsString = typeof options.path === 'string' || options.path instanceof String;

        let signature = {length: 0, objects: 0, arrays: 0, schema: [], objProps: []};


        if ((options.getPathAsString && options.getPathAsString === true) || (options.getPathAsArray && options.getPathAsArray === true)) {
            signature.path = [];
        }

        /** Try to work with either strings, either arrays of path fragments. If not, return the empty signature */
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
            if (options.getPathAsString === true) {
                signature.stringPath = CollectionPathHelper.implodePath(signature.path);
            } else {
                signature.arrayPath = signature.path;
            }

            delete signature.path;
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
            options.subpath = CollectionPathHelper.getPathIterators({path: options.subpath});
        } else if (!(options.subpath !== null && typeof options.subpath === 'object' && !Array.isArray(options.subpath))) {
            return false;
        }

        if (typeof options.path === 'string' || options.path instanceof String) {
            options.path = CollectionPathHelper.getPathIterators({path: options.path});
        } else if (!(options.path !== null && typeof options.path === 'object' && !Array.isArray(options.path))) {
            return false;
        }

        if (options.sameSizeCheck && (Object.keys(options.subpath).length !== Object.keys(options.path).length)) {
            return false;
        }

        for (let property in options.subpath) {
            if (options.path[property] === '__iterator__') {

            } else if (options.subpath[property] !== options.path[property]) {
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
            options = {...defaultOptions, ...options};
            transience = {};
            transience.level = -1;
            transience.cursor = '';
            transience.pathItrSign = CollectionPathHelper.getPathIterators({path: options.path});
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

                let cursorItrSign = CollectionPathHelper.getPathIterators({path: transience.cursor});
                /** Continue just if is a subpath */
                if (CollectionPathHelper.isSubPath({subpath: cursorItrSign, path: transience.pathItrSign})) {
                    let compRes = CollectionPathHelper.isSubPath({subpath: cursorItrSign, path: transience.pathItrSign, sameSizeCheck: true});
                    if (compRes) {
                        transience.result.push(value);
                    }

                    /** Recursive logic */
                    if ((value !== null && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length > 0) || (Array.isArray(value) && value.length > 0)) {
                        CollectionPathHelper.getComposite({in: value}, transience);
                    }
                }

                transience.cursor = CollectionPathHelper.removePathLevels(transience.cursor);
            });
            transience.level -= 1;

        } else if (Array.isArray(options.in)) {
            transience.level += 1;
            for (let i = 0; i < options.in.length; i++) {
                transience.cursor = `${transience.cursor}[${i}]`;

                let cursorItrSign = CollectionPathHelper.getPathIterators({path: transience.cursor});
                /** Continue just if is a subpath */
                if (CollectionPathHelper.isSubPath({subpath: cursorItrSign, path: transience.pathItrSign})) {
                    if (CollectionPathHelper.isSubPath({subpath: cursorItrSign, path: transience.pathItrSign, sameSizeCheck: true})) {
                        transience.result.push(options.in[i]);
                    }

                    CollectionPathHelper.getComposite({in: options.in[i]}, transience);
                }

                transience.cursor = CollectionPathHelper.removePathLevels(transience.cursor);
            }
            transience.level -= 1;
        } else {
            // transience.schema = CollectionPathHelper.getComposite({in: options.in, cursor: transience.cursor, schema: transience.schema});
        }

        /** Cleanup stage. This should be executed the last time before the main return */
        if (transience.level === -1) {
            /** Building the result */
            if (transience.result.length === 0) {
                return options.default;
            } if (transience.result.length === 1) {
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

if (typeof module !== 'undefined' && module.exports) { module.exports = CollectionPathHelper; }

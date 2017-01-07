#!/usr/bin/env node

require("source-map-support/register");

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var fs = __webpack_require__(3);
	var _ = __webpack_require__(4);
	var nomnom = __webpack_require__(5);
	var terminal_console_1 = __webpack_require__(6);
	var UltiSnippetParser_1 = __webpack_require__(7);
	var VisualStudioConverter_1 = __webpack_require__(8);
	var console = new terminal_console_1.TerminalConsole();
	var parameters = nomnom.option("in", {
	    help: "UltiSnips input file.",
	    abbr: "i",
	    required: true,
	    list: true
	}).option("out", {
	    help: "Visual Studio Code output file.",
	    abbr: "o",
	    required: true
	}).parse(process.argv);
	var vsSnippets = {};
	_(parameters["in"]).map(function (snippetFileName) {
	    return fs.readFileSync(snippetFileName, "utf-8");
	}).map(UltiSnippetParser_1.parseSnippets).flatten().filter(function (it) {
	    if (/r/.test(it.flags)) {
	        console.log("Removing snippet " + it.macro + " since it's an unsupported regexp.");
	        return false;
	    }
	    return true;
	}).sort(function (item1, item2) {
	    return item1.priority - item2.priority;
	}).map(function (snippet) {
	    return VisualStudioConverter_1.convertToVisualSnippet(snippet);
	}).forEach(function (snippet) {
	    return vsSnippets[snippet.prefix] = snippet;
	});
	var visualStudioCode = JSON.stringify(vsSnippets, null, 4);
	fs.writeFileSync(parameters.out, visualStudioCode, { encoding: "utf-8" });

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("nomnom");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("terminal-console");

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	var ReadState;
	(function (ReadState) {
	    ReadState[ReadState["BLANK"] = 0] = "BLANK";
	    ReadState[ReadState["SNIPPET_CONTENT"] = 1] = "SNIPPET_CONTENT";
	})(ReadState || (ReadState = {}));
	function parseSnippets(snippetCode) {
	    var result = [];
	    var currentSnippet = null;
	    var state = ReadState.BLANK;
	    var currentPriority = 0;
	    snippetCode.split(/\n/).forEach(function (line, index) {
	        if (state == ReadState.BLANK) {
	            if (/^\s*$/.test(line)) {
	                return; //=> blank line, nothing to do
	            }
	            if (/^\s*#.*$/.test(line)) {
	                return; //=> comment line, nothing to do.
	            }
	            if (/^priority \d+$/.test(line)) {
	                currentPriority = parseInt(/^priority (\d+)$/.exec(line)[1]);
	                return; // priority for snippets.
	            }
	            var m = /^snippet\s+(.*)\s+"(.*)"(\s+(\w+)\s*)?$/.exec(line);
	            if (m) {
	                currentSnippet = {
	                    macro: m[1],
	                    description: m[2],
	                    code: [],
	                    priority: currentPriority,
	                    flags: m[4]
	                };
	                result.push(currentSnippet);
	                state = ReadState.SNIPPET_CONTENT;
	                return; //=> done
	            } else {
	                throw new Error("Error at line: " + (index + 1) + ", unable to parse: " + line);
	            }
	        }
	        if (state == ReadState.SNIPPET_CONTENT) {
	            if (/^endsnippet\s*$/.test(line)) {
	                state = ReadState.BLANK;
	                return; // => done reading snippets
	            }
	            currentSnippet.code.push(line);
	        }
	    });
	    return result;
	}
	exports.parseSnippets = parseSnippets;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	function convertToVisualSnippet(ultiSnippet) {
	    var resolvedCode = convertCode(ultiSnippet);
	    var result = {
	        prefix: ultiSnippet.macro,
	        description: ultiSnippet.description,
	        body: resolvedCode
	    };
	    return result;
	}
	exports.convertToVisualSnippet = convertToVisualSnippet;
	function convertCode(ultiSnippet) {
	    if (!ultiSnippet.code) {
	        throw new Error("Snippet " + ultiSnippet.macro + " has no code. (" + ultiSnippet + ")");
	    }
	    var variables = detectVariables(ultiSnippet.code);
	    return ultiSnippet.code.map(replaceVariables(variables));
	}
	/**
	 * Detect the variables names from a UltiSnips template. The variables
	 * are surrounded by brackets for easier replacement.
	 */
	function detectVariables(code) {
	    var result = { 0: "0" };
	    code.forEach(function (line) {
	        var matcher = void 0,
	            index = void 0;
	        var VARIABLE_RE = /\$\{(\d+)\:(.*?)\}/g;
	        do {
	            matcher = VARIABLE_RE.exec(line);
	            if (matcher) {
	                var _index = parseInt(matcher[1]);
	                var variableName = matcher[2];
	                result[_index] = "{" + variableName + "}";
	            }
	        } while (matcher);
	    });
	    return result;
	}
	/**
	 * Returns a function that replaces the variables from a line of a
	 * UltiSnips template, into a line of visual studio code.
	 */
	function replaceVariables(variables) {
	    return function (line) {
	        return line.replace(/\$(\d+)/g, function (subString, index) {
	            return "$" + variables[parseInt(index)];
	        }).replace(/\$\{(\d+)\:(.*?)\}/g, function (subString, index, varName) {
	            return "$" + variables[parseInt(index)];
	        });
	    };
	}

/***/ }
/******/ ]);
//# sourceMappingURL=MainApplication.js.map
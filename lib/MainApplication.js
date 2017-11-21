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
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var fs = __webpack_require__(3);
	var path = __webpack_require__(4);
	var _ = __webpack_require__(5);
	var nomnom = __webpack_require__(6);
	var terminal_console_1 = __webpack_require__(7);
	var UltiSnippetParser_1 = __webpack_require__(8);
	var VisualStudioConverter_1 = __webpack_require__(9);
	var console = new terminal_console_1.TerminalConsole();
	var parameters = nomnom.option("in", {
	    help: "UltiSnips input file.",
	    abbr: "i",
	    required: false,
	    list: true
	}).option("out", {
	    help: "Visual Studio Code output file.",
	    abbr: "o",
	    required: true
	}).option("filetype", {
	    help: "VIM filetype in .format. Will be searched in VIM_ULTISNIPS_FOLDER environment variable location.",
	    abbr: "t",
	    required: false
	}).option("verbose", {
	    help: "Show exceptions.",
	    abbr: "v",
	    required: false,
	    flag: true
	}).parse(process.argv);
	var vsSnippets = {};
	var fileNames = [];
	if (parameters["in"]) {
	    fileNames.push.apply(fileNames, _toConsumableArray(parameters["in"]));
	}
	if (parameters.filetype) {
	    (function () {
	        var SNIPPETS_FOLDER = process.env.VIM_ULTISNIPS_FOLDER;
	        if (!SNIPPETS_FOLDER) {
	            console.error("You need to set the VIM_ULTISNIPS_FOLDER environment variable to use the vim filetypes.");
	            process.exit(1);
	        }
	        var filetype = "all." + parameters.filetype;
	        filetype.split(".").map(function (it) {
	            return path.join(SNIPPETS_FOLDER, it) + ".snippets";
	        }).forEach(function (it) {
	            return fileNames.push(it);
	        });
	    })();
	}
	if (!fileNames.length) {
	    console.error("You need to pass in some snippets files to process using the actual " + "snippets file (with --in) or the VIM file type string using (--filetype).");
	    process.exit(2);
	}
	_(fileNames).map(function (snippetFileName) {
	    try {
	        return UltiSnippetParser_1.parseSnippets(snippetFileName, fs.readFileSync(snippetFileName, "utf-8"), parameters.verbose);
	    } catch (e) {
	        console.warn("Unable to parse " + snippetFileName + ".", parameters.verbose ? e : "");
	        return null;
	    }
	}).flatten().filter(function (it) {
	    if (!it) {
	        return false;
	    }
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

	module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("nomnom");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("terminal-console");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var path = __webpack_require__(4);
	var fs = __webpack_require__(3);
	var ReadState;
	(function (ReadState) {
	    ReadState[ReadState["BLANK"] = 0] = "BLANK";
	    ReadState[ReadState["SNIPPET_CONTENT"] = 1] = "SNIPPET_CONTENT";
	})(ReadState || (ReadState = {}));
	function parseSnippets(snippetsFile, snippetCode, verbose) {
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
	            if (/^priority -?\d+$/.test(line)) {
	                currentPriority = parseInt(/^priority (-?\d+)$/.exec(line)[1]);
	                return; // priority for snippets.
	            }
	            if (/^extends .+?$/.test(line)) {
	                try {
	                    // FIXME: normally this should be a callback function of some sort probably,
	                    // not just reading files, and reparsing.
	                    var typeExtended = /^extends (.+?)$/.exec(line)[1];
	                    var typeExtendedSnippetFile = path.join(path.dirname(snippetsFile), typeExtended) + ".snippets";
	                    var extraSnippets = parseSnippets(typeExtendedSnippetFile, fs.readFileSync(typeExtendedSnippetFile, "utf-8"), verbose);
	                    result.push.apply(result, _toConsumableArray(extraSnippets));
	                } catch (e) {
	                    console.error("Unable to parse: " + typeExtendedSnippetFile + " required via " + snippetsFile + ":" + (index + 1) + " : " + line, verbose ? e : "");
	                }
	                return; // extended types
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
/* 9 */
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
	        }).replace(/\$\{(\d+)\:(.*?)\}/g, function (subString, index, varContent) {
	            // if the variable is mapped to a VSCode constant, use it as a VSCode
	            // variable
	            if (/^TM_[\w\d]+$/.test(varContent)) {
	                return "$" + varContent;
	            }
	            // currently end selection seem not supported in snippets anymore
	            if (index == 0) {
	                return "";
	            }
	            return "$" + variables[parseInt(index)];
	        }).replace(/\$\{(.*?)\}/g, function (subString, varContent) {
	            if (varContent == "VISUAL") {
	                return "$TM_SELECTED_TEXT";
	            }
	            return subString;
	        });
	    };
	}

/***/ }
/******/ ]);
//# sourceMappingURL=MainApplication.js.map
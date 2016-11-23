/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";

	var fs = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"fs\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var nomnom = __webpack_require__(2);
	var terminal_console_1 = __webpack_require__(9);
	var UltiSnippetParser_1 = __webpack_require__(16);
	var VisualStudioConverter_1 = __webpack_require__(17);
	var console = new terminal_console_1.TerminalConsole();
	var parameters = nomnom.option("in", {
	    help: "UltiSnips input file.",
	    abbr: "i",
	    required: true
	}).option("out", {
	    help: "Visual Studio Code output file.",
	    abbr: "o",
	    required: true
	}).parse(process.argv);
	var ultiSnippets = fs.readFileSync(parameters["in"], "utf-8");
	var vsSnippets = {};
	UltiSnippetParser_1.parseSnippets(ultiSnippets).map(function (snippet) {
	    return VisualStudioConverter_1.convertToVisualSnippet(snippet);
	}).forEach(function (snippet) {
	    return vsSnippets[snippet.prefix] = snippet;
	});
	var visualStudioCode = JSON.stringify(vsSnippets, null, 4);
	fs.writeFileSync(parameters.out, visualStudioCode, { encoding: "utf-8" });
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var _ = __webpack_require__(3), chalk = __webpack_require__(4);


	function ArgParser() {
	   this.commands = {};  // expected commands
	   this.specs = {};     // option specifications
	}

	ArgParser.prototype = {
	  /* Add a command to the expected commands */
	  command : function(name) {
	    var command;
	    if (name) {
	      command = this.commands[name] = {
	        name: name,
	        specs: {}
	      };
	    }
	    else {
	      command = this.fallback = {
	        specs: {}
	      };
	    }

	    // facilitates command('name').options().cb().help()
	    var chain = {
	      options : function(specs) {
	        command.specs = specs;
	        return chain;
	      },
	      opts : function(specs) {
	        // old API
	        return this.options(specs);
	      },
	      option : function(name, spec) {
	        command.specs[name] = spec;
	        return chain;
	      },
	      callback : function(cb) {
	        command.cb = cb;
	        return chain;
	      },
	      help : function(help) {
	        command.help = help;
	        return chain;
	      },
	      usage : function(usage) {
	        command._usage = usage;
	        return chain;
	      }
	    };
	    return chain;
	  },

	  nocommand : function() {
	    return this.command();
	  },

	  options : function(specs) {
	    this.specs = specs;
	    return this;
	  },

	  opts : function(specs) {
	    // old API
	    return this.options(specs);
	  },

	  globalOpts : function(specs) {
	    // old API
	    return this.options(specs);
	  },

	  option : function(name, spec) {
	    this.specs[name] = spec;
	    return this;
	  },

	  usage : function(usage) {
	    this._usage = usage;
	    return this;
	  },

	  printer : function(print) {
	    this.print = print;
	    return this;
	  },

	  script : function(script) {
	    this._script = script;
	    return this;
	  },

	  scriptName : function(script) {
	    // old API
	    return this.script(script);
	  },

	  help : function(help) {
	    this._help = help;
	    return this;
	  },

	  colors: function() {
	    // deprecated - colors are on by default now
	    return this;
	  },

	  nocolors : function() {
	    this._nocolors = true;
	    return this;
	  },

	  parseArgs : function(argv) {
	    // old API
	    return this.parse(argv);
	  },

	  nom : function(argv) {
	    return this.parse(argv);
	  },

	  parse : function(argv) {
	    this.print = this.print || function(str, code) {
	      console.log(str);
	      process.exit(code || 0);
	    };
	    this._help = this._help || "";
	    this._script = this._script || process.argv[0] + " "
	          + __webpack_require__(8).basename(process.argv[1]);
	    this.specs = this.specs || {};

	    var argv = argv || process.argv.slice(2);

	    var arg = Arg(argv[0]).isValue && argv[0],
	        command = arg && this.commands[arg],
	        commandExpected = !_(this.commands).isEmpty();

	    if (commandExpected) {
	       if (command) {
	          _(this.specs).extend(command.specs);
	          this._script += " " + command.name;
	          if (command.help) {
	            this._help = command.help;
	          }
	          this.command = command;
	       }
	       else if (arg) {
	          return this.print(this._script + ": no such command '" + arg + "'", 1);
	       }
	       else {
	          // no command but command expected e.g. 'git -v'
	          var helpStringBuilder = {
	            list : function() {
	               return 'one of: ' + _(this.commands).keys().join(", ");
	            },
	            twoColumn : function() {
	              // find the longest command name to ensure horizontal alignment
	              var maxLength = _(this.commands).max(function (cmd) {
	                return cmd.name.length;
	              }).name.length;

	              // create the two column text strings
	              var cmdHelp = _.map(this.commands, function(cmd, name) {
	                var diff = maxLength - name.length;
	                var pad = new Array(diff + 4).join(" ");
	                return "  " + [ name, pad, cmd.help ].join(" ");
	              });
	              return "\n" + cmdHelp.join("\n");
	            }
	          };

	          // if there are a small number of commands and all have help strings,
	          // display them in a two column table; otherwise use the brief version.
	          // The arbitrary choice of "20" comes from the number commands git
	          // displays as "common commands"
	          var helpType = 'list';
	          if (_(this.commands).size() <= 20) {
	            if (_(this.commands).every(function (cmd) { return cmd.help; })) {
	                helpType = 'twoColumn';
	            }
	          }

	          this.specs.command = {
	            position: 0,
	            help: helpStringBuilder[helpType].call(this)
	          }

	          if (this.fallback) {
	            _(this.specs).extend(this.fallback.specs);
	            this._help = this.fallback.help;
	          } else {
	            this.specs.command.required = true;
	          }
	       }
	    }

	    if (this.specs.length === undefined) {
	      // specs is a hash not an array
	      this.specs = _(this.specs).map(function(opt, name) {
	        opt.name = name;
	        return opt;
	      });
	    }
	    this.specs = this.specs.map(function(opt) {
	      return Opt(opt);
	    });

	    if (argv.indexOf("--help") >= 0 || argv.indexOf("-h") >= 0) {
	      return this.print(this.getUsage());
	    }

	    var options = {};
	    var args = argv.map(function(arg) {
	      return Arg(arg);
	    })
	    .concat(Arg());

	    var positionals = [];

	    /* parse the args */
	    var that = this;
	    args.reduce(function(arg, val) {
	      /* positional */
	      if (arg.isValue) {
	        positionals.push(arg.value);
	      }
	      else if (arg.chars) {
	        var last = arg.chars.pop();

	        /* -cfv */
	        (arg.chars).forEach(function(ch) {
	          that.setOption(options, ch, true);
	        });

	        /* -v key */
	        if (!that.opt(last).flag) {
	           if (val.isValue)  {
	              that.setOption(options, last, val.value);
	              return Arg(); // skip next turn - swallow arg
	           }
	           else {
	              that.print("'-" + (that.opt(last).name || last) + "'"
	                + " expects a value\n\n" + that.getUsage(), 1);
	           }
	        }
	        else {
	          /* -v */
	          that.setOption(options, last, true);
	        }

	      }
	      else if (arg.full) {
	        var value = arg.value;

	        /* --key */
	        if (value === undefined) {
	          /* --key value */
	          if (!that.opt(arg.full).flag) {
	            if (val.isValue) {
	              that.setOption(options, arg.full, val.value);
	              return Arg();
	            }
	            else {
	              that.print("'--" + (that.opt(arg.full).name || arg.full) + "'"
	                + " expects a value\n\n" + that.getUsage(), 1);
	            }
	          }
	          else {
	            /* --flag */
	            value = true;
	          }
	        }
	        that.setOption(options, arg.full, value);
	      }
	      return val;
	    });

	    positionals.forEach(function(pos, index) {
	      this.setOption(options, index, pos);
	    }, this);

	    options._ = positionals;

	    this.specs.forEach(function(opt) {
	      if (opt.default !== undefined && options[opt.name] === undefined) {
	        options[opt.name] = opt.default;
	      }
	    }, this);

	    // exit if required arg isn't present
	    this.specs.forEach(function(opt) {
	      if (opt.required && options[opt.name] === undefined) {
	         var msg = opt.name + " argument is required";
	         msg = this._nocolors ? msg : chalk.red(msg);

	         this.print("\n" + msg + "\n" + this.getUsage(), 1);
	      }
	    }, this);

	    if (command && command.cb) {
	      command.cb(options);
	    }
	    else if (this.fallback && this.fallback.cb) {
	      this.fallback.cb(options);
	    }

	    return options;
	  },

	  getUsage : function() {
	    if (this.command && this.command._usage) {
	      return this.command._usage;
	    }
	    else if (this.fallback && this.fallback._usage) {
	      return this.fallback._usage;
	    }
	    if (this._usage) {
	      return this._usage;
	    }

	    // todo: use a template
	    var str = "\n"
	    if (!this._nocolors) {
	      str += chalk.bold("Usage:");
	    }
	    else {
	      str += "Usage:";
	    }
	    str += " " + this._script;

	    var positionals = _(this.specs).select(function(opt) {
	      return opt.position != undefined;
	    })
	    positionals = _(positionals).sortBy(function(opt) {
	      return opt.position;
	    });
	    var options = _(this.specs).select(function(opt) {
	      return opt.position === undefined;
	    });

	    // assume there are no gaps in the specified pos. args
	    positionals.forEach(function(pos) {
	      str += " ";
	      var posStr = pos.string;
	      if (!posStr) {
	        posStr = pos.name || "arg" + pos.position;
	        if (pos.required) {
	            posStr = "<" + posStr + ">";
	        } else {
	            posStr = "[" + posStr + "]";
	        }
	        if (pos.list) {
	          posStr += "...";
	        }
	      }
	      str += posStr;
	    });

	    if (options.length) {
	      if (!this._nocolors) {
	        // must be a better way to do this
	        str += chalk.blue(" [options]");
	      }
	      else {
	        str += " [options]";
	      }
	    }

	    if (options.length || positionals.length) {
	      str += "\n\n";
	    }

	    function spaces(length) {
	      var spaces = "";
	      for (var i = 0; i < length; i++) {
	        spaces += " ";
	      }
	      return spaces;
	    }
	    var longest = positionals.reduce(function(max, pos) {
	      return pos.name.length > max ? pos.name.length : max;
	    }, 0);

	    positionals.forEach(function(pos) {
	      var posStr = pos.string || pos.name;
	      str += posStr + spaces(longest - posStr.length) + "     ";
	      if (!this._nocolors) {
	        str += chalk.grey(pos.help || "")
	      }
	      else {
	        str += (pos.help || "")
	      }
	      str += "\n";
	    }, this);
	    if (positionals.length && options.length) {
	      str += "\n";
	    }

	    if (options.length) {
	      if (!this._nocolors) {
	        str += chalk.blue("Options:");
	      }
	      else {
	        str += "Options:";
	      }
	      str += "\n"

	      var longest = options.reduce(function(max, opt) {
	        return opt.string.length > max && !opt.hidden ? opt.string.length : max;
	      }, 0);

	      options.forEach(function(opt) {
	        if (!opt.hidden) {
	          str += "   " + opt.string + spaces(longest - opt.string.length) + "   ";

	          var defaults = (opt.default != null ? "  [" + opt.default + "]" : "");
	          var help = opt.help ? opt.help + defaults : "";
	          str += this._nocolors ? help: chalk.grey(help);

	          str += "\n";
	        }
	      }, this);
	    }

	    if (this._help) {
	      str += "\n" + this._help;
	    }
	    return str;
	  }
	};

	ArgParser.prototype.opt = function(arg) {
	  // get the specified opt for this parsed arg
	  var match = Opt({});
	  this.specs.forEach(function(opt) {
	    if (opt.matches(arg)) {
	       match = opt;
	    }
	  });
	  return match;
	};

	ArgParser.prototype.setOption = function(options, arg, value) {
	  var option = this.opt(arg);
	  if (option.callback) {
	    var message = option.callback(value);

	    if (typeof message == "string") {
	      this.print(message, 1);
	    }
	  }

	  if (option.type != "string") {
	     try {
	       // infer type by JSON parsing the string
	       value = JSON.parse(value)
	     }
	     catch(e) {}
	  }

	  if (option.transform) {
	     value = option.transform(value);
	  }

	  var name = option.name || arg;
	  if (option.choices && option.choices.indexOf(value) == -1) {
	     this.print(name + " must be one of: " + option.choices.join(", "), 1);
	  }

	  if (option.list) {
	    if (!options[name]) {
	      options[name] = [value];
	    }
	    else {
	      options[name].push(value);
	    }
	  }
	  else {
	    options[name] = value;
	  }
	};


	/* an arg is an item that's actually parsed from the command line
	   e.g. "-l", "log.txt", or "--logfile=log.txt" */
	var Arg = function(str) {
	  var abbrRegex = /^\-(\w+?)$/,
	      fullRegex = /^\-\-(no\-)?(.+?)(?:=(.+))?$/,
	      valRegex = /^[^\-].*/;

	  var charMatch = abbrRegex.exec(str),
	      chars = charMatch && charMatch[1].split("");

	  var fullMatch = fullRegex.exec(str),
	      full = fullMatch && fullMatch[2];

	  var isValue = str !== undefined && (str === "" || valRegex.test(str));
	  var value;
	  if (isValue) {
	    value = str;
	  }
	  else if (full) {
	    value = fullMatch[1] ? false : fullMatch[3];
	  }

	  return {
	    str: str,
	    chars: chars,
	    full: full,
	    value: value,
	    isValue: isValue
	  }
	}


	/* an opt is what's specified by the user in opts hash */
	var Opt = function(opt) {
	  var strings = (opt.string || "").split(","),
	      abbr, full, metavar;
	  for (var i = 0; i < strings.length; i++) {
	    var string = strings[i].trim(),
	        matches;
	    if (matches = string.match(/^\-([^-])(?:\s+(.*))?$/)) {
	      abbr = matches[1];
	      metavar = matches[2];
	    }
	    else if (matches = string.match(/^\-\-(.+?)(?:[=\s]+(.+))?$/)) {
	      full = matches[1];
	      metavar = metavar || matches[2];
	    }
	  }

	  matches = matches || [];
	  var abbr = opt.abbr || abbr,   // e.g. v from -v
	      full = opt.full || full, // e.g. verbose from --verbose
	      metavar = opt.metavar || metavar;  // e.g. PATH from '--config=PATH'

	  var string;
	  if (opt.string) {
	    string = opt.string;
	  }
	  else if (opt.position === undefined) {
	    string = "";
	    if (abbr) {
	      string += "-" + abbr;
	      if (metavar)
	        string += " " + metavar
	      string += ", ";
	    }
	    string += "--" + (full || opt.name);
	    if (metavar) {
	      string += " " + metavar;
	    }
	  }

	  opt = _(opt).extend({
	    name: opt.name || full || abbr,
	    string: string,
	    abbr: abbr,
	    full: full,
	    metavar: metavar,
	    matches: function(arg) {
	      return opt.full == arg || opt.abbr == arg || opt.position == arg
	        || opt.name == arg || (opt.list && arg >= opt.position);
	    }
	  });
	  return opt;
	}


	var createParser = function() {
	  return new ArgParser();
	}

	var nomnom = createParser();

	for (var i in nomnom) {
	  if (typeof nomnom[i] == "function") {
	     createParser[i] = _(nomnom[i]).bind(nomnom);
	  }
	}

	module.exports = createParser;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.6.0
	//     http://underscorejs.org
	//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function() {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Establish the object that gets returned to break out of a loop iteration.
	  var breaker = {};

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    concat           = ArrayProto.concat,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeForEach      = ArrayProto.forEach,
	    nativeMap          = ArrayProto.map,
	    nativeReduce       = ArrayProto.reduce,
	    nativeReduceRight  = ArrayProto.reduceRight,
	    nativeFilter       = ArrayProto.filter,
	    nativeEvery        = ArrayProto.every,
	    nativeSome         = ArrayProto.some,
	    nativeIndexOf      = ArrayProto.indexOf,
	    nativeLastIndexOf  = ArrayProto.lastIndexOf,
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind;

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object via a string identifier,
	  // for Closure Compiler "advanced" mode.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.6.0';

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles objects with the built-in `forEach`, arrays, and raw objects.
	  // Delegates to **ECMAScript 5**'s native `forEach` if available.
	  var each = _.each = _.forEach = function(obj, iterator, context) {
	    if (obj == null) return obj;
	    if (nativeForEach && obj.forEach === nativeForEach) {
	      obj.forEach(iterator, context);
	    } else if (obj.length === +obj.length) {
	      for (var i = 0, length = obj.length; i < length; i++) {
	        if (iterator.call(context, obj[i], i, obj) === breaker) return;
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (var i = 0, length = keys.length; i < length; i++) {
	        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iterator to each element.
	  // Delegates to **ECMAScript 5**'s native `map` if available.
	  _.map = _.collect = function(obj, iterator, context) {
	    var results = [];
	    if (obj == null) return results;
	    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
	    each(obj, function(value, index, list) {
	      results.push(iterator.call(context, value, index, list));
	    });
	    return results;
	  };

	  var reduceError = 'Reduce of empty array with no initial value';

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
	  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
	    var initial = arguments.length > 2;
	    if (obj == null) obj = [];
	    if (nativeReduce && obj.reduce === nativeReduce) {
	      if (context) iterator = _.bind(iterator, context);
	      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
	    }
	    each(obj, function(value, index, list) {
	      if (!initial) {
	        memo = value;
	        initial = true;
	      } else {
	        memo = iterator.call(context, memo, value, index, list);
	      }
	    });
	    if (!initial) throw new TypeError(reduceError);
	    return memo;
	  };

	  // The right-associative version of reduce, also known as `foldr`.
	  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
	  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
	    var initial = arguments.length > 2;
	    if (obj == null) obj = [];
	    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
	      if (context) iterator = _.bind(iterator, context);
	      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
	    }
	    var length = obj.length;
	    if (length !== +length) {
	      var keys = _.keys(obj);
	      length = keys.length;
	    }
	    each(obj, function(value, index, list) {
	      index = keys ? keys[--length] : --length;
	      if (!initial) {
	        memo = obj[index];
	        initial = true;
	      } else {
	        memo = iterator.call(context, memo, obj[index], index, list);
	      }
	    });
	    if (!initial) throw new TypeError(reduceError);
	    return memo;
	  };

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var result;
	    any(obj, function(value, index, list) {
	      if (predicate.call(context, value, index, list)) {
	        result = value;
	        return true;
	      }
	    });
	    return result;
	  };

	  // Return all the elements that pass a truth test.
	  // Delegates to **ECMAScript 5**'s native `filter` if available.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    if (obj == null) return results;
	    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
	    each(obj, function(value, index, list) {
	      if (predicate.call(context, value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, function(value, index, list) {
	      return !predicate.call(context, value, index, list);
	    }, context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Delegates to **ECMAScript 5**'s native `every` if available.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate || (predicate = _.identity);
	    var result = true;
	    if (obj == null) return result;
	    if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
	    each(obj, function(value, index, list) {
	      if (!(result = result && predicate.call(context, value, index, list))) return breaker;
	    });
	    return !!result;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Delegates to **ECMAScript 5**'s native `some` if available.
	  // Aliased as `any`.
	  var any = _.some = _.any = function(obj, predicate, context) {
	    predicate || (predicate = _.identity);
	    var result = false;
	    if (obj == null) return result;
	    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
	    each(obj, function(value, index, list) {
	      if (result || (result = predicate.call(context, value, index, list))) return breaker;
	    });
	    return !!result;
	  };

	  // Determine if the array or object contains a given value (using `===`).
	  // Aliased as `include`.
	  _.contains = _.include = function(obj, target) {
	    if (obj == null) return false;
	    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
	    return any(obj, function(value) {
	      return value === target;
	    });
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      return (isFunc ? method : value[method]).apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matches(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matches(attrs));
	  };

	  // Return the maximum element or (element-based computation).
	  // Can't optimize arrays of integers longer than 65,535 elements.
	  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
	  _.max = function(obj, iterator, context) {
	    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
	      return Math.max.apply(Math, obj);
	    }
	    var result = -Infinity, lastComputed = -Infinity;
	    each(obj, function(value, index, list) {
	      var computed = iterator ? iterator.call(context, value, index, list) : value;
	      if (computed > lastComputed) {
	        result = value;
	        lastComputed = computed;
	      }
	    });
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iterator, context) {
	    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
	      return Math.min.apply(Math, obj);
	    }
	    var result = Infinity, lastComputed = Infinity;
	    each(obj, function(value, index, list) {
	      var computed = iterator ? iterator.call(context, value, index, list) : value;
	      if (computed < lastComputed) {
	        result = value;
	        lastComputed = computed;
	      }
	    });
	    return result;
	  };

	  // Shuffle an array, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var rand;
	    var index = 0;
	    var shuffled = [];
	    each(obj, function(value) {
	      rand = _.random(index++);
	      shuffled[index - 1] = shuffled[rand];
	      shuffled[rand] = value;
	    });
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (obj.length !== +obj.length) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // An internal function to generate lookup iterators.
	  var lookupIterator = function(value) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return value;
	    return _.property(value);
	  };

	  // Sort the object's values by a criterion produced by an iterator.
	  _.sortBy = function(obj, iterator, context) {
	    iterator = lookupIterator(iterator);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iterator.call(context, value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iterator, context) {
	      var result = {};
	      iterator = lookupIterator(iterator);
	      each(obj, function(value, index) {
	        var key = iterator.call(context, value, index, obj);
	        behavior(result, key, value);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, key, value) {
	    _.has(result, key) ? result[key].push(value) : result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, key, value) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, key) {
	    _.has(result, key) ? result[key]++ : result[key] = 1;
	  });

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iterator, context) {
	    iterator = lookupIterator(iterator);
	    var value = iterator.call(context, obj);
	    var low = 0, high = array.length;
	    while (low < high) {
	      var mid = (low + high) >>> 1;
	      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
	    }
	    return low;
	  };

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (obj.length === +obj.length) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if ((n == null) || guard) return array[0];
	    if (n < 0) return [];
	    return slice.call(array, 0, n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N. The **guard** check allows it to work with
	  // `_.map`.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array. The **guard** check allows it to work with `_.map`.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if ((n == null) || guard) return array[array.length - 1];
	    return slice.call(array, Math.max(array.length - n, 0));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array. The **guard**
	  // check allows it to work with `_.map`.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, (n == null) || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, output) {
	    if (shallow && _.every(input, _.isArray)) {
	      return concat.apply(output, input);
	    }
	    each(input, function(value) {
	      if (_.isArray(value) || _.isArguments(value)) {
	        shallow ? push.apply(output, value) : flatten(value, shallow, output);
	      } else {
	        output.push(value);
	      }
	    });
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, []);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Split an array into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(array, predicate) {
	    var pass = [], fail = [];
	    each(array, function(elem) {
	      (predicate(elem) ? pass : fail).push(elem);
	    });
	    return [pass, fail];
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iterator, context) {
	    if (_.isFunction(isSorted)) {
	      context = iterator;
	      iterator = isSorted;
	      isSorted = false;
	    }
	    var initial = iterator ? _.map(array, iterator, context) : array;
	    var results = [];
	    var seen = [];
	    each(initial, function(value, index) {
	      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
	        seen.push(value);
	        results.push(array[index]);
	      }
	    });
	    return results;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(_.flatten(arguments, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var rest = slice.call(arguments, 1);
	    return _.filter(_.uniq(array), function(item) {
	      return _.every(rest, function(other) {
	        return _.contains(other, item);
	      });
	    });
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
	    return _.filter(array, function(value){ return !_.contains(rest, value); });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    var length = _.max(_.pluck(arguments, 'length').concat(0));
	    var results = new Array(length);
	    for (var i = 0; i < length; i++) {
	      results[i] = _.pluck(arguments, '' + i);
	    }
	    return results;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    if (list == null) return {};
	    var result = {};
	    for (var i = 0, length = list.length; i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
	  // we need this function. Return the position of the first occurrence of an
	  // item in an array, or -1 if the item is not included in the array.
	  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = function(array, item, isSorted) {
	    if (array == null) return -1;
	    var i = 0, length = array.length;
	    if (isSorted) {
	      if (typeof isSorted == 'number') {
	        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
	      } else {
	        i = _.sortedIndex(array, item);
	        return array[i] === item ? i : -1;
	      }
	    }
	    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
	    for (; i < length; i++) if (array[i] === item) return i;
	    return -1;
	  };

	  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
	  _.lastIndexOf = function(array, item, from) {
	    if (array == null) return -1;
	    var hasIndex = from != null;
	    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
	      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
	    }
	    var i = (hasIndex ? from : array.length);
	    while (i--) if (array[i] === item) return i;
	    return -1;
	  };

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (arguments.length <= 1) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = arguments[2] || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var idx = 0;
	    var range = new Array(length);

	    while(idx < length) {
	      range[idx++] = start;
	      start += step;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Reusable constructor function for prototype setting.
	  var ctor = function(){};

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    var args, bound;
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError;
	    args = slice.call(arguments, 2);
	    return bound = function() {
	      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
	      ctor.prototype = func.prototype;
	      var self = new ctor;
	      ctor.prototype = null;
	      var result = func.apply(self, args.concat(slice.call(arguments)));
	      if (Object(result) === result) return result;
	      return self;
	    };
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    return function() {
	      var position = 0;
	      var args = boundArgs.slice();
	      for (var i = 0, length = args.length; i < length; i++) {
	        if (args[i] === _) args[i] = arguments[position++];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return func.apply(this, args);
	    };
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var funcs = slice.call(arguments, 1);
	    if (funcs.length === 0) throw new Error('bindAll must be passed function names');
	    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memo = {};
	    hasher || (hasher = _.identity);
	    return function() {
	      var key = hasher.apply(this, arguments);
	      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
	    };
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){ return func.apply(null, args); }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = function(func) {
	    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
	  };

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    options || (options = {});
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0) {
	        clearTimeout(timeout);
	        timeout = null;
	        previous = now;
	        result = func.apply(context, args);
	        context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;
	      if (last < wait) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) {
	        timeout = setTimeout(later, wait);
	      }
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = function(func) {
	    var ran = false, memo;
	    return function() {
	      if (ran) return memo;
	      ran = true;
	      memo = func.apply(this, arguments);
	      func = null;
	      return memo;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var funcs = arguments;
	    return function() {
	      var args = arguments;
	      for (var i = funcs.length - 1; i >= 0; i--) {
	        args = [funcs[i].apply(this, args)];
	      }
	      return args[0];
	    };
	  };

	  // Returns a function that will only be executed after being called N times.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Object Functions
	  // ----------------

	  // Retrieve the names of an object's properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = new Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = new Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = function(obj) {
	    each(slice.call(arguments, 1), function(source) {
	      if (source) {
	        for (var prop in source) {
	          obj[prop] = source[prop];
	        }
	      }
	    });
	    return obj;
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(obj) {
	    var copy = {};
	    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
	    each(keys, function(key) {
	      if (key in obj) copy[key] = obj[key];
	    });
	    return copy;
	  };

	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj) {
	    var copy = {};
	    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
	    for (var key in obj) {
	      if (!_.contains(keys, key)) copy[key] = obj[key];
	    }
	    return copy;
	  };

	  // Fill in a given object with default properties.
	  _.defaults = function(obj) {
	    each(slice.call(arguments, 1), function(source) {
	      if (source) {
	        for (var prop in source) {
	          if (obj[prop] === void 0) obj[prop] = source[prop];
	        }
	      }
	    });
	    return obj;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a == 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className != toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, dates, and booleans are compared by value.
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return a == String(b);
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
	        // other numeric values.
	        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a == +b;
	      // RegExps are compared by their source patterns and flags.
	      case '[object RegExp]':
	        return a.source == b.source &&
	               a.global == b.global &&
	               a.multiline == b.multiline &&
	               a.ignoreCase == b.ignoreCase;
	    }
	    if (typeof a != 'object' || typeof b != 'object') return false;
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] == a) return bStack[length] == b;
	    }
	    // Objects with different constructors are not equivalent, but `Object`s
	    // from different frames are.
	    var aCtor = a.constructor, bCtor = b.constructor;
	    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
	                             _.isFunction(bCtor) && (bCtor instanceof bCtor))
	                        && ('constructor' in a && 'constructor' in b)) {
	      return false;
	    }
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	    var size = 0, result = true;
	    // Recursively compare objects and arrays.
	    if (className == '[object Array]') {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      size = a.length;
	      result = size == b.length;
	      if (result) {
	        // Deep compare the contents, ignoring non-numeric properties.
	        while (size--) {
	          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
	        }
	      }
	    } else {
	      // Deep compare objects.
	      for (var key in a) {
	        if (_.has(a, key)) {
	          // Count the expected number of properties.
	          size++;
	          // Deep compare each member.
	          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
	        }
	      }
	      // Ensure that both objects contain the same number of properties.
	      if (result) {
	        for (key in b) {
	          if (_.has(b, key) && !(size--)) break;
	        }
	        result = !size;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return result;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b, [], []);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
	    for (var key in obj) if (_.has(obj, key)) return false;
	    return true;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) == '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    return obj === Object(obj);
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
	  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) == '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return !!(obj && _.has(obj, 'callee'));
	    };
	  }

	  // Optimize `isFunction` if appropriate.
	  if (true) {
	    _.isFunction = function(obj) {
	      return typeof obj === 'function';
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj != +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iterators.
	  _.identity = function(value) {
	    return value;
	  };

	  _.constant = function(value) {
	    return function () {
	      return value;
	    };
	  };

	  _.property = function(key) {
	    return function(obj) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
	  _.matches = function(attrs) {
	    return function(obj) {
	      if (obj === attrs) return true; //avoid comparing an object to itself.
	      for (var key in attrs) {
	        if (attrs[key] !== obj[key])
	          return false;
	      }
	      return true;
	    }
	  };

	  // Run a function **n** times.
	  _.times = function(n, iterator, context) {
	    var accum = Array(Math.max(0, n));
	    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() { return new Date().getTime(); };

	  // List of HTML entities for escaping.
	  var entityMap = {
	    escape: {
	      '&': '&amp;',
	      '<': '&lt;',
	      '>': '&gt;',
	      '"': '&quot;',
	      "'": '&#x27;'
	    }
	  };
	  entityMap.unescape = _.invert(entityMap.escape);

	  // Regexes containing the keys and values listed immediately above.
	  var entityRegexes = {
	    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
	    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
	  };

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  _.each(['escape', 'unescape'], function(method) {
	    _[method] = function(string) {
	      if (string == null) return '';
	      return ('' + string).replace(entityRegexes[method], function(match) {
	        return entityMap[method][match];
	      });
	    };
	  });

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property) {
	    if (object == null) return void 0;
	    var value = object[property];
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result.call(this, func.apply(_, args));
	      };
	    });
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\t':     't',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  _.template = function(text, data, settings) {
	    var render;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = new RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset)
	        .replace(escaper, function(match) { return '\\' + escapes[match]; });

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      }
	      if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      }
	      if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }
	      index = offset + match.length;
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + "return __p;\n";

	    try {
	      render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    if (data) return render(data, _);
	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled function source as a convenience for precompilation.
	    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function, which will delegate to the wrapper.
	  _.chain = function(obj) {
	    return _(obj).chain();
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function(obj) {
	    return this._chain ? _(obj).chain() : obj;
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
	      return result.call(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result.call(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  _.extend(_.prototype, {

	    // Start chaining a wrapped Underscore object.
	    chain: function() {
	      this._chain = true;
	      return this;
	    },

	    // Extracts the result from a wrapped and chained object.
	    value: function() {
	      return this._wrapped;
	    }

	  });

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}).call(this);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ansi = __webpack_require__(5);
	var stripAnsi = __webpack_require__(6);
	var hasColor = __webpack_require__(7);
	var defineProps = Object.defineProperties;
	var chalk = module.exports;

	var styles = (function () {
		var ret = {};

		ansi.grey = ansi.gray;

		Object.keys(ansi).forEach(function (key) {
			ret[key] = {
				get: function () {
					this._styles.push(key);
					return this;
				}
			};
		});

		return ret;
	})();

	function init() {
		var ret = {};

		Object.keys(styles).forEach(function (name) {
			ret[name] = {
				get: function () {
					var obj = defineProps(function self() {
						var str = [].slice.call(arguments).join(' ');

						if (!chalk.enabled) {
							return str;
						}

						return self._styles.reduce(function (str, name) {
							var code = ansi[name];
							return str ? code.open + str + code.close : '';
						}, str);
					}, styles);

					obj._styles = [];

					return obj[name];
				}
			}
		});

		return ret;
	}

	defineProps(chalk, init());

	chalk.styles = ansi;
	chalk.stripColor = stripAnsi;
	chalk.supportsColor = hasColor;

	// detect mode if not set manually
	if (chalk.enabled === undefined) {
		chalk.enabled = chalk.supportsColor;
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	var styles = module.exports;

	var codes = {
		reset: [0, 0],

		bold: [1, 22],
		italic: [3, 23],
		underline: [4, 24],
		inverse: [7, 27],
		strikethrough: [9, 29],

		black: [30, 39],
		red: [31, 39],
		green: [32, 39],
		yellow: [33, 39],
		blue: [34, 39],
		magenta: [35, 39],
		cyan: [36, 39],
		white: [37, 39],
		gray: [90, 39],

		bgBlack: [40, 49],
		bgRed: [41, 49],
		bgGreen: [42, 49],
		bgYellow: [43, 49],
		bgBlue: [44, 49],
		bgMagenta: [45, 49],
		bgCyan: [46, 49],
		bgWhite: [47, 49]
	};

	Object.keys(codes).forEach(function (key) {
		var val = codes[key];
		var style = styles[key] = {};
		style.open = '\x1b[' + val[0] + 'm';
		style.close = '\x1b[' + val[1] + 'm';
	});


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return typeof str === 'string' ? str.replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g, '') : str;
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	module.exports = (function () {
		if (process.argv.indexOf('--no-color') !== -1) {
			return false;
		}

		if (process.argv.indexOf('--color') !== -1) {
			return true;
		}

		if (process.stdout && !process.stdout.isTTY) {
			return false;
		}

		if (process.platform === 'win32') {
			return true;
		}

		if ('COLORTERM' in process.env) {
			return true;
		}

		if (process.env.TERM === 'dumb') {
			return false;
		}

		if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
			return true;
		}

		return false;
	})();

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {///<reference path="../../../typings/node/node.d.ts"/>
	var util = __webpack_require__(10);
	var AnsiUtil = __webpack_require__(13);
	var watcher = __webpack_require__(15);
	var actualConsole = global.console;
	/**
	 * A class that allows relogging the previously written message by using the
	 * ANSI up code.
	 * @inmodule "terminal-console"
	 */
	var TerminalConsole = (function () {
	    /**
	     * Constructs the console.
	     */
	    function TerminalConsole() {
	        this._lastMessageLength = 0;
	    }
	    /**
	     * Logs the given arguments, and keeps track of the last written text.
	     */
	    TerminalConsole.prototype.log = function (message) {
	        var optionalParams = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            optionalParams[_i - 1] = arguments[_i];
	        }
	        actualConsole.log(this._print.apply(this, arguments));
	    };
	    /**
	     * Relogs the given message, by clearing first the previous message.
	     */
	    TerminalConsole.prototype.relog = function (message) {
	        var optionalParams = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            optionalParams[_i - 1] = arguments[_i];
	        }
	        actualConsole.log(this._reprint.apply(this, arguments));
	    };
	    /**
	     * Logs the given arguments, and keeps track of the last written text.
	     */
	    TerminalConsole.prototype.error = function (message) {
	        var optionalParams = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            optionalParams[_i - 1] = arguments[_i];
	        }
	        actualConsole.error(this._print.apply(this, arguments));
	    };
	    /**
	     * Relogs the given message, by clearing first the previous message.
	     */
	    TerminalConsole.prototype.reerror = function (message) {
	        var optionalParams = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            optionalParams[_i - 1] = arguments[_i];
	        }
	        actualConsole.error(this._reprint.apply(this, arguments));
	    };
	    /**
	     * Logs the given arguments, and keeps track of the last written text.
	     */
	    TerminalConsole.prototype.info = function (message) {
	        var optionalParams = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            optionalParams[_i - 1] = arguments[_i];
	        }
	        actualConsole.info(this._print.apply(this, arguments));
	    };
	    /**
	     * Relogs the given message, by clearing first the previous message.
	     */
	    TerminalConsole.prototype.reinfo = function (message) {
	        var optionalParams = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            optionalParams[_i - 1] = arguments[_i];
	        }
	        actualConsole.info(this._reprint.apply(this, arguments));
	    };
	    /**
	     * Logs the given arguments, and keeps track of the last written text.
	     */
	    TerminalConsole.prototype.warn = function (message) {
	        var optionalParams = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            optionalParams[_i - 1] = arguments[_i];
	        }
	        actualConsole.log(this._print.apply(this, arguments));
	    };
	    /**
	     * Relogs the given message, by clearing first the previous message.
	     */
	    TerminalConsole.prototype.rewarn = function (message) {
	        var optionalParams = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            optionalParams[_i - 1] = arguments[_i];
	        }
	        actualConsole.log(this._reprint.apply(this, arguments));
	    };
	    /**
	     * Formats the text for printing it, and memorize its length
	     */
	    TerminalConsole.prototype._print = function () {
	        // format the text like a regular console, figure out the actual size of the text, 
	        // and memorize it, and after just return the text.
	        var loggedText = util.format.apply(util.format, arguments);
	        var pureText = AnsiUtil.removeAnsiCode(loggedText);
	        this._lastMessageLength = pureText.length;
	        return loggedText;
	    };
	    /**
	     * its length.
	     * Formats the text for reprinting it (by moving the cursor up) and memorize
	     */
	    TerminalConsole.prototype._reprint = function () {
	        var rowCount = Math.floor(this._lastMessageLength / TerminalConsole._SIZE_WATCHER.columns) + 1;
	        //FIXME: depending on the strategy, the space cleanup might be needed
	        var loggedText = AnsiUtil.moveCursorUp(rowCount) +
	            util.format.apply(util.format, arguments);
	        var pureText = AnsiUtil.removeAnsiCode(loggedText);
	        if (pureText.length < this._lastMessageLength) {
	            // new text is shorter than previously printed text, so we need to
	            // fill the old text with spaces.
	            var spaces = "";
	            for (var i = pureText.length; i < this._lastMessageLength; i++) {
	                spaces += " ";
	            }
	            loggedText += AnsiUtil.RESET + spaces;
	            pureText += spaces;
	        }
	        this._lastMessageLength = pureText.length;
	        return loggedText;
	    };
	    TerminalConsole._SIZE_WATCHER = new watcher.TerminalSizeWatcher();
	    return TerminalConsole;
	})();
	exports.TerminalConsole = TerminalConsole;
	exports.console = new TerminalConsole();
	//# sourceMappingURL=TerminalConsole.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(11);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(12);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1)))

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../../../typings/node/supports-color.d.ts"/>
	var supportsColor = __webpack_require__(14);
	var ANSI_REGEXP = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/g;
	exports.RESET = supportsColor ? '\x1b[0m' : ''; // should be 0, 41 is red for test
	/**
	 * Removes all the ANSI codes from the given message, returning only the actual
	 * string.
	 */
	function removeAnsiCode(message) {
	    return message.replace(ANSI_REGEXP, "");
	}
	exports.removeAnsiCode = removeAnsiCode;
	/**
	 * Returns the ANSI move up code, that is going to do the actual cursor move.
	 * In case colors are not available for STDOUT, just return an empty string.
	 */
	function moveCursorUp(rowCount) {
	    if (!supportsColor) {
	        return "";
	    }
	    return '\x1b[' + rowCount + 'A';
	}
	exports.moveCursorUp = moveCursorUp;
	//# sourceMappingURL=AnsiUtil.js.map

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	var argv = process.argv;

	module.exports = (function () {
		if ('FORCE_COLOR' in process.env) {
			return true;
		}

		if (argv.indexOf('--no-color') !== -1 ||
			argv.indexOf('--no-colors') !== -1 ||
			argv.indexOf('--color=false') !== -1) {
			return false;
		}

		if (argv.indexOf('--color') !== -1 ||
			argv.indexOf('--colors') !== -1 ||
			argv.indexOf('--color=true') !== -1 ||
			argv.indexOf('--color=always') !== -1) {
			return true;
		}

		if (process.stdout && !process.stdout.isTTY) {
			return false;
		}

		if (process.platform === 'win32') {
			return true;
		}

		if ('COLORTERM' in process.env) {
			return true;
		}

		if (process.env.TERM === 'dumb') {
			return false;
		}

		if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
			return true;
		}

		return false;
	})();

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {///<reference path="../../../typings/node/node.d.ts"/>
	/**
	 * Monitors the size of the terminal. It always contains the current size
	 * of the terminal
	 */
	var TerminalSizeWatcher = (function () {
	    /**
	     * Register itself for terminal size changes.
	     */
	    function TerminalSizeWatcher() {
	        var _this = this;
	        this.rows = process.stdout.rows ? process.stdout.rows : 25;
	        this.columns = process.stdout.columns ? process.stdout.columns : 80;
	        this._storeSize = function () {
	            _this.rows = process.stdout.rows ? process.stdout.rows : 25;
	            _this.columns = process.stdout.columns ? process.stdout.columns : 80;
	        };
	        process.stdout.on("resize", this._storeSize);
	    }
	    return TerminalSizeWatcher;
	})();
	exports.TerminalSizeWatcher = TerminalSizeWatcher;
	//# sourceMappingURL=TerminalSizeWatcher.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 16 */
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
	    snippetCode.split(/\n/).forEach(function (line, index) {
	        if (state == ReadState.BLANK) {
	            if (/^\s*$/.test(line)) {
	                return; //=> blank line, nothing to do
	            }
	            if (/^\s*#.*$/.test(line)) {
	                return; //=> comment line, nothing to do.
	            }
	            var m = /^snippet\s+(.*)\s+"(.*)"(\s+\w+\s*)?$/.exec(line);
	            if (m) {
	                currentSnippet = {
	                    macro: m[1],
	                    description: m[2],
	                    code: []
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
/* 17 */
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
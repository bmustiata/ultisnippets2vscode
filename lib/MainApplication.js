/// <reference path="../../../typings/nomnom/nomnom.d.ts" />
var fs = require("fs");
var nomnom = require("nomnom");
var terminal_console_1 = require("terminal-console");
var UltiSnippetParser_1 = require("./UltiSnippetParser");
var VisualStudioConverter_1 = require("./VisualStudioConverter");
var console = new terminal_console_1.TerminalConsole();
var parameters = nomnom.option("in", {
    help: "UltiSnips input file."
}).option("out", {
    help: "Visual Studio Code output file."
}).parse(process.argv);
var ultiSnippets = fs.readFileSync("/tmp/yolo.snippets", "utf-8");
var vsSnippets = {};
UltiSnippetParser_1.parseSnippets(ultiSnippets)
    .map(function (snippet) { return VisualStudioConverter_1.convertToVisualSnippet(snippet); })
    .forEach(function (snippet) { return vsSnippets[snippet.prefix] = snippet; });
console.log(JSON.stringify(vsSnippets, null, 4));
//# sourceMappingURL=MainApplication.js.map
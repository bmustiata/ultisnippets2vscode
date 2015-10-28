#!/usr/bin/env node
var fs = require("fs");
var nomnom = require("nomnom");
var terminal_console_1 = require("terminal-console");
var UltiSnippetParser_1 = require("./UltiSnippetParser");
var VisualStudioConverter_1 = require("./VisualStudioConverter");
var console = new terminal_console_1.TerminalConsole();
var parameters = nomnom.option("in", {
    help: "UltiSnips input file.",
    required: true
}).option("out", {
    help: "Visual Studio Code output file.",
    required: true
}).parse(process.argv);
var ultiSnippets = fs.readFileSync(parameters["in"], "utf-8");
var vsSnippets = {};
UltiSnippetParser_1.parseSnippets(ultiSnippets)
    .map(function (snippet) { return VisualStudioConverter_1.convertToVisualSnippet(snippet); })
    .forEach(function (snippet) { return vsSnippets[snippet.prefix] = snippet; });
var visualStudioCode = JSON.stringify(vsSnippets, null, 4);
fs.writeFileSync(parameters.out, visualStudioCode, { encoding: "utf-8" });
//# sourceMappingURL=MainApplication.js.map
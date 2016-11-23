


import fs = require("fs")


import * as nomnom from "nomnom"
import {TerminalConsole} from "terminal-console"

import {parseSnippets} from "./UltiSnippetParser"
import {convertToVisualSnippet} from "./VisualStudioConverter"
import {VisualStudioCodeSnippets} from "./VisualStudioOutput" 

interface ParserParameters {
	in: string
	out: string
	
	/**
	 * Extra files on the command line
	 */
	_?: Array<string>
}

var console = new TerminalConsole()

var parameters: ParserParameters = nomnom.option("in", {
	help: "UltiSnips input file.",
	abbr: "i",
	required: true
}).option("out", {
	help: "Visual Studio Code output file.",
	abbr: "o",
	required: true
}).parse(process.argv)

var ultiSnippets = fs.readFileSync(parameters["in"], "utf-8")

var vsSnippets : VisualStudioCodeSnippets = {}

parseSnippets(ultiSnippets)
	.map((snippet) => convertToVisualSnippet(snippet))
	.forEach(snippet => vsSnippets[snippet.prefix] = snippet)
	
var visualStudioCode = JSON.stringify(vsSnippets, null, 4);

fs.writeFileSync(parameters.out, visualStudioCode, {encoding: "utf-8"})


import fs = require("fs")
import * as _ from "lodash"

import * as nomnom from "nomnom"
import {TerminalConsole} from "terminal-console"

import {parseSnippets, UltiSnippet} from "./UltiSnippetParser"
import {convertToVisualSnippet} from "./VisualStudioConverter"
import {VisualStudioCodeSnippets} from "./VisualStudioOutput" 

interface ParserParameters {
	in: Array<string>
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
	required: true,
	list: true
}).option("out", {
	help: "Visual Studio Code output file.",
	abbr: "o",
	required: true
}).parse(process.argv)

var vsSnippets : VisualStudioCodeSnippets = {}

_(parameters["in"])
	.map(snippetFileName => fs.readFileSync(snippetFileName, "utf-8"))
	.map(parseSnippets)
	.flatMap((snippet) => convertToVisualSnippet(<any>snippet))
	.forEach(snippet => vsSnippets[snippet.prefix] = snippet)
	
var visualStudioCode = JSON.stringify(vsSnippets, null, 4);

fs.writeFileSync(parameters.out, visualStudioCode, {encoding: "utf-8"})


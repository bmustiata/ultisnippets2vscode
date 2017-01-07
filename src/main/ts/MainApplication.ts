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
	.flatten()
	// we remove the snippets that have regexp for matching
	.filter((it : UltiSnippet) => {
		if (/r/.test(it.flags)) {
			console.log(`Removing snippet ${it.macro} since it's an unsupported regexp.`)
			return false
		}

		return true
	})
	// we sort the items by priority so the same trigger will be overwritten
	// by the snippets with higher priority.
	.sort((item1: UltiSnippet, item2: UltiSnippet) => item1.priority - item2.priority)
	.map((snippet) => convertToVisualSnippet(<any>snippet))
	.forEach(snippet => vsSnippets[snippet.prefix] = snippet)
	
var visualStudioCode = JSON.stringify(vsSnippets, null, 4)

fs.writeFileSync(parameters.out, visualStudioCode, {encoding: "utf-8"})

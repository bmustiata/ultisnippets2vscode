import fs = require("fs")
import * as path from "path"
import * as _ from "lodash"

import * as nomnom from "nomnom"
import {TerminalConsole} from "terminal-console"

import {parseSnippets, UltiSnippet} from "./UltiSnippetParser"
import {convertToVisualSnippet} from "./VisualStudioConverter"
import {VisualStudioCodeSnippets} from "./VisualStudioOutput" 

interface ParserParameters {
	in?: Array<string>
	out: string
	
	filetype?: string
	verbose?: boolean

	/**
	 * Extra files on the command line
	 */
	_?: Array<string>
}

var console = new TerminalConsole()

var parameters: ParserParameters = nomnom.option("in", {
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
}).parse(process.argv)

let vsSnippets : VisualStudioCodeSnippets = {}
let fileNames : Array<string> = []

if (parameters["in"]) {
	fileNames.push(...parameters["in"])
}

if (parameters.filetype) {
	const SNIPPETS_FOLDER = process.env.VIM_ULTISNIPS_FOLDER

	if (!SNIPPETS_FOLDER) {
		console.error("You need to set the VIM_ULTISNIPS_FOLDER environment variable to use the vim filetypes.")
		process.exit(1)
	}

	const filetype = `all.${parameters.filetype}`

	filetype.split(".")
		.map(it => `${path.join(SNIPPETS_FOLDER, it)}.snippets`)
		.forEach(it => fileNames.push(it))
}

if (!fileNames.length) {
	console.error("You need to pass in some snippets files to process using the actual " + 
				  "snippets file (with --in) or the VIM file type string using (--filetype).")
	process.exit(2)
}

_(fileNames)
	.map(snippetFileName => {
		try {
			return parseSnippets(snippetFileName,
								 fs.readFileSync(snippetFileName, "utf-8"),
								 parameters.verbose)
		} catch (e) {
			console.warn(`Unable to parse ${snippetFileName}.`, parameters.verbose ? e : "")
			return null
		}
	})
	.flatten()
	// we remove the snippets that have regexp for matching
	.filter((it : UltiSnippet) => {
		if (!it) { // mapping to an UltiSnippet failed
			return false
		}

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

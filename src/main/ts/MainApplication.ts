/// <reference path="../../../typings/nomnom/nomnom.d.ts" />

import * as fs from "fs"
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
	help: "UltiSnips input file."
}).option("out", {
	help: "Visual Studio Code output file."
}).parse(process.argv)

var ultiSnippets = fs.readFileSync("/tmp/yolo.snippets", "utf-8")

var vsSnippets : VisualStudioCodeSnippets = {}

parseSnippets(ultiSnippets)
	.map((snippet) => convertToVisualSnippet(snippet))
	.forEach(snippet => vsSnippets[snippet.prefix] = snippet)
	
console.log(JSON.stringify(vsSnippets, null, 4));

import * as path from "path"
import * as fs from "fs"

export interface UltiSnippet {
	macro: string
	description: string
	code: Array<string>,
	priority: number,
	flags: string
}

enum ReadState {
	BLANK,
	SNIPPET_CONTENT
}

export function parseSnippets(snippetsFile: string, snippetCode : string) : Array<UltiSnippet> {
	var result : Array<UltiSnippet> = []
	var currentSnippet : UltiSnippet = null
	var state : ReadState = ReadState.BLANK
	var currentPriority = 0
	
	snippetCode.split(/\n/).forEach((line, index) => {
		if (state == ReadState.BLANK) {
			if (/^\s*$/.test(line)) {
				return; //=> blank line, nothing to do
			}
			
			if (/^\s*#.*$/.test(line)) {
				return; //=> comment line, nothing to do.
			}

			if (/^priority -?\d+$/.test(line)) {
				currentPriority = parseInt(/^priority (-?\d+)$/.exec(line)[1])
				return; // priority for snippets.
			}

			if (/^extends .+?$/.test(line)) {
				try {
					// FIXME: normally this should be a callback function of some sort probably,
					// not just reading files, and reparsing.
					let typeExtended = /^extends (.+?)$/.exec(line)[1]
					var typeExtendedSnippetFile = path.join(path.dirname(snippetsFile), typeExtended) + ".snippets"
					let extraSnippets = parseSnippets(typeExtendedSnippetFile,
										fs.readFileSync(typeExtendedSnippetFile, "utf-8"))

					result.push(...extraSnippets)
				} catch (e) {
					console.error(`Unable to parse: ${typeExtendedSnippetFile} required via ${snippetsFile}:${index + 1} : ${line}`, e)
				}

				return; // extended types
			}
			
			var m = /^snippet\s+(.*)\s+"(.*)"(\s+(\w+)\s*)?$/.exec(line)
			if (m) {
				currentSnippet = {
					macro: m[1],
					description: m[2],
					code : [],
					priority: currentPriority,
					flags: m[4]
				}
				
				result.push(currentSnippet)
				state = ReadState.SNIPPET_CONTENT
				
				return //=> done
			} else {
				throw new Error("Error at line: " + (index + 1) + ", unable to parse: " + line)
			}
		}
		
		if (state == ReadState.SNIPPET_CONTENT) {
			if (/^endsnippet\s*$/.test(line)) {
				state = ReadState.BLANK
				return // => done reading snippets
			}
			
			currentSnippet.code.push(line)
		}
	})
	
	return result
}

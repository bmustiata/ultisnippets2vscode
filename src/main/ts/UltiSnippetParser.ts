export interface UltiSnippet {
	macro: string
	description: string
	code: Array<string>
}

enum ReadState {
	BLANK,
	SNIPPET_CONTENT
}

export function parseSnippets(snippetCode : string) : Array<UltiSnippet> {
	var result : Array<UltiSnippet> = []
	var currentSnippet : UltiSnippet = null
	var state : ReadState = ReadState.BLANK
	
	snippetCode.split(/\n/).forEach((line, index) => {
		if (state == ReadState.BLANK) {
			if (/^\s*$/.test(line)) {
				return; //=> blank line, nothing to do
			}
			
			if (/^\s*#.*$/.test(line)) {
				return; //=> comment line, nothing to do.
			}
			
			var m = /^snippet\s+(.*)\s+"(.*)"(\s+\w+\s*)?$/.exec(line)
			if (m) {
				currentSnippet = {
					macro: m[1],
					description: m[2],
					code : []
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
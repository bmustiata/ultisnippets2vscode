
import {VisualStudioCodeSnippet} from "./VisualStudioOutput"
import {UltiSnippet} from "./UltiSnippetParser"

export function convertToVisualSnippet(ultiSnippet : UltiSnippet) : VisualStudioCodeSnippet {
	var resolvedCode = convertCode(ultiSnippet)
	
	var result = {
		prefix : ultiSnippet.macro,
		description: ultiSnippet.description,
		body: resolvedCode
	}
		
	return result
}

function convertCode(ultiSnippet : UltiSnippet) : Array<string> {
	var variables : Array<string> = detectVariables(ultiSnippet.code)
	
	return ultiSnippet.code
}

/**
 * Detect the variables names from a UltiSnips template. The variables
 * are surrounded by brackets for easier replacement.
 */
function detectVariables(code : Array<string>) : Array<string> {
	let result = ["0"];
	
	code.forEach((line) => {
		let matcher, index
	
		do {
			const VARIABLE_RE = /\$\{\d+\:(.*?)\}/
			matcher = VARIABLE_RE.exec()
			if (matcher) {
				console.log(matcher);
			} 
		} while (matcher);
	})
}
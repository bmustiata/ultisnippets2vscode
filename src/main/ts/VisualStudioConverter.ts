
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

export interface VariablesIndex {
	[key: number] : string
}

function convertCode(ultiSnippet : UltiSnippet) : Array<string> {
	if (!ultiSnippet.code) {
		throw new Error(`Snippet ${ultiSnippet.macro} has no code. (${ultiSnippet})`);
	}

	var variables : VariablesIndex = detectVariables(ultiSnippet.code)
	
	return ultiSnippet.code
				.map(replaceVariables(variables));
}

/**
 * Detect the variables names from a UltiSnips template. The variables
 * are surrounded by brackets for easier replacement.
 */
function detectVariables(code : Array<string>) : VariablesIndex {
	let result: VariablesIndex = {0: "0"};
	
	code.forEach((line) => {
		let matcher, index
		const VARIABLE_RE = /\$\{(\d+)\:(.*?)\}/g

		do {
			matcher = VARIABLE_RE.exec(line)
			
			if (matcher) {
				let index = parseInt(matcher[1])
				let variableName = matcher[2]
				
				result[index] = "{" + variableName + "}"
			}
		} while (matcher);
	})
	
	return result
}

/**
 * Returns a function that replaces the variables from a line of a
 * UltiSnips template, into a line of visual studio code.
 */
function replaceVariables( variables : VariablesIndex ) : (line: string) => string {
	return (line) => line.replace(/\$(\d+)/g, function(subString, index) {
		return "$" + variables[parseInt(index)]
	}).replace(/\$\{(\d+)\:(.*?)\}/g, function(subString, index, varName) {
		return "$" + variables[parseInt(index)]
	})
}

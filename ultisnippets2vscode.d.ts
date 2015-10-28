/// <reference path="../typings/nomnom/nomnom.d.ts" />
declare module 'ultisnippets2vscode/lib/UltiSnippetParser' {
	export interface UltiSnippet {
	    macro: string;
	    description: string;
	    code: Array<string>;
	}
	export function parseSnippets(snippetCode: string): Array<UltiSnippet>;

}
declare module 'ultisnippets2vscode/lib/VisualStudioOutput' {
	export interface VisualStudioCodeSnippet {
	    prefix: string;
	    body: Array<string>;
	    description: string;
	}
	export interface VisualStudioCodeSnippets {
	    [name: string]: VisualStudioCodeSnippet;
	}

}
declare module 'ultisnippets2vscode/lib/VisualStudioConverter' {
	import { VisualStudioCodeSnippet } from 'ultisnippets2vscode/lib/VisualStudioOutput';
	import { UltiSnippet } from 'ultisnippets2vscode/lib/UltiSnippetParser';
	export function convertToVisualSnippet(ultiSnippet: UltiSnippet): VisualStudioCodeSnippet;
	export interface VariablesIndex {
	    [key: number]: string;
	}

}
declare module 'ultisnippets2vscode' {
	import main = require('ultisnippets2vscode/lib/MainApplication');
	export = main;
}

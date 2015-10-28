import { VisualStudioCodeSnippet } from "./VisualStudioOutput";
import { UltiSnippet } from "./UltiSnippetParser";
export declare function convertToVisualSnippet(ultiSnippet: UltiSnippet): VisualStudioCodeSnippet;
export interface VariablesIndex {
    [key: number]: string;
}

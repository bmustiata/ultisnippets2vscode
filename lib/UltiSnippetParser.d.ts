export interface UltiSnippet {
    macro: string;
    description: string;
    code: Array<string>;
}
export declare function parseSnippets(snippetCode: string): Array<UltiSnippet>;

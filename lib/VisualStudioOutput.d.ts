export interface VisualStudioCodeSnippet {
    prefix: string;
    body: Array<string>;
    description: string;
}
export interface VisualStudioCodeSnippets {
    [name: string]: VisualStudioCodeSnippet;
}

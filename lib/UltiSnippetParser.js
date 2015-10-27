var ReadState;
(function (ReadState) {
    ReadState[ReadState["BLANK"] = 0] = "BLANK";
    ReadState[ReadState["SNIPPET_CONTENT"] = 1] = "SNIPPET_CONTENT";
})(ReadState || (ReadState = {}));
function parseSnippets(snippetCode) {
    var result = [];
    var currentSnippet = null;
    var state = ReadState.BLANK;
    snippetCode.split(/\n/).forEach(function (line, index) {
        if (state == ReadState.BLANK) {
            if (/^\s*$/.test(line)) {
                return;
            }
            if (/^\s*#.*$/.test(line)) {
                return;
            }
            var m = /^snippet\s+(.*)\s+"(.*)"(\s+\w+\s*)?$/.exec(line);
            if (m) {
                currentSnippet = {
                    macro: m[1],
                    description: m[2],
                    code: []
                };
                result.push(currentSnippet);
                state = ReadState.SNIPPET_CONTENT;
                return;
            }
            else {
                throw new Error("Error at line: " + (index + 1) + ", unable to parse: " + line);
            }
        }
        if (state == ReadState.SNIPPET_CONTENT) {
            if (/^endsnippet\s*$/.test(line)) {
                state = ReadState.BLANK;
                return;
            }
            currentSnippet.code.push(line);
        }
    });
    return result;
}
exports.parseSnippets = parseSnippets;
//# sourceMappingURL=UltiSnippetParser.js.map
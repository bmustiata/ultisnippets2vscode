function convertToVisualSnippet(ultiSnippet) {
    var resolvedCode = convertCode(ultiSnippet);
    var result = {
        prefix: ultiSnippet.macro,
        description: ultiSnippet.description,
        body: resolvedCode
    };
    return result;
}
exports.convertToVisualSnippet = convertToVisualSnippet;
function convertCode(ultiSnippet) {
    var variables = detectVariables(ultiSnippet.code);
    return ultiSnippet.code;
}
function detectVariables(code) {
    var result = ["0"];
    var VARIABLE_RE = /\$\{\d+\:(.*?)\}/;
    code.forEach(function (line) {
        var matcher = VARIABLE_RE.exec(line);
        if (matcher) {
            console.log(matcher);
        }
    });
}
//# sourceMappingURL=VisualStudioConverter.js.map
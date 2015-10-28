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
    return ultiSnippet.code
        .map(replaceVariables(variables));
}
function detectVariables(code) {
    var result = { 0: "0" };
    code.forEach(function (line) {
        var matcher, index;
        var VARIABLE_RE = /\$\{(\d+)\:(.*?)\}/g;
        do {
            matcher = VARIABLE_RE.exec(line);
            if (matcher) {
                var index_1 = parseInt(matcher[1]);
                var variableName = matcher[2];
                result[index_1] = "{" + variableName + "}";
            }
        } while (matcher);
    });
    return result;
}
function replaceVariables(variables) {
    return function (line) { return line.replace(/\$(\d+)/g, function (subString, index) {
        return "$" + variables[parseInt(index)];
    }).replace(/\$\{(\d+)\:(.*?)\}/g, function (subString, index, varName) {
        return "$" + variables[parseInt(index)];
    }); };
}
//# sourceMappingURL=VisualStudioConverter.js.map
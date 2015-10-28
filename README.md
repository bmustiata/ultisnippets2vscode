# ultisnippets2vscode

Small application that can convert snippets written for UltiSnips in the JSON format that Visual Studio Code
can digest. It works with just simple variables (no replacements, no flags, no executions)

## Install

In order to install this run:

```sh
npm install -g ultisnippets2vscode
```

## Usage

Assuming this would be the content in the `ts.snippets`:

```snippet
snippet for "A for snippet"
for (var ${1:i} = 0; $1 < ${2:array}.length; $1++) {
        var ${3:m} = $2[$1];
}
endsnippet
```

You can run the command:

```sh
ultisnippets2vscode --in ts.snippets\
     --out vscode-0.9.1/resources/app/extensions/typescript/snippets/typescript.json
```

Then in the `typescript.json` file the content would be:

```json
{
    "for": {
        "prefix": "for",
        "description": "A for snippet",
        "body": [
            "for (var ${i} = 0; ${i} < ${array}.length; ${i}++) {",
            "\tvar ${m} = ${array}[${i}];",
            "}"
        ]
    }
}
```

## ChangeLog

* 2015-10-28  v0.1.1  Added readme.
* 2015-10-28  v0.1.0  Initial release.


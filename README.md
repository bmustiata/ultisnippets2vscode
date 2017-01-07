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

## File Type

If you're using multiple file types a lot, you can also use them, and specify via `-t`:

```sh
ultisnippets2vscode -t html.hbs.handlebars -o html.json
```

This will parse all the files from the folder specified in the environment variable
`VIM_ULTISNIPS_FOLDER` named `all.snippets`, `html.snippets`, `hbs.snippets` and
`handlebars.snippets` if they exist.

`extends` and `priority` keywords are also respected.

## ChangeLog

* 2017-01-07  v0.3.0  Vim filetypes support. (eg. html.hbs.txt)
* 2017-01-07  v0.2.0  Allow multiple input files. Priority.
* 2015-10-28  v0.1.1  Added readme.
* 2015-10-28  v0.1.0  Initial release.


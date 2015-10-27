/**
 * Grunt project configuration.
 */
module.exports = function(grunt) {
    // configuration for the plugins.

    // Project name:		ultisnippets2vscode
    // Main ts module:	    MainApplication
    // Source folder:	    src/main/ts
    // Tests source folder: src/test/ts
    // Output folder:	    lib/
    // Test output folder:  target/test

    grunt.initConfig({
        clean: {
            dist : [
                "lib/"
            ],

            test : [
                "target/test"
            ]
        },

        ts: {
            "dist" : {
                options: {
                    module : "commonjs",
                    sourceMap: true,
                    declaration: true,
                },
                files: [{
                    dest: "lib/",
                    src: [
                        "src/main/ts/**/*.ts",
                        "src/main/ts/**/*.d.ts"
                    ]
                }]
            },

            "test" : {
                options: {
                    module : "commonjs",
                    sourceMap: true,
                    declaration: true,
                },
                files: [{
                    dest: "target/test",
                    src: [
                        "src/test/ts/**/*.ts",
                        "src/test/ts/**/*.d.ts"
                    ]
                }]
            }
        },

        dtsGenerator : {
            "dist" : {
                options: {
                    name: "ultisnippets2vscode",
                    baseDir: ".",
                    out: "ultisnippets2vscode.d.ts",
                    main: "ultisnippets2vscode/lib/MainApplication",
                    excludes: [
                        "node_modules/**/*.d.ts",
                        "typings/**/*.d.ts"
                    ]
                },

                files : [
                    {
                        expand: true,
                        src: [
                            "lib/*.d.ts"
                        ]
                    }
                ]
            }
        },

        mochaTest: {
            test: {
                options: {
                    reporter: "spec",
                    captureFile: "target/testtests_results.txt"
                },
                src: ["target/test**/*.js"]
            }
        }
    });

    // load NPM tasks:
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("ciplogic-dts-generator");
    grunt.loadNpmTasks("grunt-mocha-test");

    grunt.registerTask("dist", ["clean:dist", "ts:dist", "dtsGenerator:dist"]);
    grunt.registerTask("test", ["clean:test", "ts:test", "mochaTest:test"]);

    // register our tasks:
    grunt.registerTask("default", ["dist", "test"]);
};


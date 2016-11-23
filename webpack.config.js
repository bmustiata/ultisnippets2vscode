module.exports = {
    entry: './src/main/ts/MainApplication.ts',
    output: {
        filename: "lib/MainApplication.js"
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            {
                test: function(name) {
                    if (/\.tsx?$/.test(name)) {
                        return true;
                    }

                    if (!/\./.test(name)) {
                        return true;
                    }

                    return false;
                },
                loader: 'babel-loader?presets=es2015!awesome-typescript-loader',
            }
        ]
    }
};


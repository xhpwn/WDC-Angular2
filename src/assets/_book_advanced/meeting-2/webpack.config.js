const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
module.exports = {
    entry: './src/app', //changed to .ts
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            { // Added this rule
                test: /\.ts$/,
                use: 'awesome-typescript-loader', // new loader for different type of file
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    plugins: [new HtmlWebpackPlugin()]
}
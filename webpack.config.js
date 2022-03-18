const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "build.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
            inject: true,
            filename: path.resolve(__dirname, './dist/index.html'),
        }),
    ],
    mode: "development",
    devtool: "source-map",
    devServer: {
        port: 8080,
        hot: true,
    },
};

module.exports = config;

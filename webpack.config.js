const webpack = require('webpack');
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');

// Setting internals ============================
const internals = {
    src: `${ __dirname }/assets/src`,
    isProd: (process.env.NODE_ENV) ? true : false
  };

const config = {
    mode: 'production',
    entry: `${ internals.src }/js/main.js`,
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(`${__dirname}/`, 'public'),
        // publicPath:  path.resolve(`${__dirname}/`, 'public')
    },
    resolveLoader: {
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                enforce: "pre",
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader','sass-loader'],
            },
        ]
    },
    plugins: [
        // new CopyPlugin([
        //     { from: 'images/**/*' },
        // ]),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['!images*'],
            cleanOnceBeforeBuildPatterns: ['!images*','!**/*.svg','!**/*.png','!**/*.xml','!**/*.ico','!**/*.json','!favicon*'],
        }),
        new HtmlWebpackPlugin({
            scriptLoading:'defer',
            template: 'assets/src/html/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
};

// [ENV] Conditional injects [IF NOT PROD]
if (!internals.isProd) {
  
    config.mode = 'development';
    config.devtool = 'eval-source-map';
  
    // LINTER
    config.plugins.push(new StyleLintPlugin());
  
    // Watcher
    config.watch = true;
}

module.exports = config;
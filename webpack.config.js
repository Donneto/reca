const webpack = require('webpack');
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


// Setting internals ============================
const internals = {
    src: `${ __dirname }/assets/src`,
    isProd: (process.env.NODE_ENV) ? true : false
  };

const config = {
    mode: 'production',
    entry: `${ internals.src }/js/main.js`,
    output: {
        filename: '[name].js',
        path: path.resolve(`${__dirname}/`, 'public'),
        publicPath:  path.resolve(`${__dirname}/`, 'public')
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
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        })
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
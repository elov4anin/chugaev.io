const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
	index: './index',
        styles: './styles.styl',
        vendor: ['jquery', 'lodash']
    },
    output: {
        filename: '[name].js',
	path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devtool: 'source-map', /*source-map for prod*/
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader:  'awesome-typescript-loader',
            },
	    {
		test: /\.png$/,
		loader:  'file-loader',
		options: {
		    name: '[path][name].[ext]?[hash]'
		}
	    },
	    {
		test: /\.js$/,
		loader: 'strip-loader',
		options: {
		    strip: ['console.*']
		}
	    },
            {
                test: /\.styl$/,
                /*loader: ['style-loader', 'css-loader']*/
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','stylus-loader']
                })
            },
	    {
		test: /\.css$/,
		use: ExtractTextPlugin.extract({
		    fallback: 'style-loader',
		    use: 'css-loader'
		})
	    }/*,
	    {
	        test: require.resolve('jquery'),
		loader: 'expose-loader?$'
	    }*/
                ]
    },

    plugins: [
	/*Sens Registr*/
	new CaseSensitivePathsPlugin(),
	/*Minification JS*/
	/*new webpack.optimize.UglifyJsPlugin(),*/
	/* Global vars  */
	new webpack.DefinePlugin({
	    VERSION: '0.0.2'
	}),
	/*global libs*/
	/*new webpack.ProvidePlugin({
	 $: 'jquery'
	 })*/
	/*Html generate*/
	new HtmlWebpackPlugin({
	    title: 'Webpack test',
	    hash: false,
	    template: './template/template.html'
	}),
	/*Shared Js*/
	new webpack.optimize.CommonsChunkPlugin({
	    name: ['common', 'vendor'],
	    minChunks: 2
	}),
	new ExtractTextPlugin({
	    disable: false,
	    ignoreOrder: true,
	    filename: './[name].css',
	    allChunks: true
	})
    ],

    watch: false
};
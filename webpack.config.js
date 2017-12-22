/*
* @Author: 21746209
* @Date:   2017-12-18 13:22:36
* @Last Modified by:   21746209
* @Last Modified time: 2017-12-18 13:46:46
*/
var webpack = require("webpack");
var ExtractTextPlugin = require("Extract-text-webpack-plugin");
var Htmlwebpakcplugin = require("html-webpack-plugin");
var getHtmlConfig = function(name,title){
	return {
		template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common', name] 
	}
}
var config = {
	entry: {
		"common": ["./src/page/common/index.js"]
		"index":["./src/page/index/index.js"]
	},
	output: {
		path: "./dist",
		filename: "js/[name].js"
	},
	externals: {
		"jquery": "window.jQuery"
	},
	module: {
		loaders: [
			{test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
			{test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[hash:8].[name].[ext]' },
		]
	},
	resolve: {
		alias: {
			node_modules: __dirname+"node_modules",
			util: __dirname+"util",
			page:__dirname+"page",
			servive: __dirname+ "service",
			image: __dirname+"image"
		}
	}
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        new ExtractTextPlugin("css/[name].css"),
        new Htmlwebpakcplugin(getHtmlConfig("index","首页"));
		new 
	]
}
module.exports = config;
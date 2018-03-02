/*
* @Author: 21746209
* @Date:   2017-12-18 13:22:36
* @Last Modified by:   21746209
* @Last Modified time: 2018-03-01 20:39:49
*/
var webpack = require("webpack");
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var Htmlwebpakcplugin = require("html-webpack-plugin");

//环境变量的配置
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';


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
		"common": ["./src/page/common/index.js"],
		"index":["./src/page/index/index.js"],
		"result":["./src/page/result/index.js"],
		"user-login":["./src/page/user-login/index.js"]
	},
	output: {
		path: "./dist",
		publicPath:"/dist",
		filename: "js/[name].js"
	},
	externals : {
        'jquery' : 'window.jQuery'
    },
	module: { 
		loaders: [
			{test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
			{test: /\.string$/, loader: 'html-loader'},
			{test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[hash:8].[name].[ext]' }
		]
	},
	 resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        //单独打包到css文件中
        new ExtractTextPlugin("css/[name].css"),
        new Htmlwebpakcplugin(getHtmlConfig("index","首页")),
        new Htmlwebpakcplugin(getHtmlConfig("list","商品列表页")),
        new Htmlwebpakcplugin(getHtmlConfig("result","操作结果")),
        new Htmlwebpakcplugin(getHtmlConfig("user-login","用户登录"))
	]
}
if("dev"===WEBPACK_ENV){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;
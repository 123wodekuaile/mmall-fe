/*
* @Author: 21746209
* @Date:   2017-12-22 10:01:29
* @Last Modified by:   21746209
* @Last Modified time: 2018-03-01 21:15:11
*/
require("./index.css");
require("page/common/nav-simple/index.js");
var _mm = require("util/mm.js");
$(function(){
	var type = _mm.getUrlParam('type') || 'default';
	$("."+type+"-success").show(); 
})
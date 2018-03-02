/*
* @Author: 21746209
* @Date:   2018-01-04 14:04:40
* @Last Modified by:   21746209
* @Last Modified time: 2018-02-28 15:28:44
*/
require("./index.css");
var _mm = require("util/mm.js");
var header = {
	init: function(){
		this.onload();
		this.bindEvent();
	},
	onload:function(){
		var keyword = _mm.getUrlParam("keyword");
		if(keyword){
			$("#search-input").val(keyword);
			//跳转之后赋值
		}
	},
	bindEvent:function(){
		var _this = this;
		$("#search-btn").click(function(){
			_this.searchSubmit();	
		});
		$("#search-input").keyup(function(e){
			if(e.keyCode===13){
				_this.searchSubmit();	
			}
		})
	},
	searchSubmit: function(){
		var keyword = $.trim($("#search-input").val());
		if(keyword){
			//这一步不需要发送请求吗？敬请期待
			window.location.href = './list.html?keyword=' + keyword;
		}else{
			_mm.goHome();
		}
	}
}

header.init();
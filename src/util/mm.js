/*
* @Author: 21746209
* @Date:   2017-12-18 10:33:24
* @Last Modified by:   21746209
* @Last Modified time: 2017-12-25 19:42:53
*/
//通用的逻辑部分开发
var Hogan = require("hogan");
var conf = {
	serverHost: ""
}
var _mm = {
	request: function(param){
		var _this = this;
		$.ajax({
			type 		: param.method || "POST",
			dataType	: param.type   || "json",
			url 		: param.url    || ""    ,
			data 		: param.data   || ""	,
			success: function(res){
				if(0===res.status){
                    //请求成功
					typeof param.success === "function"&&param.success(res.data,res.msg);
				}else if(10===res.status){
                    //无登录状态
					_this.doLogin();
				}else if(1===res.status){
                    //请求数据错误
					typeof param.success==="function"&&param.error(res.msg);
				}
			},
			error: function(err){
				typeof param.error==="function"&&param.error(err.statusText);
			}
		})
	},
     doLogin: function(){
        window.location.href = './user-login.html?redirect='+encodeURIComponent(window.location.href);
    },
	getServerUrl: function(path){
		return conf.serverHost+path;
	},
	getUrlParam : function(name){
        var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result  = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    renderHtml: function(htmlTemplate,data){
    	var template = Hogan.complie(htmlTemplate),
    		result = Hogan.render(data)
    },
    render : function(htmlTemplate,data){
    	var template = Hogan.complie(htmlTemplate);
    		result = Hogan.render(data);
    	return result;
    }
    successTips: function(msg){
    	alert(msg || "操作成功")
    },
    errorTips : function(msg){
    	alert(msg || "哪里出错了呢？")
    },
    validate: function(value,type){
    	var value = $.trim(value);
    	if("require"===type){
    		return !!value;
    	}
    	if("phone"===type){
			return /^1\d{10}$/.test(value);
    	}
    	if("email"===type){
    		return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
    	}
    },
    goHome: function(){
    	window.location.href = './index.html';
    }
}
module.exports = _mm;
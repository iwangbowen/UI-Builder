"use strict";
var getFundodooTime = function(){
	var nowTime = new Date();
	var year = nowTime.getFullYear();
    var month = nowTime.getMonth() + 1;
    var day = nowTime.getDate();
        
    var hh = nowTime.getHours();
    var mm = nowTime.getMinutes();
    var ss = nowTime.getSeconds();
        
    if(month < 10){
    	month = "0" + month;
    }
                
    if(day < 10){
    	day = "0" + day;
    }
        
    if(hh < 10){
    	hh = "0" + hh;
    }
            
    if (mm < 10){
    	mm = "0" + mm;
    }
         
    if (ss < 10){
    	ss = "0" + ss;
    }
       
	var fundodooTime = "" + year + month + day + hh + mm + ss + nowTime.getMilliseconds();
	return fundodooTime;  
};

var getSeq = function(){
	var seq = sessionStorage.getItem("FUNDODOO_SEQ")
	if(seq){
		seq++;
	}else{
		seq = 1;
	}
	sessionStorage.setItem('FUNDODOO_SEQ',seq);
	return "PC"+sessionStorage.getItem("FUNDODOO_USERID")+getFundodooTime()+seq;
};

var urlFormat = function(url,menuId){
	if(url != null){
		if(url.indexOf("http") >= 0){
			if(url.indexOf("?") >= 0){
				url = url + "&tok=" + sessionStorage.getItem("FUNDODOO_TOKEN");
			}else{
				url = url + "?tok=" + sessionStorage.getItem("FUNDODOO_TOKEN");
			}
		}else if("#" === url.charAt(url.length - 1)){
			
		}else{
			url = config.fundodooWebDomainUrl + url + "?menuId=" + menuId;
		}
	}
	return url;
}

$.ajaxSetup({
	method : 'POST',
	dataType : 'json',
	processData : false,
	error : function(XHR,textStatus,errorThrown ){
		layer.msg(errorThrown.message, {icon: 5,time:0,shadeClose:true,shade :0.3});
	},
	headers :{
		"Author": "drunk" ,
        "Powered-By": "https://www.fundodoo.com/",
        "Accept": "application/json; charset=utf-8",
        "tok": sessionStorage.getItem("FUNDODOO_TOKEN"),
        "sid":getSeq(),
        "Authorization": sessionStorage.getItem("FUNDODOO_TOKEN")
	}
});

var login = function(){
	$.ajax({ 
		url: config.login,
		dataType: 'json',
		async:false,
		data : $("#login-form").serializeJSON(),
		beforeSend : function(XHR,ST){
			var userId = $("#inputuserId").val();
			var pwd = $("#inputPassword").val();
			if(userId && $.trim(userId).length > 0){
				$("#inputuserId").val($.trim(userId));
			}else{
				layer.msg("\u8bf7\u68c0\u67e5\u7528\u6237\u540d\uff01", {icon:5,time:0,shadeClose:true,shade :0.3});
				return false;
			}
			if(pwd && $.trim(pwd).length > 0){
				$("#inputPassword").val($.trim(pwd));
			}else{
				layer.msg("\u8bf7\u68c0\u67e5\u5bc6\u7801\uff01", {icon:5,time:0,shadeClose:true,shade :0.3});
				return false;
			}
		},
		success: function(rs,status,xhr){
			if("200" === rs.code){
				sessionStorage.setItem('FUNDODOO_TOKEN',rs.data.tok);
				sessionStorage.setItem('FUNDODOO_LOGINOWNER',rs.data.sessionUser.loginOwner);
				sessionStorage.setItem('FUNDODOO_USERID',rs.data.sessionUser.userId);
				sessionStorage.setItem('FUNDODOO_USERNNAME',rs.data.sessionUser.userName);
				top.location.href = config.fundodooWebDomainUrl+'index.html';
			}else{
				//TODO  \u62a5\u9519\u4fe1\u606f
			}
    	}
    });
}

$(document).ready(function() {
	if(sessionStorage.getItem("FUNDODOO_TOKEN") && window.location.pathname.indexOf("html/login.html") >= 0){
		top.location.href = config.fundodooWebDomainUrl+'index.html';
		return true;
	}
	
	$("#loginId").on("click",function(){
		login();
	})
});

(function($){
	var _ajax=$.ajax;
	$.ajax = function(opt){
		var fundodooData = {
			"tok": sessionStorage.getItem("FUNDODOO_TOKEN"),
			"loginOwner": sessionStorage.getItem("FUNDODOO_LOGINOWNER"),
			"sid": getSeq(),
			"data":opt.data || {"Author": "drunk"}
		};
		
		opt.data = JSON.stringify(fundodooData);
		
		if(opt.fundodooAjax){
			//\u6269\u5c55\u589e\u5f3a\u5904\u7406 
			var fundodooIndex = null;
			var fundodooTimer = null;												
			var fn = {
					beforeSend : function(XHR,ST){},
					complete : function(XHR, ST){},
					success : function(DT,ST,XHR){},
					fundodooLayerIndexIn : function(fundodooStart){
						fundodooTimer = setTimeout(function(){
							fundodooStart = fundodooStart + 1;
							$('#queryTimeDiv').html(fundodooStart);
							fn.fundodooLayerIndexIn(fundodooStart);
						},1000);
					},
					fundodooLoadTimeCount : function(){
						fundodooIndex = layer.load(0, {shade: 0.3,time: 302000,content:"<div style='padding-top: 20px;padding-left: 10px; color: blue;'><span id='queryTimeDiv'>0</span> sec</div>"});
					}
			};
			if(opt.beforeSend){
				fn.beforeSend = opt.beforeSend;
			};
			if(opt.complete){
				fn.complete = opt.complete;	
			};
			if(opt.success){
				fn.success = opt.success;
			};
	        var _opt = $.extend(opt,{
	            beforeSend:function(XHR,ST){
	            	//\u63d0\u4ea4\u524d\u56de\u8c03\u65b9\u6cd5  
	            	if (sessionStorage.getItem('FUNDODOO_TOKEN')) {
		       			fn.fundodooLoadTimeCount();
	            		fn.fundodooLayerIndexIn(0);
	            		return fn.beforeSend(XHR,ST);		
					 } else {
					      top.location.href = config.fundodooWebDomainUrl+'html/login.html';
					      return false;
					 }
	            },  
	            complete:function(XHR,ST){
	            	fn.complete(XHR,ST);
	            	if(fundodooTimer != null){
	            		clearTimeout(fundodooTimer);
	            	}
	            	layer.close(fundodooIndex);
	            },
	          	success:function(DT,TS,XHR){
	          	debugger;
	          		if("401" === DT.code){
	          			sessionStorage.clear();
						top.location.href = config.fundodooWebDomainUrl+'html/login.html';
	          		}else if("200" !== DT.code){
	          			layer.msg(DT.comment, {icon: 5,time:0,shadeClose:true,shade :0.3});
	          		}else{
		          		if(opt.async){
	          				setTimeout(function(){
		          				fn.success(DT,TS,XHR);
		          			},500)
	          			}else{
	          				fn.success(DT,TS,XHR);
	          			}
	          		}
	          	}
	        });
	        return _ajax(_opt);
		}else{
			//\u6269\u5c55\u589e\u5f3a\u5904\u7406  
			var fn = {
				beforeSend : function(XHR,ST){},
				success : function(DT,ST,XHR){}
			};
			if(opt.beforeSend){
				fn.beforeSend = opt.beforeSend;
			};
			if(opt.success){
				fn.success = opt.success;
			};
	        var _opt = $.extend(opt,{
	        	beforeSend:function(XHR,ST){
	            	//\u63d0\u4ea4\u524d\u56de\u8c03\u65b9\u6cd5 
	            	if (sessionStorage.getItem('FUNDODOO_TOKEN') || ST.url === config.whiteList.login
	            	|| ST.url === config.whiteList.allOwnerList) {
	            		return fn.beforeSend(XHR,ST);		
					 } else {
					      top.location.href = config.fundodooWebDomainUrl + 'html/login.html';
					      return false;
					 }
	            },
	          	success:function(DT,TS,XHR){
	          		if("401" === DT.code){
	          			sessionStorage.clear();
						top.location.href = config.fundodooWebDomainUrl + 'html/login.html';
	          		}else if("200" !== DT.code){
	          			layer.msg(DT.comment, {icon:5,time:0,shadeClose:true,shade :0.3});
	          		}else{
	          			if(opt.async){
	          				setTimeout(function(){
		          				fn.success(DT,TS,XHR);
		          			},500)
	          			}else{
	          				fn.success(DT,TS,XHR);
	          			}
	          		}
	          	}
	        });
			return _ajax(_opt);
		}
	}
	
	var _fundodooAjax = $.ajax;
	$.extend({
		fundodooAjax:function(opt){
			opt.fundodooAjax = true;
			return _fundodooAjax(opt);
		}
	})
})(jQuery);
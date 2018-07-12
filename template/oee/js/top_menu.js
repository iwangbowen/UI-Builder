var menuRender = function(menuHtml) {
	$("#fundodoo_com-navbar-collapse .navbar-nav").detach();
	$("#fundodoo_com-navbar-collapse").prepend(menuHtml);
}

var remoteMenu = function(){
	$.ajax({ 
		url: config.fundodooWebDomainUrl+"js/menu.json",
		async:false,
		success: function(rs,status,xhr){
			initMenuHtml(rs.data);
    	}
    });
}

var initMenuHtml = function(menuJson){
	var menuHtml = "<ul class='nav navbar-nav'>";
	$.each(menuJson, function (n, menu) {
		if(menu.childList && menu.childList.length){
			menuHtml +=		  "<li class='dropdown'>";
			menuHtml +=		    "<a href='#' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>"+ menu.permissionName +"<span class='caret'></span></a>";
			menuHtml +=		    "<ul class='dropdown-menu menu-top'>";
			$.each(menu.childList, function (sn, secMenu) {
				if(secMenu.childList && secMenu.childList.length){
					menuHtml += "<li class='dropdown-submenu'>";
					menuHtml += "<a href='#'>"+ secMenu.permissionName +"</a>";
					menuHtml +=	"<ul class='dropdown-menu'>";
					$.each(secMenu.childList, function (tn, thiMenu) {
               			menuHtml +=		  "<li><a href='"+urlFormat(thiMenu.defaultURL)+"' class='J_menuItem'>"+thiMenu.permissionName+"</a></li>";
           			});
           			menuHtml +=		"</ul>";
           			menuHtml +=	  "</li>";
				}else{
					menuHtml +=		  "<li><a href='"+urlFormat(secMenu.defaultURL)+"' class='J_menuItem'>"+secMenu.permissionName+"</a></li>";
				}
           	});
           	menuHtml +=		    "</ul>";
           	menuHtml +=	  "</li>";
		}else{
			menuHtml +=		  "<li><a href='"+urlFormat(menu.defaultURL)+"' class='J_menuItem'>"+menu.permissionName+"</a></li>";
		}
   	});
   	menuHtml +=		"</ul>";
   	
   	menuRender(menuHtml);
}

var logout = function(){
	sessionStorage.clear();
	top.location.href = config.fundodooWebDomainUrl+'html/login.html';
}

$(document).ready(function() {
	remoteMenu();
	$("#logoutId").on("click",function(){
		logout();
	})
});
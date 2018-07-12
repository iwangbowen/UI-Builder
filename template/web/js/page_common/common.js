// 在 ID 为 alert_container 的DIV 中显示 msg
function show_alert(alert_id,alert_title,alert_msg){
	if(($("#"+alert_id).length>0)){
		$("#"+alert_id).remove(); 
	}
	var msg ="";
	var msg1 = "<div id='" + alert_id +"'>";
	var msg2= "<a class='close' data-dismiss='alert' href='#'>×</a>";
	var msg3 = "<h4 class='alert-heading'>" + alert_title + "</h4>";
	
	msg = msg1 + msg2 +msg3;
	if($.isArray(alert_msg)){
		for(var i=0; i<alert_msg.length; i++)
		{
			msg = msg +"<p>" + alert_msg[i] +"</p>";
		}
	}else{
			msg = msg +"<p>" + alert_msg +"</p>";
	}
	var msg5 = "</div>"
	msg = msg + msg5;
	$("#alert_container").append(msg);
	$("#"+alert_id).addClass("alert alert-block fade in ");
}

function downLoadFile(formId,downLoadUrl,iframeId){
	var loadLayerIndex = loadTimeCount();
	var xhr = new XMLHttpRequest();
	xhr.open("POST", downLoadUrl);
	xhr.responseType = 'blob';
	xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
        	layer.close(loadLayerIndex);
        	var name = xhr.getResponseHeader("Content-disposition");
        	var filename = name.substring(20,name.length);
            var blob = new Blob([xhr.response], {type: 'text/xls'});
            var csvUrl = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = csvUrl;
            link.download = filename;
            link.click();
//            $("body").append(link);    // 修复firefox中无法触发click
//            link.click();
//            $(link).remove();
        }
    };
    var form = document.getElementById(formId);  
    var formdata = new FormData(form); 
    xhr.send(formdata);
}
function show_modal_dialog(alert_id,alert_title,alert_msg,yesUrl){
	if(($("#"+alert_id).length>0)){
		$("#"+alert_id).remove(); 
	}
	var msg = "";
	msg = msg + "<div id='" + alert_id + "' class='modal hide fade' style='display: none; '>";
	msg = msg + "	<div class='modal-header'>";
	msg = msg + "	  <a class='close' data-dismiss='modal'>×</a>";
	msg = msg + "	  <h3>" + alert_title +"</h3>";
	msg = msg + "	</div>";
	msg = msg + "	<div class='modal-body'>";
	msg = msg +  alert_msg;
	msg = msg + "	</div>";
	msg = msg + "	<div class='modal-footer'>";
	msg = msg + "	  <a href='#' class='btn' data-dismiss='modal'>否</a>";
	msg = msg + "	  <a href=" + yesUrl + " class='btn btn-primary'>是</a>";
	msg = msg + "	</div>";
	msg = msg + "  </div>";
	$("body").append(msg);
	$('#' + alert_id).modal('show');
}
function gotoPage(search_bar_id,pageNoId,pageNo){
	 $("#" +pageNoId).attr("value",pageNo);
	$("#"+search_bar_id).submit();
}

function pageSizeChange(search_bar_id,pageNoId,pageSizeId,pageSize){
	 $("#"+pageSizeId).attr("value",pageSize);
	 $("#"+pageNoId).attr("value",1);
	$("#"+search_bar_id).submit();
}
function orderChange(search_bar_id,pageNoId,orderById,orderByValue,orderId,orderValue){
	//返回原页面  by makeqiang 2017-9-19 10:57:52
	var pageNo = 1;
	if(pageNoId){
		if($("#"+pageNoId).val().length>0){
			pageNo = $("#"+pageNoId).val();
		}
		$("#"+pageNoId).attr("value",pageNo);
	}
	if(orderById && orderByValue){
		$("#"+orderById).attr("value",orderByValue);
	}
	
	if(orderId && orderValue){
		$("#"+orderId).attr("value",orderValue);
	}
	$("#"+search_bar_id).submit();
}

function disableItemWithCkbox(ckBoxId,disableItemId){
	if($("#"+ckBoxId).attr("checked") == "checked"){
		$("#"+disableItemId).removeAttr('disabled');
		$("#"+disableItemId).rules("add", {nowhitespace:true,messages:{nowhitespace:'必须选择'}});
	}else{
		$("#"+disableItemId).attr("disabled","disabled");
		$("#"+disableItemId).rules("remove", {nowhitespace:true,messages:{nowhitespace:'必须选择'}});
	}
}

function send_select_data(openerItemId,openerItemValue,openerItemText)
{
	window.opener.initSelectValue(openerItemId,openerItemValue,openerItemText);
	window.close();
}
function initSelectValue(itemId,itemValue,itemText){
		 $("#" + itemId).select2("data", {id: itemValue, text: itemText}); 
}

function checkedOnlyOne(){
	var chk_value =[]; 
	$('input[name="checkList"]:checked').each(function(){ 
	chk_value.push($(this).val()); 
	}); 
	
	if(chk_value.length==0){
		alert('你还没有选择任何内容！'); 
		return false;
	}

	if(chk_value.length>1){
		alert('你还只能选择一条数据！');
		return false;
	}
	return true;
}

function getFirtChecked(){
	var chk_value =[]; 
	$('input[name="checkList"]:checked').each(function(){ 
	chk_value.push($(this).val()); 
	}); 
	
	if(chk_value.length==0){
		alert('你还没有选择任何内容！'); 
		return false;
	}

	if(chk_value.length>1){
		alert('你还只能选择一条数据！');
		return false;
	}
	return chk_value[0];
}


function getFirtChecked(attName){
	var chk_value =[]; 
	//alert(1);
	$('input[name="checkList"]:checked').each(function(){ 
	chk_value.push($(this)); 
	}); 
	
	if(chk_value.length==0){
		alert('你还没有选择任何内容！'); 
		return false;
	}

	if(chk_value.length>1){
		alert('你只能选择一条数据！');
		return false;
	}
	//console.log(chk_value[0]);
	//alert(chk_value[0]);
	return chk_value[0].attr(attName);
}

function getChecked(checkBoxName){
	var chk_value =[]; 
	//alert(1);
	var queryStr = 'input[name="' +checkBoxName + '"]:checked';
	$(queryStr).each(function(){ 
		chk_value.push($(this).val()); 
	}); 
	
	if(chk_value.length==0){
		alert('你还没有选择任何内容！'); 
		return false;
	}


	//console.log(chk_value[0]);
	//alert(chk_value[0]);
	return chk_value;
}


function CloseWin()      
{      
	window.opener=null;      
	window.open('','_self');      
	window.close();      
} 

function closePop(){
	parent.layer.close(parent.layer.getFrameIndex(window.name));

}

function getTimeKey() {
	thistime = new Date();
	var month = thistime.getMonth() + 1;
   if (month <= 9)
	 month = "0" + month;
	  
   var day = thistime.getDate();
   if (day <= 9)
	 day = "0" + day;
   
var sDate = thistime.getFullYear() + "" + month + "" + day;
 var hours=thistime.getHours();
 var minutes=thistime.getMinutes();
var seconds=thistime.getSeconds();
var ms =thistime.getMilliseconds();

 if (eval(hours) <10) {hours="0"+hours;}
 if (eval(minutes) < 10) {minutes="0"+minutes;}
 if (seconds < 10) {seconds="0"+seconds;}
 
 if (ms < 10) {
	ms="00"+ms;
 }else if(ms < 100){
	ms="0"+ms;
 }
 
 var thistimeFormat = hours+""+minutes+""+seconds+""+ms+"000";

 //var obj =document.getElementById('clockId');
 //obj.innerHTML =sDate + " " +thistimeFormat;
 return sDate +thistimeFormat;
}

function TableCheckBoxOpertion(tableId,isMulti,selectedClass){
	$("#"+tableId).find("tr").each(function(){ 
		   $(this).click(function(){ 					 
			   $(this).find("input").each(function(){	
				    if(this.checked){  
				    	this.checked = false; 
				    	 $(this).parents("tr").removeClass(selectedClass);
				    }else{
				    	this.checked = true;   
				    	 $(this).parents("tr").addClass(selectedClass);						    	 
				    }   
			   });	
			   
			   if(!isMulti){
				   $(this).siblings().find("input").each(function(){
					   this.checked = false;
					   $(this).parents("tr").removeClass(selectedClass);
			       }); 		  	
			   }
		   }); 
	});  
}

//Talbe List CheckBox 操作 by xuxing 2017年1月20日14:50:05
/********************************************************************************/
/*
 * 多项选择案例
 * <tr onclick="ListTableClick(this,event,'multrowclk','info');">
   <td><label> 
       <input  onclick="ListTableClick(this,event,'multrowclk','info');" name='checkList'	value='' type="checkbox">
       </label>
   </td>
   </tr>
*/

/*
 * 单项选择案例，注意<tr>与<input>标签的响应事件区别
 * <tr onclick="ListTableClick(this,event,'rowclk','info');">
   <td><label> 
       <input  onclick="ListTableClick(this,event,'chkbox','info');" name='checkList'	value='' type="checkbox">
       </label>
   </td>
   </tr>
*/

/*
 * 单项选择案例，注意<tr>与<input>标签的响应事件区别
 * 
<td>
	<label> 
	<input workNo="${it.workNo}" onclick="ListTableClick(this,event,'chkall','info');" name='checkList'type="checkbox">
    </label>
</td>
*/
/************************************ Talbe List CheckBox 操作 start ********************************************/
function ListTableClick(o,e, type, selectedClass){
    switch(type){
    	case 'chkbox':
    		SelectCheckBoxRow(o,false);
    		break;
        case 'rowclk':
        	if(e.srcElement){
                if(e.srcElement.tagName.toLowerCase() == 'input'){
                    return;
                }
            }else{
                if(e.target.tagName.toLowerCase() == 'input'){
                    return;
                }
            }
        	 SelectRow(o,false,selectedClass);
        	 break;
        case 'multrowclk':
        	if(e.srcElement){
                if(e.srcElement.tagName.toLowerCase() == 'input'){
                	SelectCheckBoxRow(o,true);
                    return;
                }
            }else{
                if(e.target.tagName.toLowerCase() == 'input'){
                	SelectCheckBoxRow(o,true);
                    return;
                }
            }
        	 SelectRow(o,true,selectedClass);
        	 break;
        case 'chkall':
            if(o.checked == true){
            	SelectAllRow(o,true,selectedClass);
            }else{
            	SelectAllRow(o,false,selectedClass);
            }
            break;
                
    }
    
    function SelectRow(o,isMulti,selectedClass){
    	 $(o).find("input[type='checkbox']").each(function(){	
    		 console.log(this);
			    if(this.checked){  
			    	this.checked = false; 
			    	 $(this).parents("tr").removeClass(selectedClass);
			    }else{
			    	this.checked = true;   
			    	 $(this).parents("tr").addClass(selectedClass);						    	 
			    }   
		   });	
		   
		   if(!isMulti){			 
			   $(o).siblings().find("input[type='checkbox']").each(function(){
				   this.checked = false;
				   $(this).parents("tr").removeClass(selectedClass);
		       }); 		  	
		   }
    }
    
    function SelectAllRow(o,isAllCheck,selectedClass){
   	 	$(o).find("input[type='checkbox']").each(function(){	
		    if(!isAllCheck){  
		    	this.checked = false; 
		    	 $(this).parents("tr").removeClass(selectedClass);
		    }else{
		    	this.checked = true;   
		    	 $(this).parents("tr").addClass(selectedClass);						    	 
		    }   
	   });
    }
    
    function SelectCheckBoxRow(o,isMulti){
    	 if(o.checked == true){                
			 $(o).parents("tr").addClass(selectedClass);	
			 if(!isMulti){
				 $(o).parents("tr").siblings().find("input[type='checkbox']").each(function(){
					   this.checked = false;
					   $(this).parents("tr").removeClass(selectedClass);
			       }); 		  	
			 }
         }else{            	 
        	 $(o).parents("tr").removeClass(selectedClass);
         }
    }
}
/**************************************** Talbe List CheckBox 操作 end **********************************************/

/**************************************** CheckBox 操作 by class start **********************************************/
/*
 *by class的CheckBox 的全选与全不选操作  
	<div>
	<label> 
	<input workNo="${it.workNo}" onclick="CheckBoxAll(this,'xxx','class');" name='checkList'type="checkbox">
	</label>
	</div>
*/
/*
 *by id的CheckBox 的全选与全不选操作  
	<div>
	<label> 
	<input workNo="${it.workNo}" onclick="CheckBoxAll(this,'xxx','id');" name='checkList'type="checkbox">
	</label>
	</div>
*/
/*
 *by 标签下的CheckBox 的全选与全不选操作  
	<div>
	<label> 
	<input workNo="${it.workNo}" onclick="CheckBoxAll(this,'xxx',);" name='checkList'type="checkbox">
	</label>
	</div>
*/
function CheckBoxAll(t,o,type){
	var type_o = '';
	switch(type){
	case 'class':
		type_o = '.'+o;
		break;
    case 'id':    	
    	type_o = '#'+o;
    	 break;
    default :    	
    	type_o = o;
    	 break;
	}
 	$(type_o).each(function(){
 		console.log(1);
 		if($(this).attr('type')=='checkbox'){
 			this.checked = t.checked;
 		}else{
 			$(this).find("input[type='checkbox']").each(function(){
 	 			this.checked = t.checked;  
 	 		});
 		} 		
 	});
}
/**************************************** CheckBox 操作 by class end **********************************************/

function setSaveScoAction(buttionId,formId,ctx){
	$('#'+buttionId).on('click', function() {
		var winSaveSco = layer.prompt({
			title : '输入保存标签',
			formType : 0
		}, function(text,index) {
			//text = text.toUpperCase();
			var data = $("#"+formId).serializeArray();
			var myurl = $("#"+formId).attr("action");
			myurl =  myurl.substring(myurl.indexOf("/")+1);
			myurl =  myurl.substring(myurl.indexOf("/"));
			var strJson = JSON.stringify(data);
			//alert(JSON.stringify(data));
			$.post(ctx +"/sco_save.shtml",{functionUrl:myurl,tag:text,mapParm:strJson},function(result){
		 		console.log(result);
				if("ok" == result){
				     $("#"+formId).submit();
				}else{
					alert(result);
				}
			  });

			
		});

	});
}

function setDelListAction(buttionId,delUrl,formId,delCheckboxName){
	
	$('#'+buttionId).on('click', function() {
 		console.log(delCheckboxName);
 		//单选择判断 by makeqiang 2017-9-18 16:12:41()
 		if(!checkedOnlyOne()){
 			return;
 		}
 		
		var cbList = getChecked(delCheckboxName);
 		var psStr = cbList.toString();
 		layer.confirm('是否确定删除选择的' + cbList.length+ '条数据？', {
 		  btn: ['是','否'] 
 		}, function(){
 			$.post(delUrl,{rawids:psStr},function(result){
 				if("ok" == result){
 				     $("#"+formId).submit();
 				}else{
 					alert(result);
 				}
 			  });
 			
 		}, function(){
 		});
	});
}

function setDelScoAction(buttionId,formId,ctx){
	$('#'+buttionId).on('click', function() {
		var myurl = $('#'+formId).attr("action");
		myurl =  myurl.substring(myurl.indexOf("/")+1);
		myurl =  myurl.substring(myurl.indexOf("/"));
		
		layer.open({
			type : 2,
			title : '删除',
			area : [ '80%', '80%' ],
			fix : false, //不固定
			maxmin : true,
			content : ctx +'/search_condition_del.shtml?functionUrl=' + myurl,
			end : function() {
				 $("#"+formId).submit();
			}
		});			
		
	});
}

function seCollapseAction(buttionId,formId){
	$('#'+buttionId).on('click', function() {
		var spanid = '#' +buttionId + ' > span';
		var showFlag = $(spanid).attr("flag");
		console.log(showFlag);
		if(showFlag == 'false'){
			$(spanid).removeClass('glyphicon-menu-right');
			$(spanid).addClass('glyphicon-menu-down');
			$(spanid).attr("flag",'true');
			$('#' +formId).show();
		}else{
			$(spanid).removeClass('glyphicon-menu-down');
			$(spanid).addClass('glyphicon-menu-right');
			$(spanid).attr("flag",'false');
			$('#' +formId).hide();
		}
	});
	
}

var oeetTimer = null;
function loadTimeCount(){
	var start = 0//从0开始计数
	var layerIndex = layer.load(0, {shade: 0.3,content:"<div style='padding-top: 1.5rem;padding-left: 1rem; color: blue;'><span id='queryTimeDiv'>"+start+"</span> sec</div>"});
	layerIndexIn(start);
	return layerIndex;
}

function layerIndexIn(start){
	oeetTimer = setTimeout(function(){
		start = start + 1;
		$('#queryTimeDiv').html(start);
		layerIndexIn(start);
	},1000)	
}
/**************************************** jquery bootstrap single dropdowm start **********************************************/
//xuxing by 2017/6/26 16:14:41
(function($) {
$.fn.singleDropDown = function(config){
    var options = $.extend(true,{
    		dropDown:{      			
                url : "", 
                params:{},
                value:"",
                desc:"",
                async:false,//是否异步加载
                selectedValue:"", //选中值
                addAllSelected : false,//是否添加默认选项,若不添加则默认选择下拉框第一个
                defaultValue :"", //默认值
                defaultText : "All", //默认Text
                multiple : true //是否多选 true:多选；false:单选
            }              
        },config);
    var $this = $(this); 
    $this.empty();//初始化
    $.ajaxSettings.async = options.dropDown.async;
    //alert( $.ajaxSettings.async);
    $.getJSON(
  		    options.dropDown.url, //url
  		    options.dropDown.params, //传参						
				function(result) {
					//回调函数						  	
					if (result.errorCode == 1) {
						alert(result.errorMsg);
					} else {
						
						if(options.dropDown.addAllSelected == true){
							$('<option value="All">All</option>').appendTo($this);
						}
						//
						$.each(result.msgList,function(index,content) {
							if($.isBlank( options.dropDown.selectedValue)){
								 options.dropDown.selectedValue ="";
							}
							var words = options.dropDown.selectedValue.toString().split(',')
							var selectedFalg = false;
							for(var i=0;i<words.length;i++){
					            if(words[i] == content[options.dropDown.value]){
					            	selectedFalg = true;
					            }
						    }
							if( selectedFalg){
								$("<option  selected='selected' value='"+content[ options.dropDown.value]+"'>" + content[ options.dropDown.desc] + "</option>").appendTo($this);							
							}else{
								$("<option value='"+content[ options.dropDown.value]+"'>" + content[ options.dropDown.desc] + "</option>").appendTo($this);							
							}
						});									
					}
					 $this.selectpicker('render');
					 $this.on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
						 	//if(options.dropDown.addAllSelected){
						 		
						 	//}
							var selected = $(e.currentTarget).val();
							console.log("selected:" + selected + "    "+selected.indexOf("All") + "  idx:" +  clickedIndex 
									+ "  newValue:" +  newValue + "  oldValue:" +  oldValue );
							if(!$.isBlank(selected)){
								var allSelectedFalg = false;
								var t1 = selected.toString().split(',')
								var t2=new Array()
								var j = 0;
								for(var i=0;i<t1.length;i++){
						            if(t1[i] == "All"){
						            	
						            }else{
						            	t2[j] = t1[i];
						            	j ++;
						            }
							    }
								
								//如果选了第一个而且有 All
								//去除所有，只留All
								if(clickedIndex == 0 && selected.indexOf("All") >=0){
									$this.selectpicker('val', 'All');
								}else{
									//如果选了非第一个而且有All
									//去除All，留其它
									if(clickedIndex > 0 && selected.indexOf("All") >=0){
										//$this.selectpicker('val', 'All');
										console.log("t2 value:" );
										console.log(t2);
										$this.selectpicker('val', t2)
									}
								}

							}
							if(!$.isBlank(selected) && options.dropDown.addAllSelected){
								//如果選擇第一個(All)
								if(clickedIndex == 0 && selected.indexOf("All") >=0){
									$this.selectpicker('val', 'All');
								}else{
									if(clickedIndex > 0 && selected.indexOf("All") >=0){
										//$this.selectpicker('val', 'All');
										var t1 = selected.toString().split(',')
									}
								}
								
							} 
							//
							//$(e.currentTarget).val("All")
							//alert("selected:" + selected);
 
						});					
					$this.selectpicker('refresh');				
				});
};
})(jQuery);
/**************************************** jquery bootstrap single dropdowm end **********************************************/

/**************************************** jquery bootstrap multiple dropdowm start **********************************************/
//lijinhui by 2017/09/07  下拉框  单选==>multiple:false;多选==>multiple:true(默认值) ,若multiple为true则selectedValue的值以','隔开，如:'Mustard','Relish')
//bug 目前多选级联时需要在元素上设置multiple属性，动态设置无效
(function($) {
$.fn.selectDropDown = function(config){
  var options = $.extend(true,{
  		dropDown:{      			
              url : "", 
              params:{},
              value:"",
              desc:"",
              async:false,//是否异步加载
              selectedValue:"", //选中值
              addAllSelected : true,//是否添加默认选项,若不添加则默认选择下拉框第一个
              defaultValue :"", //默认值
              defaultText : "All", //默认Text
              multiple : true //是否多选 true:多选；false:单选
          }              
      },config);
  var $this = $(this); 

  $this.empty();//初始化
  $.ajaxSettings.async = options.dropDown.async;
  $.getJSON(
		    options.dropDown.url, //url
		    options.dropDown.params, //传参						
			function(result) {
				//回调函数	
				if (result.errorCode == 1) {
					alert(result.errorMsg);
				} else {
					if(options.dropDown.addAllSelected){
						if(options.dropDown.defaultValue === options.dropDown.selectedValue){
							$("<option  selected='selected' value='"+options.dropDown.defaultValue+"'>" + options.dropDown.defaultText + "</option>").appendTo($this);
						}else{
							$('<option value="'+options.dropDown.defaultValue+'">'+options.dropDown.defaultText+'</option>').appendTo($this);
						}
					}
					if(options.dropDown.multiple){
						$this.attr("multiple","multiple");
						var selValues = null == options.dropDown.selectedValue ? [] : options.dropDown.selectedValue.split(",");
						$.each(result.msgList,function(index,content) {
							var mulNotSelFlag = true;
							$.each(selValues,function(index,selValue) {
								if( selValue == content[ options.dropDown.value]){
									$("<option  selected='selected' value='"+content[ options.dropDown.value]+"'>" + content[ options.dropDown.desc] + "</option>").appendTo($this);
									mulNotSelFlag = false;
									return true;
								}
							})
							if(mulNotSelFlag){
								$("<option value='"+content[ options.dropDown.value]+"'>" + content[ options.dropDown.desc] + "</option>").appendTo($this);
							}
						});	
					}else{
						var selflag = true;
						$.each(result.msgList,function(index,content) {
							if(selflag && options.dropDown.selectedValue !="" && options.dropDown.selectedValue == content[ options.dropDown.value]){
								selflag = false;
								$("<option  selected='selected' value='"+content[ options.dropDown.value]+"'>" + content[ options.dropDown.desc] + "</option>").appendTo($this);							
							}else if( selflag && options.dropDown.selectedValue =="" && !options.dropDown.addAllSelected && index == 0){
								selflag = false;
								$("<option  selected='selected' value='"+content[ options.dropDown.value]+"'>" + content[ options.dropDown.desc] + "</option>").appendTo($this);							
							}else{
								$("<option value='"+content[ options.dropDown.value]+"'>" + content[ options.dropDown.desc] + "</option>").appendTo($this);							
							}
						});	
					}
													
				}
				$this.selectpicker('render');
				$this.selectpicker('refresh');				
			});
};
})(jQuery);
/**************************************** jquery bootstrap multiple dropdowm end **********************************************/
(function($){
	  $.isBlank = function(obj){
	    return(!obj || $.trim(obj) === "");
	  };
	  	  $.isArray = function(obj){
		  if(typeof obj=="object"&& (obj instanceof  Array)){
			    return true;
			  }
			 return false;
		  };
	})(jQuery);

/**************************************** submit use time count start **********************************************/
//重写submit，添加查询用时功能
(function($){
	var _submit=$.fn.submit;  
	$.fn.extend({  
		submit:function(){  
	        //开启额外动作 
			//layer.load(0, {shade: [0.2,'#BABDCC'],content:"<div style='padding-top: 1.5rem;padding-left: 1rem; color: blue;'><span id='queryTimeDiv'>0</span>&nbsp;sec</div>"});
			//setInterval(function(){var queryTime = parseInt($('#queryTimeDiv').html());queryTime += 1;console.log(queryTime);$('#queryTimeDiv').html(queryTime);}, 1000);
			//return null;
			loadTimeCount();
			return _submit.apply(this);
	    }  
	});
	
	var _ajax=$.ajax;
	$.ajax = function(opt){
		if(opt.csotAjax){
			//扩展增强处理  
			var loadLayerIndex = null;
			var fn = {
					beforeSend : function(XHR){},
					complete : function(XHR, TS){},
					error : function(XHR, TS, ET){},
					success : function(DT,TS){}
			};
			if(opt.beforeSend){
				fn.beforeSend = opt.beforeSend;
			};
			if(opt.complete){
				
				fn.complete = opt.complete;	
			};
			if(opt.error){
				fn.error = opt.error;
			};
			if(opt.success){
				fn.success = opt.success;
			}
	        var _opt = $.extend(opt,{
	            beforeSend:function(XHR){ 
	                //提交前回调方法  
	            	loadLayerIndex = loadTimeCount();
	            	fn.beforeSend(XHR);
	            },  
	            complete:function(XHR, TS){
	            	fn.complete(XHR, TS);
	            },
	          	error:function(XHR, TS, ET){
	          		layer.close(loadLayerIndex);
	          		layer.msg('加载数据出错...', {icon: 5,time:0,shadeClose:true,shade :0.3});
	          		fn.error(XHR, TS, ET);
	          	},
	          	success:function(DT,TS){
	          		if(oeetTimer != null){
	            		clearTimeout(oeetTimer)
	            	}
	          		layer.close(loadLayerIndex);
	          		
	          		//为下载按钮赋上下载路径，目前仅针对a标签
	          		if(opt.bntLoadId!=null){
	          			var bntIdArr = opt.bntLoadId.split(",");
	          			for(var i in bntIdArr){
	          				$("#"+bntIdArr[i]).attr("href","http://"+DT.loadExcelPath);
	          			}
	          		}
	          		if(DT.msgList !=null){
	          			if(DT.msgList.length>1000 && opt.limitDataNum){
		            		$(".dataTables_empty").removeClass("dataTables_empty").html("<a class=\"btn-link\" href=\"http://"+DT.loadExcelPath+"\"><i class=\"cus-page-excel icon-white\"></i><strong>查看执行结果Excel文件<strong></a>")
		            		return;
		            	}
	          		}
	          		
	          		
	          		setTimeout(function(){
	          			fn.success(DT,TS);
	          		},500)
	          	}
	        });
	        return _ajax(_opt);
		}else{
			return _ajax(opt);
		}
	}
	
	var _csotAjax = $.ajax;
	$.extend({
		csotAjax:function(opt){
			opt.csotAjax = true;
			return _csotAjax(opt);
		}
	})
})(jQuery);
/**************************************** submit use time count end **********************************************/

/**************************************** init to upper case method start**********************************************/
$(function(){
	//获取对应的对象
	$(".touppercase").each(function(){
		$(this).on("keyup",function(){
			var str = $(this).val();
			$(this).val(str.toUpperCase());
		})
	})
})
/****************************************init to upper case method end**********************************************/

/**************************************** no use submit save tag scoSearch by ajax request data*************************/

function saveScoAction(buttionId,formId,ctx,ulId){
	$('#'+buttionId).on('click', function() {
		var winSaveSco = layer.prompt({
			title : '输入保存标签',
			formType : 0
		}, function(text,index) {
			//text = text.toUpperCase();
			var data = $("#"+formId).serializeArray();
			var myurl = $("#"+formId).attr("action");
			myurl =  myurl.substring(myurl.indexOf("/")+1);
			myurl =  myurl.substring(myurl.indexOf("/"));
			var strJson = JSON.stringify(data);
			//alert(JSON.stringify(data));
			console.log(text)
			$.post(ctx +"/sco_save.shtml",{functionUrl:myurl,tag:text,mapParm:strJson},function(result){
		 		console.log(result);
				if("ok" == result){
					layer.msg('保存成功.', {icon: 5,time:2000});
					createTagUl(ctx,myurl,ulId);
				}else{
					alert(result);
				}
			  });
		});

	});
}

function delScoAction(buttionId,formId,ctx,ulId){
	$('#'+buttionId).on('click', function() {
		var myurl = $('#'+formId).attr("action");
		myurl =  myurl.substring(myurl.indexOf("/")+1);
		myurl =  myurl.substring(myurl.indexOf("/"));
		
		layer.open({
			type : 2,
			title : '删除',
			area : [ '80%', '80%' ],
			fix : false, //不固定
			maxmin : true,
			content : ctx +'/search_condition_del.shtml?functionUrl=' + myurl,
			end : function() {
				//layer.msg('删除成功.', {icon: 5,time:2000});
				createTagUl(ctx,myurl,ulId);
			}
		});			
		
	});
}

function createTagUl(ctx,url,ulId){
	 $.ajax({
         url:ctx+"/pub/api/searchConditionService/findBySiteAndUserIdAndFunctionUrlOrderByTagAsc",
         type:"post",
         async: false,
         data: {p1:url},
         success:function(msg){
        	 var data = msg.msgList;
        	 if(data.length>0){
        		 $("#"+ulId).empty();
            	 //<li><a href="javascript:void(0)" onclick="search('${it.rawid}')">${it.tag}</a></li>
        		 var html = '';
        		 for(var i in data){
        			 html += '<li><a href="javascript:void(0)" onclick="oeeMainSearch('+data[i].rawid+')">'+data[i].tag+'</a></li>'
        		 }
        		 $("#"+ulId).html(html);
        	 }
         }
	 })
}

/**************************************** no submit save tag scoSearch by ajax request data by makeqiang*************************/
/**************************************** jquery bootstrap table by ajax start **********************************************/
(function($) {
// $.fn.dataTable.ext.errMode = 'throw';
$.fn.oeeTable = function(config){
  var options = $.extend(true,{
  		table:{      			
              url : "", 
              type: "Get",
              params:{},
              title:"",
              columns:"",
              height:400,
              search:false,
              returnDataItem:"",
              tableFunction: $.noop,
              fixedColumnNum:0,
              csotAjax:false,
              async:true,
              bntLoadId:"",//引入需要指定下路径的button 中的a标签，指向路径href
              hrefFunction:[{}]
          }              
      },config);
  var $this = $(this); 
  
  //----------------------------------------------------------//
  //------------------------初始化url-------------------------//
  //---------------------------------------------------------//
  var url = "";
  var tonkeyTime = $.now();
  if(options.table.url.indexOf('?')>-1){
  	url = options.table.url+'&tonkeyTime='+tonkeyTime;
  }else{
  	url = options.table.url+'?tonkeyTime='+tonkeyTime;
  }
  console.log(options.table.params);
  if(options.table.params != null ){
  	$.each(options.table.params, function(pName, pVal) {
  		url = url + "&" + pName + "=" + pVal; 
  	});  
  }
  
  console.log(url);
 
  //----------------------------------------------------------//
  //------------------------初始化columns---------------------//
  //---------------------------------------------------------//
  var arrData=new Array();    
  var i=0; //数组边界初始值
  var title=(options.table.title).split(',');
  var columnNmaes=(options.table.columns).split(',');
  console.log("title length:"+title.length);
  console.log("columnNmaes length:"+columnNmaes.length);
  //取他们中最小边界峰值
  i= title.length>columnNmaes.length?columnNmaes.length : title.length;
  //columns 绑定
  for(var n=0;n<i;n++){
  	var data=new Object();
  	data.title=title[n];
  	data.mDataProp=columnNmaes[n];
  	arrData.push(data);
  }
  
  //----------------------------------------------------------//
  //------------------------初始化table-----------------------//
  //---------------------------------------------------------//    
  if ($.fn.DataTable.isDataTable(this)) {
  	 $this.DataTable().destroy();
  }   
  $this.empty();//初始化
  
  oeeInitTable = $this.DataTable( {
  	     "bDestroy":true,
		 "ordering": true,
		 "paging": false,
		 "info": false,
	 	 "searching": options.table.search,						
		 "scrollX": true,
		 "sScrollY":options.table.height,
		 "bProcessing": true,		
		 "deferLoading": 100,
		 "bAutoWidth":true,//添加自适应列宽度 by makeqiang 2017-8-1 13:51:46
		 "ajax": {
	            "url": options.table.url,
	            "type": options.table.type,
	            "data": options.table.params,
	            "csotAjax":options.table.csotAjax,
	            "async": options.table.async,
	            "limitDataNum":true,
	            "bntLoadId":options.table.bntLoadId
	        },
         "sAjaxDataProp":options.table.returnDataItem,
	     "columns": arrData,
	     "fnInitComplete": function(oSettings, json) {
	    	 	if(options.table.tableFunction) {
					options.table.tableFunction(json);
				}
	     },
	     "aoColumnDefs":options.table.hrefFunction,
	     fixedColumns: { //固定列的配置项
             leftColumns: options.table.fixedColumnNum //固定左边列
             //rightColumns:0  //固定右边第一列
         }
	     
	    } );
  
  $this.parent().parent().find("thead tr th").each(function(colIdx) {    	
      $(this).addClass("oeeTable_header_default");
  });
};
})(jQuery);
/**************************************** jquery bootstrap table by ajax end **********************************************/

/**************************************** jquery Date  Format start**********************************************/
//对Date的扩展，将 Date 转化为指定格式的String  
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份   
        "d+": this.getDate(), //日   
        "H+": this.getHours(), //小时   
        "m+": this.getMinutes(), //分   
        "s+": this.getSeconds(), //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds() //毫秒   
    };  
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));  
    for (var k in o)  
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));  
    return fmt;  
} 
/**************************************** jquery Date  Format end**********************************************/
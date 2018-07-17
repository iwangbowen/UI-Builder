/**
 * Created by csot.ifm4 on 2018/3/21.
 *//*
以下是oee新页面的js代码，包括页面初始化的js，site选择，左侧显示隐藏，拖拽，放大功能的点击事件*/
var unselectclick = true;
/*choosearr = [];*/
var choosearr = [];
window.onload=function(){
    $(".containerleft").css("width", "275px");
    $(".containerMiddle").css("left", "275px");
    $(".containerRight").css("left", "calc(275px + 12px)");
    $(".containerRight").css("width", "calc(100% - 275px -2px - 12px)");
    //给弹出页面的关闭按钮设置点击事件
    $(".fullpagearea").find(".openPage").find(".openPage-top").find(".closespan").click(function () {
        $(".fullpagearea").find(".openPage").hide();
        $(".fullpagearea").find(".openPage").css("z-index", 0);
        $(".leftBefore").show();
    })

    /*  用来对搜索选项进行显示和隐藏*/
    var  leftBeforeclick=false;
    $(".leftBefore").click(function () {
        if(leftBeforeclick==false){
            //init
            /*console.log("leftBeforeclick = false")*/
            $(".leftBefore").find(".show-icon").show();
            $(".leftBefore").find(".hide-icon").hide();
            $(".containerleft").hide();
            $(".containerMiddle").css("left", "0px");
            $(".containerRight").css("left", " 12px");
            $(".containerRight").css("width", "calc(100% - 2px - 12px)");
            leftBeforeclick=true;
        }else if(leftBeforeclick==true){

            /*console.log("leftBeforeclick = true")*/

            leftBeforeclick=false;
            $(".leftBefore").find(".show-icon").hide();
            $(".leftBefore").find(".hide-icon").show();
            $(".containerleft").show();

            if(unselectclick==true){
                /*console.log("leftBeforeclick = true","unselectclick=true")*/
                /*仅仅是为了新开页面直接leftbofore操作*/
                $(".containerleft").css("width", "275px");
                $(".containerMiddle").css("left", "275px");
                $(".containerRight").css("left", "calc(275px  + 12px)");
                $(".containerRight").css("width", "calc(100% - 275px - 2px - 12px)");
            }else if(unselectclick==false){

                /*console.log("leftBeforeclick = true","unselectclick=false")*/

                if(choosearr.length==1){
                    /* console.log("leftBeforeclick = true","unselectclick=false","choosearr=1")*/

                    $(".containerleft").css("width", "275px");
                    $(".containerMiddle").css("left", "calc(275px + 2px)");
                    $(".containerRight").css("left", "calc(275px + 12px)");
                    $(".containerRight").css("width", "calc(100% - 275px - 2px - 12px)");
                }else if(choosearr.length>=2){
                    /*console.log("leftBeforeclick = true","unselectclick=false","choosearr=2")*/

                    $(".containerleft").css("width", "550px");
                    $(".containerMiddle").css("left", "calc(550px + 2px)");
                    $(".containerRight").css("left", "calc(550px + 12px)");
                    $(".containerRight").css("width", "calc(100% - 550px - 2px - 12px)");
                }
            }
        }
    })
    /* 封装左右拖拽插件*/
    function hskmakeboxmove(big, sonone, sontwo, sonthree) {
        function $(id) {
            return document.getElementById(id);
        }
        /*    下面,仅仅需要传入id名称*/
        var big = $(big);
        var left = $(sonone);
        var middle = $(sontwo);
        var right = $(sonthree);
        var bigwidth = big.offsetWidth;
        var middleWidth = middle.offsetWidth;
        middle.onmousedown = function (e) {
            /* clientX 事件属性返回当事件被触发时鼠标指针向对于浏览器页面（或客户区）的水平坐标。*/
            var disX = (e || event).clientX;
            /*    （1）.如果父辈元素中有定位的元素，那么就返回距离当前元素最近的定位元素边缘的距离。
             （2）.如果父辈元素中没有定位元素，那么就返回相对于body左边缘距离。*/
            middle.left = middle.offsetLeft;
            document.onmousemove = function (e) {
                var iT = middle.left + ((e || event).clientX - disX);
                var e = e || window.event, tarnameb = e.target || e.srcElement;
                maxT = bigwidth - middleWidth;
                iT < 0 && (iT = 0);
                iT > maxT && (iT = maxT);
                middle.style.left = left.style.width = iT + "px";
                /*console.log(bigwidth);*/
                right.style.width = bigwidth - middle.offsetLeft - middleWidth + "px";
                right.style.left = iT + middleWidth + "px";
                return false;
            };
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
                middle.releaseCapture && middle.releaseCapture()
            };
            middle.setCapture && middle.setCapture();
            return false
        };
    }
    //左右拖拽插件调用
    if($("#cmiddle").length>0){
        hskmakeboxmove("carea", "cleft", "cmiddle", "cright");
    }else {
        return;
    }
}


/*  site切换样式*/
function changeSiteStyle(choose,$this,selectclick) {
    unselectclick = selectclick;
    choosearr = choose;
    if(choosearr==null){
        layer.msg("you must choose at least one site",{icon:5});
        $this.val(arrOld);
        $this.selectpicker( 'refresh');
        return;
    }else if(choosearr.length>2){
        $this.val(arrOld);
        layer.msg("can not choose more than two site",{icon:5});
        $this.selectpicker( 'refresh');
        return false;
    }else{
        arrOld = choosearr;
    }
    $this.selectpicker( 'refresh');
    if(choosearr.length==1){
        /*console.log("choosearr",1)*/
        $(".containerleft").css("width", "275px");
        /*$(".containerleft").css("width", "275px");*/
        $(".siteOutbox").css("width", "275px");
        $(".containerMiddle").css("left", "275px");
        $(".containerRight").css("left", "calc(275px + 12px )");
        $(".containerRight").css("width", "calc(100% - 275px - 2px - 12px)");
        //上面控制页面显示和隐藏，下面改变样式
        var stringOne=choosearr[0];
        $('.'+stringOne).show(500);
        $('.'+stringOne).siblings(".everySite").hide();
    }else if(choosearr.length==2){
        /*	console.log("choosearr",2)*/
        $(".containerleft").css("width", "calc(550px + 2px )");
        /*  $(".containerleft").css("width", "calc(550px + 2px )");*/
        $(".siteOutbox").css("width", "calc(550px + 2px )");
        $(".containerMiddle").css("left", "calc(550px + 2px )");
        $(".containerRight").css("left", "calc(550px + 12px)");
        $(".containerRight").css("width", "calc(100% - 550px - 2px - 12px)");
        //上面控制页面显示和隐藏，下面改变样式
        var stringOne=choosearr[0];
        var stringTwo=choosearr[1];
        $('.'+stringOne).show();
        $('.'+stringTwo).show();
        $('.'+stringTwo).css("border-left","1px solid #8c8c8c");
    }
}

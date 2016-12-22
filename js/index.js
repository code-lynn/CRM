/**
 * Created by Lynn on 2016/10/27 0027.
 */
//1、向服务器发送ajax请求，获取全部客户信息，并绑定到页面当中(字符串拼接)
var customerRender=(function () {//单例模式？？
    var customList=document.getElementById('customList');
    function bindHTML(data){
        var str='';
        for(var i=0;i<data.length;i++){
            /*
             str+='<li>\
             <span class="w50">1</span>\
             <span class="w150">珠峰培训</span>\
             <span class="w50">28</span>\
             <span class="w200">13041086186</span>\
             <span class="w200">北京市昌平区回龙观东大街</span>\
             <span class="w150 control">\
             <a href="">修改</a>\
             <a href="">删除</a>\
             </span>\
             </li>'
             */
            var cur=data[i];
            str+='<li>';
            str+='<span class="w50">'+cur.id+'</span>';
            str+='<span class="w150">'+cur.name+'</span>';
            str+='<span class="w50">'+cur.age+'</span>';
            str+='<span class="w200">'+cur.phone+'</span>';
            str+='<span class="w200">'+cur.address+'</span>';
            str+='<span class="w150 control">';
            str+='<span class="w150 control">';
            str+='<a href="detail.html?id='+cur.id+'">修改</a>';//不仅调到页面，把当前用户的ID传过去(?id=xxx),
            str+='<a href="javascript:;">删除</a>';
            str+='</span>';
            str+='</li>';
        }
        customList.innerHTML=str;
    }

    function bindEvent() {
        customList.onclick= function (e) {
            e=e||window.event;
            var tar= e.target|| e.srcElement;
            //var tarTag=;
        }
    }
    return {
        init: function () {
            ajax({
                url:'/getAllList',
                type: 'get',
                dataType: 'json',
                cache: false,
                success: function (result) {
                    if(result && result.code===0){
                        var data=result.data;
                        bindHTML(data);//绑定数据
                    }
                }
            })
        }
    }
})();
customerRender.init();

/*
ajax({
    url: '/getAllList',//怎么一步步得到的
    type: 'get',
    dataType: 'json',
    cache: false,
    success: function (result) {//result是什么
        //console.log(result);
        if(result && result.code===0){
            var data=result.data;
            var str='';
            for(var i=0;i<data.length;i++){
                /!*
                str+='<li>\
                    <span class="w50">1</span>\
                    <span class="w150">珠峰培训</span>\
                    <span class="w50">28</span>\
                    <span class="w200">13041086186</span>\
                    <span class="w200">北京市昌平区回龙观东大街</span>\
                    <span class="w150 control">\
                    <a href="">修改</a>\
                    <a href="">删除</a>\
                    </span>\
                    </li>'
                    *!/
                var cur=data[i];
                str+='<li>';
                str+='<span class="w50">'+cur.id+'</span>';
                str+='<span class="w150">'+cur.name+'</span>';
                str+='<span class="w50">'+cur.age+'</span>';
                str+='<span class="w200">'+cur.phone+'</span>';
                str+='<span class="w200">'+cur.address+'</span>';
                str+='<span class="w150 control">';
                str+='<span class="w150 control">';
                str+='<a href="">修改</a>';
                str+='<a href="">删除</a>';
                str+='</span>';
                str+='</li>';
            }
            document.getElementById('customList').innerHTML=str;
        }
    }
});*/

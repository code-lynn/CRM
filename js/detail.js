/**
 * Created by Lynn on 2016/10/27 0027.
 */
~function (pro) {
    //->获取URL地址中问号传递过来的参数值,以对象键值对的方式存储
    function queryURLParameter() {
        var reg = /([^?&=#]+)=([^?&=#]+)/g,
            obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];//=>obj['id']=12
        });
        return obj;
    }
    pro.queryURLParameter = queryURLParameter;

}(String.prototype);


var detailRender = (function () {
    var userName = document.getElementById('userName'),
        userAge = document.getElementById('userAge'),
        userPhone = document.getElementById('userPhone'),
        userAddress = document.getElementById('userAddress'),
        submit = document.getElementById('submit');
    var customId=null,
        isFlag=null;

   /* function bindEvent() {
        //获取四个文本框的内容，并且把内容转化为json格式的字符串
        var valueObj={
            name : userName.value,
            age : userAge.value,
            Phone : userPhone.value,
            Address : userAddress.value
        };
        var data=JSON.stringify(valueObj);//把一个对象转化为json格式的字符串，--IE6~7不兼容-？？？？处理兼容
        console.log(typeof data);
        //发送ajax请求发送给服务器，接收服务器返回的结果，成功的话跳转到页面
        ajax({
            url:'/addInfo',
            type:'post',
            dataType:'json',
            cache:false,
            success: function (result) {
                console.log(result)
                if(result && result.code===0){
                    //var data=result.data;
                    window.location.href='index.html';//????????
                }
            }
        })
    }*/
    function bindEvent() {
        var obj = {
            name: userName.value,
            age: userAge.value,
            phone: userPhone.value,
            address: userAddress.value
        };
        if(isFlag){
            //修改--在obj的基础上增加一个id
            ajax({
                url: '/updateInfo？='+customId,
                type: 'post',
                dataType: 'json',
                data: JSON.stringify(obj),
                success: function (result) {
                    if (result && result.code == 0) {
                        console.log(result);
                        window.location.href = 'index.html';
                    }
                }
            });
            //按照API文档吧内容发给服务器，修改成功在跳转回到页面
            return;
        }
        //增加
        ajax({
            url: '/addInfo',
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(obj),
            success: function (result) {
                if (result && result.code == 0) {
                    window.location.href = 'index.html';
                }
            }
        });
    }


    return {
        init: function () {
            //获取url地址栏传递国来的参数ID的值//http://localhost:84/detail.html?id=4
            var urlObj=window.location.href.queryURLParameter();
            customId=urlObj['id'];
            if(typeof customId !=='undefined'){
                //把customId对应的客户信息获取到然后放到文本框中
                isFlag=true;
                ajax({
                    url: '/getInfo?id='+customId,
                    type: 'get',
                    dataType: 'json',
                    success: function (result) {
                        if (result && result.code == 0) {
                            var data=result.data;
                            //console.log(data);
                            userName.value= data.name;
                            userAge.value=data.age;
                            userPhone.value=data.phone;
                            userAddress.value=data.address;
                        }
                    }
                })
            }
            submit.onclick = bindEvent;
        }
    }
})();
detailRender.init();
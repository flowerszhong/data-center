var baseUrl = (window.location.hostname=="flowerszhong.shop.co") ? '/demo-project/' : '/';
requirejs.config({
    baseUrl: baseUrl,
    paths: {
        lib: baseUrl + 'lib',
        dataCenter :  baseUrl + 'data-center'
    }
});

define(['jquery',"dataCenter/data-center"],function($,dataCenter){
    var alertData = function  (data) {
      console.log(data);
      data.data? alert(data.data) : alert(data);
    }
    dataCenter.get('testGet',{},{},alertData,alertData);
    dataCenter.get('testGet',{},{},alertData,alertData);

    dataCenter.get('testPost',{},{},alertData,alertData);
    dataCenter.get('testPost',{},{},alertData,alertData);

    dataCenter.get('test404',{},{},alertData,alertData);

    dataCenter.get('testDelete',{},{},alertData,alertData,{type:"delete"});


    $.getJSON("/data-center/data1.json",function (data) {
      console.log(data);
    })
});
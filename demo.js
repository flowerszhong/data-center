var baseUrl = (window.location.hostname == "flowerszhong.shop.co") ? '/demo-project/' : '/';
requirejs.config({
    baseUrl: baseUrl,
    paths: {
        lib: baseUrl + 'lib',
        dataCenter: baseUrl + 'data-center'
    }
});

define(['jquery', "dataCenter/data-center"], function($, dataCenter) {
    // var alertData = function(data) {
    //     console.log(data);
    //     data.data ? alert(data.data) : alert(data);
    // }
    // dataCenter.get('testGet', alertData, alertData);
    // dataCenter.get('testGet', alertData, alertData);

    // dataCenter.post('testPost', alertData, alertData);
    // dataCenter.post('testPost', alertData, alertData);

    // dataCenter.get('test404', alertData, alertData);

    // dataCenter.get({
    //     url: 'testDelete',
    //     type : 'delete',
    // }, alertData, alertData);


    // $.getJSON("/data-center/data1.json", function(data) {
    //     console.log(data);
    // });

    function done() {
        console.log("done");
    }

    function fail() {
        console.log("fail");
    }


    var $sendBtn = $("#send").on("click", function() {
        var param = {};
        param.url = $("#urls").val();
        param.data = {};

        $.each($('.data'),function (k,v) {
            if(v.value){
                var k = k+1;
                 param.data["data"+k] = v.value;
            }
        });

        param.RESTfulKeys = [];
        if (key1) {
            param.RESTfulKeys.push(key1);
        }
        if (key2) {
            param.RESTfulKeys.push(key2);
        }
        if (key3) {
            param.RESTfulKeys.push(key3);
        }
        if (key4) {
            param.RESTfulKeys.push(key4);
        }
        if (key5) {
            param.RESTfulKeys.push(key5);
        }
        
        type = $("#method").val();

        dataCenter[type](param, done, fail);
    });


});
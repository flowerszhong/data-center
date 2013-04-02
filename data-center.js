define(["jquery", "dataCenter/urls"], function($, urls) {
	var DataCenter = function(urls) {
		this._XHRs = {};
		this.urls = urls;
	};

	DataCenter.prototype = {
		get: function(requestName, urlParam, callbackParam, callback, errorCallback,ajaxConfig) {
			return this.load(requestName, urlParam, ajaxConfig, callbackParam, callback, errorCallback);
		},
		post: function(requestName, urlParam, callbackParam, callback, errorCallback,ajaxConfig) {
			if(ajaxConfig){
				ajaxConfig['type'] = "post";
			}else{
				ajaxConfig = {'type':"post"}
			}
			return this.load(requestName, urlParam, ajaxConfig, callbackParam, callback, errorCallback);
		},
		load: function(requestName, urlParam, ajaxConfig, callbackParam, callback, errorCallback) {
			var self = this;
			var requestItem = this.getUrlParam(requestName, urlParam);
			if (this._XHRs[requestName] && this._XHRs[requestName].readystate != 4 && requestItem.autoAbort !== false) {
				this._XHRs[requestName].abort();
				delete this._XHRs[requestName];
			}

			var dataUrl = requestItem.url;
			var _ajaxConfig = { //default config
				url: dataUrl,
				type: "get",
				dataType: "json",
				timeout: 10*1000,
				error: function(jqXHR, textStatus, error) {
					delete self._XHRs[requestName];
					if (jqXHR.status === 404) {
						console.log(error);
					} else if (jqXHR.status == 500) {
						console.log('Internal Server Error [500].');
					} else if (textStatus === 'parsererror') {
						console.log('Requested JSON parse failed.');
					} else if (error === 'timeout') {
						console.log(error);
					} else if (error === 'abort') {
						console.log('Ajax request aborted.');
					} else {
						console.log('Uncaught Error.\n' + jqXHR.responseText);
					}
					if (errorCallback) {
						errorCallback(error);
					}

				}
			};
			if (urlParam) {
				_ajaxConfig.data = urlParam;
			}
			if (ajaxConfig) {
				$.extend(true, _ajaxConfig, ajaxConfig);
			}
			var xhr = this._XHRs[requestName] = $.ajax(_ajaxConfig).done(function(data) {
				delete self._XHRs[requestName];
				if (data != null) {
					if (data.State == false) {
						//code goes here
					} else {
						callback(data, callbackParam);
					}
				}
			}

			);

			return xhr;
		},

		getUrlParam: function(requestName, urlParam) {
			var requestItem = this.urls[requestName];
			if (window.location.hostname == "flowerszhong.shop.co") {
				if(requestItem.url.indexOf('/demo-project') == '-1'){
					requestItem.url = "/demo-project" + requestItem.url;
				}
			}
			if (urlParam) {
				$.extend(true, requestItem.param, urlParam);

			}
			return requestItem;
		}

	};

	return new DataCenter(urls);
});
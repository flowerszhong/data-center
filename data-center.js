define(["jquery", "dataCenter/urls"], function($, urls) {
	var DataCenter = function(urls) {
		this._XHRs = {};
		this.urls = urls;
	};

	DataCenter.prototype = {
		/**
		 * [ get|post ]
		 * @param  {string|object}  url   [ajax config]
		 * @param  {Function} 		done  [success callback]
		 * @param  {Function}       fail  [fail callback]
		 * @return {object}        		  [xhr]	
		 */
		get: function(url, done, fail) {
			var param = this.buildParam(url);
			return this.load(param, done, fail);
		},
		post: function(url, done, fail) {
			var type = "post",
				param = this.buildParam(url,type);
			return this.load(param, done, fail);
		},

		/**
		 * [ load ]
		 * @param  {object}     param [ajax config]
		 * @param  {Function}   done  [success callback]
		 * @param  {function}   fail  [fail callback]
		 * @return {object}           [xhr]
		 */
		load: function(param, done, fail) {
			var self = this;
			var requestName = param.requestName;
			if (this._XHRs[requestName] && this._XHRs[requestName].readystate != 4 && requestItem.autoAbort !== false) {
				this._XHRs[requestName].abort();
				delete this._XHRs[requestName];
			}

			var xhr = this._XHRs[requestName] = $.ajax(param).done(function(data) {
				delete self._XHRs[requestName];
				if (data != null) {
					if (data.State == false) {
						//code goes here
					} else {
						done(data, param.callbackParam);
					}
				}
			}).fail(function(jqXHR, textStatus, error) {
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
				if (fail) {
					fail(error);
				}

			})

			return xhr;
		},

		buildParam : function (url,type) {
			var defaultConfig = { 
				type: type || "get",
				dataType: "json",
				timeout: 10*1000,
				data: null
			};

			var _param = this._getUrlParam(url),
				param = $.extend({},defaultConfig,_param);

			return param;

		},
		_getUrlParam : function (_url) {
			var param;
			if(typeof _url == "string"){
				param = this.urls[_url];
				this._confirm(param);
				param.requestName = _url;
			}else{
				if(_url.url){
					param = this.urls[_url.url];
					this._confirm(param);
					param.requestName = _url.url;
					if(_url.data){
						param.data = $.extend({},param.data,_url.data);
					}
					if(_url.RESTfulKeys && _url.RESTfulKeys.length){
						param.url = param.url + _url.RESTfulKeys.join('/') + "/";
					}
				}
			}
			return param;
		},
		_confirm : function (param) {
			if(typeof param == "undefined"){
				throw new Error("no url match !!!");
			}
		}

	};

	return new DataCenter(urls);
});
define({
	"testGet": {
		url: "/data-center/data1.json",
		autoAbort: false,
		data: {} //default param
	},
	"testPost": {
		url: "/data-center/data2.json",
		data: {}
	},
	"test404": {
		url: "/data-center/404.json",
		data: {}
	},
	"testDelete": {
		url: "/data-center/delete.json",
		data: {}
	},
	"url1": {
		url: "/data-center/test-url-1/",
		data: {
			data1: "data1"
		}
	},
	"url2": {
		url: "/data-center/test-url-2/",
		data: {
			data1: "data1"
		}
	},
	"url3": {
		url: "/data-center/test-url-3/",
		data: {
			data1: "data1"
		}
	},
	"url4": {
		url: "/data-center/test-url-4/",
		data: {
			data1: "data1"
		}
	},
	"url5": {
		url: "/data-center/test-url-5/",
		data: {
			data1: "data1"
		}
	}
});
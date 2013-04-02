define({
	testGet: {
		url: "/data-center/data1.json",
		autoAbort: false,
		param: {}//default param
	},
	testPost: {
		url: "/data-center/data2.json",
		param: {}
	},
	test404: {
		url: "/data-center/404.json",
		param: {}
	},
	testDelete: {
		url: "/data-center/delete.json",
		param: {}
	}
})
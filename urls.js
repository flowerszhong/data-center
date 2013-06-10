define({
	testGet: {
		url: "/data-center/data1.json",
		autoAbort: false,
		data: {}//default param
	},
	testPost: {
		url: "/data-center/data2.json",
		data: {}
	},
	test404: {
		url: "/data-center/404.json",
		data: {}
	},
	testDelete: {
		url: "/data-center/delete.json",
		data: {}
	}
})
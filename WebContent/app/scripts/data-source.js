'use strict'

if (!securedb.dataSource) {
	securedb.dataSource = {};
}

securedb.dataSource.hitServer = function(requestPayload) {

	if (typeof requestPayload == 'undefined') {
		securedb.config.logger.error(securedb.config.toasts.errorGettingData);
		return;
	}

	if (!securedb.config.useMock || requestPayload.overRideUseMockUpProperty) {

		var baseUrl=securedb.config.restUrls.dev;
		var endPoint=requestPayload.endPoint;
		var data=typeof requestPayload.data != 'undefined'?requestPayload.data:{};
		
		$.ajax({
			url : baseUrl+endPoint					
		}).done(function(data) {
			securedb.dataSource.ajaxSuccessProcessor(requestPayload,data)
		})
	} else {
		// get mockup data ..
		var mockupData = securedb.mockData[requestPayload.endPoint];
		securedb.dataSource.ajaxSuccessProcessor(requestPayload, mockupData);

	}

}

securedb.dataSource.postDataToServer=function(payload)
{
	var baseUrl=securedb.config.restUrls.dev;
	var endPoint=payload.endPoint;
	var data=typeof payload.data != 'undefined'?payload.data:{};
	
	$.ajax({
		url : baseUrl+endPoint,
		type : 'post',
		data : data,
		contentType: "application/json"	,	
		dataType: 'json',
	}).done(function(data) {	
		securedb.dataSource.ajaxSuccessProcessor(payload,data)
	})
}

// will handle ajax succcess calls...
securedb.dataSource.ajaxSuccessProcessor = function(requestPayload, data) {
	if (typeof requestPayload.callbackParameter == 'undefined')
		requestPayload.callback(data);
	else
		requestPayload.callback(requestPayload.callbackParameter, data);
}

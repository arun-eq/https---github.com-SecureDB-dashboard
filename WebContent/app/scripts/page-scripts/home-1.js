'use strict'

var restEndPoints = securedb.config.restEndPoints;

if (!securedb.home) {
	securedb.home = {};
}

securedb.home = {

	loaderSymElement:'#homepg-loader-sym',
	lastChartToDraw:'Devices',
	
		
	createAuthFailureChart : function() {

		var serverParameter = this.constructChartCreationParameterObject({
			endPoint : 'auditFailure',			
			callbackParameter : {
				element : '#auth-failure-detail-chart',
				chartName : 'Authentication Failure Type',
				chartCreatorFunction:'drawPieChart'
			}
		})

		securedb.dataSource.hitServer(serverParameter);

	},
	createSuccessAuthChart : function() {

		var serverParameter = this.constructChartCreationParameterObject({
			endPoint : 'auditSuccess',		
			callbackParameter : {
				element : '#auth-success-detail-chart',
				chartName : 'Authentication Success Type',
				chartCreatorFunction:'drawPieChart'
			}
		})

		securedb.dataSource.hitServer(serverParameter);
	},
	createAuthStepUpSuccessFailureChart : function() {

		var serverParameter = this.constructChartCreationParameterObject({
			endPoint : 'stepAuthSuccessFailure',			
			callbackParameter : {
				element : '#success-vs-failure-count-chart',
				chartName : 'Success-vs-Failure Count',
				chartCreatorFunction:'drawPieChart'
			}
		})

		securedb.dataSource.hitServer(serverParameter);

	},
	activitesChart : function() {

		var serverParameter = this.constructChartCreationParameterObject({
			endPoint : 'Activites',		
			callbackParameter : {
				element : '#activity-detail-chart',
				chartName : 'Activites',
				chartCreatorFunction:'drawPieChart'
			}

		});

		securedb.dataSource.hitServer(serverParameter);

	},
	devicesCountChart : function() {

		var serverParameter = this.constructChartCreationParameterObject({
			endPoint : 'Devices',		
			callbackParameter : {
				element : '#device-count-chart',
				chartName : 'Devices',
				xAxisType : 'Devices',
				yAxisTitle : 'Device(counts)',
				chartCreatorFunction : 'drawBarChart'
			}
		})

		securedb.dataSource.hitServer(serverParameter);
	},
	createHomePageCharts : function() {
		this.createAuthFailureChart();
		this.createSuccessAuthChart();
		this.createAuthStepUpSuccessFailureChart();
		this.activitesChart();
		this.devicesCountChart();
	},
	addDateTimePickerForStartAndEndDate : function() {
		$('#start-date').datetimepicker().data('DateTimePicker').setDate(
				new Date());
		$('#end-date').datetimepicker().data('DateTimePicker').setDate(
				new Date());
	},

	constructChartCreationParameterObject : function(parameters) {

		var startDate = $('#start-date').data('DateTimePicker').getDate()
				.format('YYYY-MM-DD');
		var endDate = $('#end-date').data('DateTimePicker').getDate().format(
				'YYYY-MM-DD');

		var endPoint = restEndPoints[parameters.endPoint].resource;		
		if ((typeof startDate != 'undefined' || startDate != '')
				&& (typeof endDate != 'undefined' || endDate != ''))
		{
			endPoint = endPoint + '?startDate=' + startDate;
			endPoint = endPoint + '&endDate=' + endDate;
		}


		var that=this;
		
		return {
			endPoint : endPoint,
			type : 'GET',
			callback :that.chartCreatorCallback,
			callbackParameter : parameters.callbackParameter,
			overRideUseMockUpProperty : true
		};
	},	
	chartCreatorCallback:function(callbackParameter,data)
	{
		securedb.chart[callbackParameter.chartCreatorFunction](callbackParameter,data);
	   if(callbackParameter.chartName=securedb.home.lastChartToDraw)
		$(securedb.home.loaderSymElement).hide();
	},	
	getDataFromServer:function()
	{
		$(this.loaderSymElement).show();
		this.createHomePageCharts();
	},
	applyBindings:function()
	{
		ko.applyBindings(this);
	}

}

securedb.home.init = function() {
	this.addDateTimePickerForStartAndEndDate();
	this.createHomePageCharts();
	this.applyBindings();

}


'use strict'

var restEndPoints = securedb.config.restEndPoints;

if (!securedb.home) {
	securedb.home = {};
}

securedb.home = {

	utility : securedb.utility,
	loaderSymElement : '#homepg-loader-sym',
	lastChartToDraw : 'Devices',

	createAuthFailureChart : function() {

		var serverParameter = this.constructChartCreationParameterObject({
			endPoint : 'auditFailure',
			callbackParameter : {
				element : '#auth-failure-detail-chart',
				chartName : 'Authentication Failure Type',
				chartCreatorFunction : 'drawPieChart'
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
				chartCreatorFunction : 'drawPieChart'
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
				chartCreatorFunction : 'drawPieChart'
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
				chartCreatorFunction : 'drawPieChart'
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
		var currentDate = new Date();

		$('#start-date').datetimepicker().data('DateTimePicker').setDate(
				currentDate);
		var previousDate = currentDate.setDate(currentDate.getDate() - 1);
		$('#end-date').datetimepicker().data('DateTimePicker').setDate(
				new Date(previousDate));
	},

	constructChartCreationParameterObject : function(parameters) {

		var startDate = $('#start-date').data('DateTimePicker').getDate()
				.format('YYYY-MM-DD');
		var endDate = $('#end-date').data('DateTimePicker').getDate().format(
				'YYYY-MM-DD');

		var endPoint = restEndPoints[parameters.endPoint].resource;

		if ((typeof startDate != 'undefined' || startDate != '')
				&& (typeof endDate != 'undefined' || endDate != '')) {
			endPoint = endPoint + '?startDate=' + startDate;
			endPoint = endPoint + '&endDate=' + endDate;
		}

		var that = this;

		return {
			endPoint : endPoint,
			type : 'GET',
			callback : that.chartCreatorCallback,
			callbackParameter : parameters.callbackParameter,
			overRideUseMockUpProperty : true
		};
	},
	isDataPresentForChart : function(data) {
		if (data instanceof Array)
			return data.length > 0;
		else if (data instanceof Object)
			return !$.isEmptyObject(data);

	},
	checkForEmptyProperty : function(data) {
		if (data instanceof Array) {
			for (var i = 0; i < data.length; i++) {
				var object = data[i];
				for ( var property in object) {
						if(object[property]==0 || object[property]=='0')
							data.splice(i,1);
				}
			}
		} else if (data instanceof Object) {

			for ( var property in data) {

				if (data[property] == '0' || data[property] == 0)
					delete data[property];
			}
		}

		return data;
	},
	chartCreatorCallback : function(callbackParameter, data) {
		$(callbackParameter.element).parent().prev().append(
				'<img src="content/images/ajax-loader.gif">');

		var data = securedb.home.checkForEmptyProperty(data);
		if (securedb.home.isDataPresentForChart(data)) {

			$(callbackParameter.element).html('');

			securedb.chart[callbackParameter.chartCreatorFunction](
					callbackParameter, data);

			$(callbackParameter.element).parent().prev().find('.alert-danger')
					.remove();
			$(callbackParameter.element).parent().prev().find('img').remove();
		}

		else {

			$(callbackParameter.element).html('');
			$(callbackParameter.element).parent().prev().find('.alert-danger')
					.remove();
			$(callbackParameter.element).parent().prev().find('img').remove();
			$(callbackParameter.element)
					.parent()
					.prev()
					.append(
							'<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">×</button>'
									+ '<strong>'
									+ callbackParameter.chartName
									+ '</strong> chart <br/> contains  no data for now.'
									+ '</div>');

			$(callbackParameter.element).parent().prev().find('img').remove();
		}

	},
	getDataFromServer : function() {
		$(this.loaderSymElement).show();
		this.createHomePageCharts();
	},
	applyBindings : function() {
		ko.applyBindings(this);
	}

};

securedb.home.init = function() {
	this.addDateTimePickerForStartAndEndDate();
	this.createHomePageCharts();
	this.applyBindings();

}

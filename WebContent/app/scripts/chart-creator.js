'use strict'

securedb.chart = {

	utility:securedb.utility,
		
	createPieChart : function(chartSetting) {
		var element = chartSetting.element;
		var title = typeof chartSetting.title == 'undefined' ? ''
				: chartSetting.title;
		var data = typeof chartSetting.data == 'undefined' ? []
				: chartSetting.data;
		var chartName = typeof chartSetting.chartName == 'undefined' ? ''
				: chartSetting.chartName;

		$(element)
				.highcharts(
						{
							tooltip : {
								style : {
									fontFamily : '"Roboto", "Open Sans", Arial, sans-serif'
								},
							},
							chart : {
								plotBackgroundColor : null,
								plotBorderWidth : null,
								plotShadow : false,
								height : 250,
								events : {
									load : function() {
										var chart = this;
										window.chartTotal = 0;
										console.log(chart);
										$(chartSetting.data)
												.each(
														function(i, serie) {
															window.chartTotal = window.chartTotal
																	+ serie.y;
															var legend = '<div>'
																	+ '<div class="large text-right" style="display: inline-block; width: 3em; vertical-align: middle;"><a href="javascript:void(0);">'
																	+ serie.y
																	+ '</a></div>'
																	+ '<div class="bar-thick" style="width: 10px; margin: 0 5px; display: inline-block; vertical-align: middle;background-color:'
																	+ serie.color
																	+ '"></div><span>        '
																	+ serie.name
																	+ '</span>'

															$(element).append(
																	legend);
														});

									}
								}

							},
							legend : {
								itemStyle : {
									fontFamily : '"Roboto", "Open Sans", Arial, sans-serif',
									fontWeight : '300',
									fontSize : '14px',
									lineHeight : '1.42857143',
									color : '#444444',
									backgroundColor : '#ffffff'
								},
								useHTML : true,
								maxHeight : 100,
								labelFormatter : function() {
									return this.name
											+ ' <div class="large text-right" style="display: inline-block; width: 3em; vertical-align: middle;"><a href="javascript:void(0);">'
											+ this.y + '</a></div>'
								}

							},
							title : {
								text : '<div class="doughnutSummary" style="width: 90px; margin-left: -45px;"><p class="doughnutSummaryTitle">TOTAL:</p><p class="doughnutSummaryNumber" style="opacity: 0.9999998780673678;">'
										+ securedb.chart
												.calculateTotalForPieChart(chartSetting.data)
										+ '</p></div>',
								align : 'center',
								useHTML : true,
								verticalAlign : 'middle'

							},
							plotOptions : {
								pie : {
									allowPointSelect : true,
									cursor : 'pointer',
									dataLabels : {
										enabled : false
									},
									showInLegend : false
								}
							},
							series : [ {
								type : 'pie',
								innerSize : '80%',
								name : chartName,
								data : data
							} ]
						});

	},

	createPyramidChart : function(chartSetting) {
		var element = chartSetting.element;
		var title = typeof chartSetting.title == 'undefined' ? ''
				: chartSetting.title;
		var data = typeof chartSetting.data == 'undefined' ? []
				: chartSetting.data;
		var chartName = typeof chartSetting.chartName == 'undefined' ? ''
				: chartSetting.chartName;

		$(element)
				.highcharts(
						{
							chart : {
								type : 'pyramid',
								marginRight : 150
							},
							title : {
								text : '',
								x : -100
							},
							plotOptions : {
								series : {
									dataLabels : {
										enabled : true,
										format : '<b>{point.name}</b> ({point.y:,.0f})',
										color : (Highcharts.theme && Highcharts.theme.contrastTextColor)
												|| 'black',
										softConnector : true
									}
								}
							},
							legend : {
								enabled : false
							},
							series : [ {
								name : chartName,
								data : data
							} ]
						});
	},

	createBarChart : function(chartSetting) {

		var element = chartSetting.element;
		var title = typeof chartSetting.title == 'undefined' ? ''
				: chartSetting.title;
		var data = typeof chartSetting.data == 'undefined' ? []
				: chartSetting.data;
		var chartName = typeof chartSetting.chartName == 'undefined' ? ''
				: chartSetting.chartName;
		var xAxisType = typeof chartSetting.xAxisType == 'undefined' ? ''
				: chartSetting.xAxisType;
		var yAxisTitle = typeof chartSetting.yAxisTitle == 'undefined' ? ''
				: chartSetting.yAxisTitle;

		$(element)
				.highcharts(
						{
							chart : {
								type : 'bar'
							},
							title : {
								text : ''
							},
							xAxis : {
								type : 'category',
								labels : {
									rotation : -45,
									style : {

										fontFamily : '"Roboto", "Open Sans", Arial, sans-serif',
										fontWeight : '300',
										fontSize : '14px',
										lineHeight : '1.42857143',
										color : '#444444',
										backgroundColor : '#ffffff'

									}
								}
							},
							yAxis : {
								min : 0,
								title : {
									text : yAxisTitle
								}
							},
							legend : {
								layout : 'vertical',
								align : 'right',
								verticalAlign : 'top',
								x : -40,
								y : 100,
								floating : true,
								borderWidth : 1,
								backgroundColor : ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
								shadow : true,
								itemStyle : {
									fontFamily : '"Roboto", "Open Sans", Arial, sans-serif',
									fontWeight : '300',
									fontSize : '14px',
									lineHeight : '1.42857143',
									color : '#444444',
									backgroundColor : '#ffffff'
								},
							},
							series : [ {
								name : chartName,
								data : data
							} ]
						});
	},

	drawBarChart : function(chartParameter, data) {
		data = securedb.chart.formatDataForBarChart(data);
		chartParameter.data = data;
		securedb.chart.createBarChart(chartParameter);
	},

	drawPyramidChart : function(chartParameter, data) {
		chartParameter.data = data;
		securedb.chart.createPyramidChart(chartParameter);
	},
	drawPieChart : function(chartParameter, data) {
		data = securedb.chart.formatDataForPieChart(data);
		chartParameter.data = data;
		securedb.chart.createPieChart(chartParameter);
	}

}

securedb.chart.formatDataForBarChart = function(data) {
	var formatedData = [];

	for (var i = 0; i < data.length; i++) {
		var object = data[i];
		var deviceCountArray = [];
		for ( var prop in object) {
			deviceCountArray.push(object[prop]);
		}
		
		var a=deviceCountArray[1];
		var b=deviceCountArray[0];
		
		formatedData.push([a,b]);
	}

	return formatedData;
}

securedb.chart.formatDataForPieChart = function(data) {

	var formatedData = [];
	var index = 0;
	var that=this;
	

	for ( var prop in data) {

		var captializedProperty=that.utility.capitaliseFirstLetter(prop);
		var underscoreRemovedProperty=that.utility.replaceUnderScoreWithSpace(captializedProperty); 
		
		formatedData.push({
			name : underscoreRemovedProperty,
			y : data[prop],
			color : securedb.config.chartColors[index]
		});
		index++;
	}

	return formatedData;
}
securedb.chart.calculateTotalForPieChart = function(data) {

	var total = 0;
	for (var i = 0; i < data.length; i++) {
		total = total + data[i].y;
	}

	return total;

}

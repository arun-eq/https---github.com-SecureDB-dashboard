'use strict'

if (!securedb.config) {
	securedb.config = {};
}

securedb.config = {

	currentUser : ko.observable(),
	useMock : true,
	logger : toastr,

	restUrls : {
		//local
		dev : 'http://localhost:8080/securedb/',
		prod : '',
		test : ''
	},

	restEndPoints : {
		auditFailure : {
			resource : 'audit/auditsignins'
		},
		auditSuccess : {
			resource : 'audit/auditauths'
		},
		stepAuthSuccessFailure : {
			resource : 'audit/auditauthentications'
		},
		Activites : {
			resource : 'audit/auditactivities'
		},
		Devices : {
			resource : 'audit/auditdevicetypes'
		}

	},	
	
	
	chartColors : [ '#55BB55', '#DD4433', '#FFBB00',  '#77BBFF','#EE77DD',
			'#AABBBB', '#EE77DD', '#55DDDD' ],

	toasts : {
		changesPending : 'Please save or cancel your changes before leaving the page.',
		errorSavingData : 'Data could not be saved. Please check the logs.',
		errorGettingData : 'Could not retrieve data.  Please check the logs.',
		invalidRoute : 'Cannot navigate. Invalid route',
		retreivedData : 'Data retrieved successfully',
		savedData : 'Data saved successfully'
	},	
	
	
	

};

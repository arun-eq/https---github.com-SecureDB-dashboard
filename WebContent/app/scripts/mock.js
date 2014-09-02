'use strict'

securedb.mockData = {

	auditFailure : 
			
			[{name:"Successful Sign Ins",y:1458,color:securedb.config.chartColors[0]},
			{name:"Failed Sign Ins",y:154,color:securedb.config.chartColors[1]},
			{name:"Success After Failed Attempts",y:25,color:securedb.config.chartColors[2]}]

	,

	auditSuccess : [ 
				{name:"Username/Password Sign In",y:58,color:securedb.config.chartColors[0]},
				{name:"Unexpired Cookie Sign In",y:22,color:securedb.config.chartColors[1]},
				{name:"Same Device Sign In",y:18,color:securedb.config.chartColors[2]},
				{name:"OTC Sign In",y:2,color:securedb.config.chartColors[3]}
	                 
	                 ],

	stepAuthSuccessFailure : [
{name:"Successful Auths",y:580,color:securedb.config.chartColors[0]},
{name:"Failed Auths",y:50,color:securedb.config.chartColors[1]},
{name:"Success After Failed Attempts",y:25,color:securedb.config.chartColors[2]}
	                          ],

	Activites : [ { name:"Authentications", y:1450,color:securedb.config.chartColors[0]}, 
	              {name:"Change Password", y:90,color: securedb.config.chartColors[1]},
	              {name:"Forgot Password", y:140,color:securedb.config.chartColors[2]},
	              {name:"Update Profile",y:20,color:securedb.config.chartColors[3]},
	              {name:"Update Email",y:5,color:securedb.config.chartColors[4] },
	              {name: "Update Username", y:22,color:securedb.config.chartColors[5] },
	              {name: "Update Challenge Questions",y:10,color:securedb.config.chartColors[6] }
	],

	Devices : [

	[ 'Chrome on Win64', 1245 ], [ "IE on Win64", 150 ],
			[ "Firefox on Win64", 25 ]["Safari on iOS", 25],
			[ "Chrome on Android", 5 ], [ "IE on Win32", 46 ],
			[ "Firefox on Win32", 25 ]

	]

}
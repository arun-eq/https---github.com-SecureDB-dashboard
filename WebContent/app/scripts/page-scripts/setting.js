'use strict'

if (!securedb.setting) {
	securedb.setting = {};
}

securedb.setting.vm = {};

securedb.setting.vm.TwofactorAuthentication = {

	twoFactorAuth : ko.observable('1'),
	rolesSelected : ko.observableArray(),
	currentEnteredUrl : ko.observable(),
	urls : ko.observableArray(),
	addUrl : function(item, event) {
		if (typeof this.currentEnteredUrl() == 'undefined') {
			this.currentEnteredUrl.extend({
				required : {
					params : true,
					message : "Please enter a url"
				}
			});
			this.errors.showAllMessages();
			securedb.utility
					.showValidationMessageAfterContainer($(event.target)
							.parent());
		} else {
			this.urls.push(this.currentEnteredUrl());
		}
	},
	save : function() {
		var setting = {};
		setting.id = this.twoFactorAuth();
		setting.value = [];

		if (this.twoFactorAuth() == '2')
			setting.value = this.rolesSelected();
		else if (this.twoFactorAuth() == '3')
			setting.value = this.urls();

		if (!this.validate())
			console.log(setting);
		else
			this.errors.showAllMessages();

	},
	validate : function() {
		var error = true;
		var that = this;
		this.twoFactorAuth.extend({
			validation : {
				validator : function() {
					if (that.twoFactorAuth() == '2'
							&& that.rolesSelected().length == 0) {
						return false
					} else
						return true;
				},
				message : 'Please select a role'
			}
		});

		return error;

	}

};
securedb.setting.vm.TwofactorAuthentication.errors = ko.validation
		.group(securedb.setting.vm.TwofactorAuthentication);

securedb.setting.vm.TwofactorAuthentication.twoFactorAuth.subscribe(function(
		value) {
	// securedb.setting.vm.TwofactorAuthentication.errors();
	// securedb.setting.vm.TwofactorAuthentication.errors.showAllMessages(false);
});

securedb.setting.vm.profile = {

	encryptions : [ 'None', 'DET', 'Name', 'Password', 'PROB' ],

	newProfile : {
		selection : ko.observable(false),
		field : ko.observable(),
		required : false,
		type : 'Custom',
		selectedEncryption : ko.observable()
	},

	profiles : ko.observableArray([ {
		selection : ko.observable(false),
		field : 'username',
		required : ko.observable(true),
		type : 'Standard',
		selectedEncryption : ko.observable('None')
	},

	{
		selection : ko.observable(false),
		field : 'Password',
		required : ko.observable(true),
		type : 'Standard',
		selectedEncryption : ko.observable('PROB')
	},
	{
		selection : ko.observable(false),
		field : 'Email',
		required : ko.observable(true),
		type : 'Standard',
		selectedEncryption : ko.observable('None')
	},
	{
		selection : ko.observable(false),
		field : 'Address Line 1',
		required : ko.observable(true),
		type : 'Standard',
		selectedEncryption : ko.observable('None')
	}, 
	{
		selection : ko.observable(false),
		field : 'Address Line 2',
		required : ko.observable(true),
		type : 'Standard',
		selectedEncryption : ko.observable('None')
	},{
		selection : ko.observable(false),
		field : 'Mobile Phone',
		required : ko.observable(true),
		type : 'Standard',
		selectedEncryption : ko.observable('NONE')
	}

	]),

	deleteProfile : function() {
		var that = this;
		var profiles = ko.toJS(this.profiles);
		for (var i = 0; i < profiles.length; i++) {
			var isSelected = profiles[i].selection;
			if (isSelected) {
				that.profiles().splice(i, 1);
				that.profiles(that.profiles());
			}
		}
	},

	selectAllProfile : function() {
		var that = this;
	
		for (var i = 0; i < that.profiles().length; i++) { 
			if(that.profiles()[i].type=='Custom')
			that.profiles()[i].selection(true);
		}

	},
	addNewProfile : function() {
		this.profiles.unshift(ko.toJS(this.newProfile));
		this.newProfile.field('');
	},
	hideCreateNewProfileTemplate : function() {
		$('.template').hide();
	},
	showCreateNewProfileTemplate : function() {
		$('.template').show();
	}

}

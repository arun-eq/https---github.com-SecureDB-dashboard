securedb.utility = {

	showMessage : function(msg, type) {
		securedb.config.logger[securedb.config.messageTypes[type]](msg);
	},
	showValidationMessageAfterContainerParentElement : function(element) {
		var parentElement = $(element).find('.validationMessage');
		$(element).after(parentElement);
	},
	showValidationMessageAfterContainer : function() {
		var parentElements = $('.validationMessage').parent();
		$(parentElements).each(
				function() {
					var currentParentElement = $(this);
					// console.log(currentParentElement);
					currentParentElement.after(
							currentParentElement.find('.validationMessage'))
							.css('display', 'block');
				});
	},
	capitaliseFirstLetter : function(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	replaceUnderScoreWithSpace : function(string) {
		return string.replace(/_/g, ' ');
	}

}
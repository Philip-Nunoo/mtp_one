// messages.js
Template.messages.helpers({
	messages: function () {
		return Messages.find({}, {sort: {createdAt: -1}});
	}
});

Template.messages.events({
	'click .reply-button': function (e) {
		// When the reply button is clicked
		e.preventDefault();
		var selectedMessage = Messages.findOne(this._id);

		var isVisible = $("#toggle_"+this._id).is( ":visible" );
		var isHidden = $("#toggle_"+this._id).is( ":hidden" );	

		$('div[id^="toggle_"]').hide();		

		if (isHidden) { $("#toggle_"+this._id).show(); }
		else if (isVisible) { $("#toggle_"+this._id).hide(); }

	}
});
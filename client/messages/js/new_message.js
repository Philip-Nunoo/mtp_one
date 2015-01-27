// new_message.js
Template.new_message.events({
	'submit form': function (e) {
		e.preventDefault();

		Messages.insert({
			text: $(e.target).find('#text_area').val(),
			user: Meteor.user(),
		});

		$(e.target).find("#text_area").val("");
	}
});
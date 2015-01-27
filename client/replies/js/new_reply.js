// new_reply.js
Template.newReply.helpers({
	foo: function (messageId) {
		console.log("Message Id: " + this.messageId);
	}
});

Template.newReply.events({
	'submit form': function (e) {
		// create a new reply for a message
		e.preventDefault();

		Replies.insert({
			text: $(e.target).find('#text_area').val(),
			user: Meteor.user(),
			message_id: this.messageId,
		});

		$(e.target).find('#text_area').val("");

	}
});
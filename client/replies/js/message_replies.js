// message_replies.js
Template.messageReplies.helpers({
	replies: function () {
		return Replies.find({message_id: this.messageId});
	}
});

Template.messageReplies.events({
	'click .upvote': function (e) {
		// upvote the reply
		e.preventDefault();
		
		/*ReplyVotes.update(
			{ replyId: this._id, user: Meteor.userId() }, { 
				$set: {vote: 'up'}
			}), 
		// 	{ upsert: true }
		// );*/
		console.log(this._id);
	},
	'click .downvote': function(e){
		// downvote the reply
		e.preventDefault();
		ReplyVotes.upsert(
		{
			replyId: this._id, 
			user: Meteor.userId()
		},
		{
			replyId: this._id,
			user: Meteor.userId(),
			vote: 'down'
		});
		console.log(this._id);
	},
});
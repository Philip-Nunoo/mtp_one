// message_replies.js
Template.messageReplies.helpers({
	replies: function () {
		return Replies.find({message_id: this.messageId});
	}
});

Template.messageReplies.events({
	'click .reply-vote': function (e) {
		// upvote the reply
		e.preventDefault();

		vote = $(e.currentTarget).data('vote');
		
		replyVote = ReplyVotes.findOne({$and: [{user:Meteor.userId()},{replyId: this._id}]});

		if (replyVote){
			ReplyVotes.update({_id: replyVote._id}, {$set: {vote: vote}}, function(e,r){
				console.log(e);
				console.log(r);
			});

		} else {
			ReplyVotes.insert(
				{
					user: Meteor.userId(),
					vote: vote,
					replyId: this._id
				}
			)
		}
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
// reply_vote.js
ReplyVotes = new Mongo.Collection('reply_votes');

/*ReplyVotes.allow({
	insert: function (userId, doc) {
		// do only upserts on database
		// user must be logged in and document owned by the user
		// (ReplyVotes.findOne({userId: userId, replyId: replyId}).count < 1);
		return (userId && doc.user._id === userId && (ReplyVotes.findOne({userId: userId, replyId: replyId}).count < 1));
	},/*
	update: function (userId, doc, fields, modifier) {
		// can update if user has ownership
		return doc.user._id === userId;
	},
	remove: function (userId, doc) {
		// can delete if user has ownership
		return doc.user._id === userId;
	},
	fetch: ['user', 'replyId']
});*/
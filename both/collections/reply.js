// reply.js
Reply = function(doc) {
	_.extend(this, doc);	
};

/*
	Methods linked to a row
	Getting all messages link to a comment
*/
_.extend(Reply.prototype, {
	downVote: function(){
		console.log("downvoted item: " + this._id);
	},
	upVote: function(){
		console.log("upvoted item: " + this._id);
	},
	getDateCreated: function(){
		return this.createdAt;
	}
});

/*
	Defining my Replies collection
	called replies,
	adding transform
*/
Replies = new Mongo.Collection('replies',{
	transform: function(doc){ return new Reply(doc); }
});

/*
	Replies allow
	Rule deny user from
	* (C)rud   -- Inserting if they are not logged in
	* (R)ead   -- *
	* (U)pdate -- Update if logged in and owner
	* (D)elete -- remove if logged in and owner
*/
Replies.allow({
	insert: function (userId, doc) {
		// user must be logged in and document owned by the user
		return (userId && doc.user._id === userId);
	},
	update: function (userId, doc, fields, modifier) {
		// can update if user has ownership
		return doc.user._id === userId;
	},
	remove: function (userId, doc) {
		// can delete if user has ownership
		return doc.user._id === userId;
	},
	fetch: ['user']
});

/*
	Replies denials
	Things to deny the user if attempted
	* (U)pdate   -- can't update the reply user field
*/
Replies.deny({
	update: function (userId, doc, fields, modifier) {
		// can't change user field
		return _.contains(fields, 'user');
	},
	fetch: ['user']
});

Replies.before.insert(function (userId, doc) {
	if (Meteor.user==null) {
		alert("Please sign in to continue");
		return false;
	};
	doc.createdAt = Date.now();
});
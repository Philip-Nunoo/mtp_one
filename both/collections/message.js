// message.js
Message = function (doc){
	_.extend(this, doc);
};

/*
	Methods link to a row
*/
_.extend(Message.prototype, {
	getAllPages: function() { // getting all replies Linked to a message
		return Replies.find({message_id: this._id});
	},
	getDateCreated: function() {
		return this.createdAt;
	},
});

/*
	Defining my Messages collection
	called messages,
	adding a transform to retrievals
*/
Messages = new Mongo.Collection('messages', {
	transform: function (doc) { return new Message(doc); }
});

/*
	Messages denial
	Rule deny user from
	* (C)rud   -- Inserting if they are not logged in
	* (R)ead   -- *
	* (U)pdate -- Update if logged in and owner
	* (D)elete -- remove if logged in and owner
*/
Messages.allow({
	insert: function (userId, doc) {
		// the user must be logged in, and the document must be owned by the user
		return (userId && doc.user._id === userId);
	},
	update: function (userId, doc, fields, modifier) {
		// update if only user created this message
		return doc.user._id === userId;
	},
	remove: function (userId, doc) {
		// only the owner can remove this message
		return doc.user._id === userId;
	},
	fetch: ['user']
});

/*
	Things to deny the user if attempted
	* (U)pdate   -- can't update the message user field
*/
Messages.deny({
	update: function (userId, doc, fields, modifier) {
		// can't change user field
		return _.contains(fields, 'user');
	},
	fetch: ['user']
});

Messages.before.insert(function (userId, doc) {
	if (Meteor.user==null) { // Validating that a user is inserted
		alert("Please sign in to continue");
		return false;
	};
	doc.createdAt = Date.now();
});
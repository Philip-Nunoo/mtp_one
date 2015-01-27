// main.js
UI.registerHelper('formatTime', function(context, options) {
	if(context)
		return moment(context).fromNow();
});
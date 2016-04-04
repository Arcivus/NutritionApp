var app = app || {};

app.SearchItem = Backbone.Model.extend({
	defaults: {},
	sync: function(){return null;},
	fetch: function(){return null;},
	save: function(){return null;}
});




var SearchItems = Backbone.Collection.extend({
	model: app.SearchItem,


});

app.SearchResults = new SearchItems();
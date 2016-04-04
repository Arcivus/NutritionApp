var app = app || {};

app.Page = Backbone.Model.extend({
	defaults: {
		title: '1'
	}
});

var PageList = Backbone.Collection.extend({
	model: app.Page,

	localStorage: new Backbone.LocalStorage('pages-backbone'),

});

app.Pages = new PageList();

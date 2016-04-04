var app = app || {};

var Workspace = Backbone.Router.extend({
	routes: {
		'*filter': 'setFilter'
	},

	setFilter: function(param){
		app.FoodFilter = param;
		app.Foods.trigger('filter');

	}
});

app.FoodRouter = new Workspace();
Backbone.history.start();
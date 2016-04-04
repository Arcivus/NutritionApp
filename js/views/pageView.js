var app = app || {};

app.PageView = Backbone.View.extend({
	tagName: 'li',

	template: _.template($('#page-template').html()),

	events: {
		'click .destroy': 'deleteOne'
	},

	initialize: function(){
		this.listenTo(this.model, 'destroy', this.remove)
	},

	render: function(){
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

	deleteOne: function(){
		this.model.destroy();
		
		var deletedPage = this.model.get('title').toString();
		_.each(app.Foods.where({page: deletedPage}), function(food){
			food.destroy()
		});
		
		var currentPage = Backbone.history.getFragment();
		if(currentPage === deletedPage){
			var lastPage = app.Pages.last().get('title');
			app.FoodRouter.navigate('#/' + lastPage);
		}

	}
});
var app = app || {};

app.PageListView = Backbone.View.extend({
	el: "#nutritionApp",

	initialize: function(){
		this.listenTo(app.Pages, 'add', this.addOne);
		this.listenTo(app.Pages, 'reset', this.addAll);
		this.listenTo(app.Pages, 'all', this.render);
		this.listenTo(app.Foods, 'all', this.addAll);
		this.listenTo(app.Foods, 'all', this.render);


		app.Pages.fetch();
	},

	render: function(){
		this.$('#filters li a').removeClass('selected')
								  .filter('[href="#/' + app.FoodFilter + '"]')
								  .addClass('selected');
	},

	addOne: function(page){
		var view = new app.PageView({model: page});
		$('#filters').append(view.render().el);
	},

	addAll: function(){
		this.$('#filters').html('');
		app.Pages.each(this.addOne, this);
	},

	isDateExists: function(){
		var exists = false;
		var today = getDate();
		app.Pages.each(function(page){
			if(page.get('title') === today){
				exists = true;
			}
		})
		return exists;
	},

	newPage: function(){
		if(!this.isDateExists()){
			app.Pages.create({title: getDate()});
		} 
	}
});

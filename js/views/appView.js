var app = app || {};

app.AppView = Backbone.View.extend({
	el: "#nutritionApp",

	statsTemplate: _.template($('#stats-template').html()),

	events: {
		'click #submitFood': 'newFood'
	},

	initialize: function(){
		this.$footer = this.$('footer');

		this.$inputName = this.$('#searchField');
		this.$inputWeight = this.$('#weightField');
		this.$inputKcal = this.$('#kcalPerHundred');

		this.listenTo(app.Foods, 'add', this.addOne);
		this.listenTo(app.Foods, 'reset', this.addAll);
		this.listenTo(app.Foods, 'all', this.render);

		this.listenTo(app.Foods, 'filter', this.filterAll);

		app.Foods.fetch();


	},

	render: function(){
		var totalKcal = 0;
		_.each(app.Foods.getFiltered(), function(food){
			totalKcal += food.get('kcal');
		});

		this.$footer.html(this.statsTemplate({totalKcal: totalKcal}));
	},

	addOne: function(food){
		var view = new app.FoodView({model: food});
		$('#foodList').append(view.render().el);
		food.trigger('visible');
	},

	addAll: function(){
		this.$('#foodList').html('');
		app.Foods.each(this.addOne, this);
	},

	filterOne: function(food){
		food.trigger('visible');
	},

	filterAll: function(){
		app.Foods.each(this.filterOne, this);
	},

	newFood: function(e){
		var name = this.$inputName.val().trim();
		var weight = parseInt(this.$inputWeight.val(), 10);
		var kcalPerHund = parseInt(this.$inputKcal.val(), 10);
		if((name) && !isNaN(weight) && !isNaN(kcalPerHund)){
			var kcal = Math.round((kcalPerHund/100) * weight);

			app.Foods.create({name: name, weight: weight, kcal: kcal, page: app.FoodFilter});

			this.$inputName.val('');
			this.$inputWeight.val('100');
			this.$inputKcal.val('0');
		}
	},
});
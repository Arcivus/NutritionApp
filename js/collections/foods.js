var app = app || {};

app.Food = Backbone.Model.extend({
	defaults:{
		name: '',
		weight:'0',
		kcal:'0',
		page: '1'
	}
});

var FoodList = Backbone.Collection.extend({
	model: app.Food,

	localStorage: new Backbone.LocalStorage('foods-backbone'),

	getFiltered: function(){
		return this.where({page: app.FoodFilter});
	}

});

app.Foods = new FoodList();
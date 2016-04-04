var app = app || {};

app.SearchItemView = Backbone.View.extend({
	tagName: 'li',

	template: _.template($('#search-template').html()),

	events:{
		'click .searchItem': 'chooseItem',
	},

	initialize: function(){
		this.listenTo(this.model, 'destroy', this.remove);
	},

	render: function(){
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

	chooseItem: function(){
		$('#searchField').val(this.model.get('name'));
		$('#kcalPerHundred').attr('value', this.model.get('kcal'));
		$('#kcalPerHundred').val(this.model.get('kcal'));
		this.model.destroy();
	}
});
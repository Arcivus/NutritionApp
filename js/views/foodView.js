var app = app || {};

app.FoodView = Backbone.View.extend({
	tagName: 'li',

	template: _.template($('#food-template').html()),

	events: {
		'click .destroy': 'deleteOne',
		'dblclick label': 'edit',

		'keypress .editName': 'updateOnEnter',
		'keypress .editWeight': 'updateOnEnter',
		'keypress .editKcal': 'updateOnEnter'
	},

	initialize: function(){
		this.listenTo(this.model, 'visible', this.toggleVisible);
	},

	render: function(){
		this.$el.html(this.template(this.model.attributes));

		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'change', this.render);

		this.$editName = this.$('.editName');
		this.$editWeight = this.$('.editWeight');
		this.$editKcal = this.$('.editKcal');

		this.$editName.hide();
		this.$editWeight.hide();
		this.$editKcal.hide();

		return this;
	},

	deleteOne: function(){
		this.model.destroy();
	},

	edit: function(){
		this.$el.addClass('editing');

		this.$editName.show().focus();
		this.$editWeight.show();
		this.$editKcal.show();
	},

	toggleVisible: function(){
		this.$el.toggleClass('hidden', this.isHidden());
	},

	isHidden: function(){
		return (this.model.get('page') !== app.FoodFilter);
	},

	close: function(){
		var name = this.$editName.val().trim();
		var weight = parseInt(this.$editWeight.val(), 10);
		var kcal = parseInt(this.$editKcal.val(), 10);

		if((name) && !isNaN(weight) && !isNaN(kcal)){
			this.model.save({name: name, weight: weight, kcal: kcal});
		}
		this.$el.removeClass('editing');
		this.$editName.hide();
		this.$editWeight.hide();
		this.$editKcal.hide();
	},

	updateOnEnter: function(e){
		if(e.which === ENTER_KEY){
			this.close();
		}
	}

})
var app = app || {};

app.SearchView = Backbone.View.extend({
	el: "#header",

	events:{
		'keyup #searchField': 'search',
		'keypress #searchField': 'closeMenu'
	},

	initialize: function(){
		this.$input = this.$('#searchField');
		this.$menu = this.$('#searchMenu');
		var position = this.$input.offset().top + this.$input.height() + 5;

		this.$menu.offset({top: position});
		
		this.listenTo(app.SearchResults, 'add', this.showResults);
		this.listenTo(app.SearchResults, 'destroy', this.resetSearch);
	},

	search: function(e){
		var request = this.$input.val().trim();
		if (request.length > 2 && (e.which !== ENTER_KEY)){
			this.resetSearch();
			this.sendRequest(request);
		} else {
			this.resetSearch();
		}
		
	},

	sendRequest: function(request){
		var result = null;
		$.ajax({
			method: 'POST',
			url: 'https://api.nutritionix.com/v1_1/search',
			context: this,
			data: {
				"appId":"890a15a1",
  				"appKey":"140da206f6b0d6e3f389615f30cd1969",  
  				"query":request,
  				"fields":["item_name","brand_name","nf_calories","nf_serving_size_qty"],
  				"sort":{
    				"field":"_score",
    				"order":"desc"
 				},
  				"filters":{
    				"item_type":2,
   					"nf_serving_size_unit":"oz"
   				}
			}
		}).done(function(data){
			result = data;
			this.createSearchResults(result);
		})
	},

	createSearchResults: function(foodList){
		var self = this;
		foodList.hits.forEach(function(item){
			var name = item.fields.item_name;
			var brand = item.fields.brand_name;

			var servingSize = item.fields.nf_serving_size_qty; // number of ozs in database
			var kcalInList = item.fields.nf_calories; //kcal extracted from database
			var kcal = self.recalculateKcal(kcalInList, servingSize)// recalculate kcal for 100g of product
			if((app.SearchResults.length) <10){
				app.SearchResults.create({name: name, brand: brand, kcal: kcal});
			}
		})
	},

	showResults: function(searchItem){
		var view = new app.SearchItemView({model: searchItem});
		$('#searchMenu').append(view.render().el);
	},

	resetSearch: function(){
		_.invoke(app.SearchResults.toArray(), 'destroy');
		app.SearchResults.reset();		
	},

	recalculateKcal: function(kcalperServing, ozQuantity){
		var kcalcount = Math.round( ((kcalperServing/ozQuantity)/28.3) * 100 );
		return kcalcount;
	},

	closeMenu: function(e){
		if(e.which === ENTER_KEY){
			this.resetSearch;
		}
	}

});
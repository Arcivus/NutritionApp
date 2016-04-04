var app = app || {};

var ENTER_KEY = 13;

var getDate = function(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yyyy = today.getFullYear();

	if(dd<10) {
    dd='0'+dd
	} 

	if(mm<10) {
    mm='0'+mm
	} 

	today = dd+'/'+mm+'/'+yyyy;

	return today;
};

$(function(){
	var today = getDate();
	new app.AppView();
	new app.SearchView();
	var pages = new app.PageListView();

	if(!app.Pages.length){
		app.Pages.create({title: '20/02/2016'});
		app.Pages.create({title: '21/02/2016'});
		app.Foods.create({name: 'French fries', weight: 100, kcal: 470, page: '20/02/2016'});
		app.Foods.create({name: 'Boiled beef', weight: 200, kcal: 390, page: '20/02/2016'});
		app.Foods.create({name: 'Apple Cider', weight: 300, kcal: 200, page: '21/02/2016'});
		app.Foods.create({name: 'Strawberry jam', weight: 50, kcal: 190, page: '21/02/2016'});

	};
	pages.newPage();
	app.FoodRouter.setFilter(today);
	app.FoodRouter.navigate(today);
	console.log("ponk");
});
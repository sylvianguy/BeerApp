var beerApp = {};
beerApp.apiKey = '22981353ba0adfcf1928128e4a1e73a4';
beerApp.apiId = '046e426b';
beerApp.$beerContainer = $('#recipes');

// beerApp.beerData = {};

beerApp.init = function(){

	$('button').on('click', function(e){
		if($(this).length ) {
	        e.preventDefault();
	        $('html, body').animate({
	            scrollTop: $(this).offset().top
	        }, 1000);
        }
	});

	$('#chooseBeer label').on('click', function(){
		$(this).css('background', '#B1772F');
		$('input:radio').attr('checked', false);

		if($(this).length ) {
	        $('html, body').animate({
	            scrollTop: $(this).offset().top
	        }, 1000);
        }
    }); 

    $('#chooseMeal .mealDiv').on('click', function(){
    	$(this).css('background', '#B1772F');

		if($(this).length ) {
	        $('html, body').animate({
	            scrollTop: $(this).offset().top
	        }, 1100);
        }
    }); 


	$('#search').on('click', function(e){
		e.preventDefault(); 
		var beerType = ''; 
		var mealType = [];
		var $beerSelector = $('.chooseBeer input:checked');
		var $mealSelector = $('.chooseMeal input:checked');
		beerType = $beerSelector.first().val();

			if($(this).length ) {
	        e.preventDefault();
	        $('html, body').animate({
	            scrollTop: $(this).offset().top
	        }, 1000);
        }

		$mealSelector.each(function(){
			mealType.push($(this).val()); 
			if ($(this).val() == "course^course-Lunch and Snacks"){
				mealType.push("course^course-Appetizers"); 
			}
		}); 

		$('#refresh').show();
		// $('.pirate').show();

		beerApp.getRecipes(beerType,mealType);		
	});

		$('#refresh').on('click', function(){
			window.location.reload();
			
		});
};



		
beerApp.getRecipes = function(desiredBeer,desiredMeal){
	$.ajax({
		url: 'http://api.yummly.com/v1/api/recipes',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			format: 'jsonp',
			_app_id: beerApp.apiId,  
			_app_key: beerApp.apiKey,
			allowedIngredient: desiredBeer,
			allowedCourse: desiredMeal,
			requirePictures: true,
			maxResult: 20
		},  
		success: function(result) {
			// beerApp.beerContainer.empty();
			beerApp.displayRecipes(result.matches);
			


		}
	});
};


	   
beerApp.displayRecipes = function(data){
	//put recipes on the page
	$.each(data, function(i,item){
		var imageSrc = item.smallImageUrls.toString().replace('=s90', '');
		var image = $('<img>').attr('src', imageSrc).addClass('recipeImg');
		var name = $('<h2>').text(item.recipeName).addClass('recipeName');
		// var ingredients = $('<p>').text(item.ingredients).addClass('recipeIngredients');
		var ID = item.id;
		var url = $('<a>').attr({'href':'http://www.yummly.com/recipe/'+ID, 'target':'_blank'}); //created var url containing a tag/link
		var clickable = url.append(image, name); //creating all things clickable appending name and image to url
        var innerBeerItem = $('<div>').append(clickable).addClass('innerBeerItem');
		var beerItem = $('<div>').append(innerBeerItem).addClass('beerItem'); //beerItem reps WHOLE SEARCH RESULT ITEM, appending clickable + ingredients, adding class to style

		beerApp.$beerContainer.append(beerItem);
	
    });


		
};


$(document).ready(function() {
	beerApp.init();
});


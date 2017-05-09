console.log('hi');
var suburb = '';


$('#suburb').select2({
	placeholder: "Select a Suburb",
	allowClear: true,
	data: [
	{
	  id: 'Waikanae',
	  text: 'Waikanae'
	},
	{
	  id: 'Paraparaumu',
	  text: 'Paraparaumu'
	}
	// ... more data objects ...
	]
});

$('#designation').select2({
	placeholder: "Click here to select one or more designations",
	tags: true,
	tokenSeparators: [',', ' ']
})
$('#designation').prop('disabled', 'disabled');


$('#suburb').on('select2:select', function (evt) {
	suburb = $(this).val();
	designations = findSuburbDesignations(suburb);
	console.log('designations');
	console.log(designations);
	console.log('evt');
	console.log(evt);
	$('#designation')
    .find('option')
    .remove()
    .end();
	$.each(designations, function (i, designation) {
		$('#designation').append(
			$('<option>', { 
				value: designation,
				text : designation 
			})
		);
	});
	$('#designation').prop('disabled', false);
});

$('#designation').on('select2:select', function (evt) {
	var selectedVals = $('#designation').val();
	console.log('designation values');
	console.log(selectedVals);
	findParkDesignations(selectedVals)
});

var parks = {
	"Maclean": [{
		"Designation": [
			"Dog Friendly",
			"Water Park",
			"Base Ball Pitch",
			"Soccer Field"
		],
		"Suburb": "Paraparaumu"
	}],
	"Waikanae": [{
		"Designation": [
			"Child Friendly",
			"Dog Friendly",
			"Water Park",
			"Rugby Ground",
			"Soccer Field"
		],
		"Suburb": "Waikanae"
	}]
}

//Return all designations for parks for a selected suburb
function findSuburbDesignations(suburb) {
	
	var designations = [];
	$.each(parks, function(park, attrs) {
		console.log(park);
		$.each(attrs, function(i, item) {
			if(item['Suburb'] == suburb){
				designations = designations.concat(item['Designation']);
			}
		});
	});
	
	console.log('Designations');
	console.log(designations);
	
	return designations;
}

//Return all parks for the selected designations and suburb
function findParkDesignations(selectedDesignations) {
	
	var availParks = [];
	var match = 0;
	//Loop through parks
	$.each(parks, function(park, attrs) {
		console.log(park);
		//Loop through parks attributes/properties
		$.each(attrs, function(i, item) {
			if(item['Suburb'] == suburb){
				//See if park matches one of the selected designations
				$.each(item['Designation'], function(i, parkDesignation) {
					console.log(match);
					if($.inArray(parkDesignation, selectedDesignations) > 0 ? true : false){
						match++;					
					}
				});
			}
		});
		if(match == selectedDesignations.length)
			availParks.push(park);
		//Build up html park list here.
	});
	
	console.log('Designations');
	console.log(designations);
	
	console.log('Matched Parks');
	console.log(availParks);
	
	return parks;
}

/*function containsAll(needles, haystack){ 
  for(var i = 0 , len = needles.length; i < len; i++){
     if($.inArray(needles[i], haystack) == -1) return false;
  }
  return true;
}*/


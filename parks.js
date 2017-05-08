console.log('hi');

var parks = {
	"Maclean": [{
		"Designation": [
			"Child Friendly",
			"Dog Friendly",
			"Water Park",
			"Rugby Ground",
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
}
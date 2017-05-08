console.log('hi');

$('#suburb').select2({
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

$('#designation').select2();

$('#suburb').on('select2:select', function (evt) {
	var designations = findSuburbDesignations($(this).val());
	console.log('designations');
	console.log(designations);
	$('#designation').select2({data: designations});
	console.log('evt');
	console.log(evt);
});

//$('#designation').prop('disabled', 'disabled');


var parks = {
	"Maclean": [{
		"Designation": [
			{ id: "Child Friendly", text: "Child Friendly" },
			{ id: "Dog Friendly", text: "Dog Friendly"},
			{ id: "Water Park", text: "Water Park"},
			{ id: "Rugby Ground", text: "Rugby Ground"},
			{ id: "Soccer Field", text: "Soccer Field"}
		],
		"Suburb": "Paraparaumu"
	}],
	"Waikanae": [{
		"Designation": [
			{ id: "Child Friendly", text: "Child Friendly" },
			{ id: "Dog Friendly", text: "Dog Friendly"},
			{ id: "Water Park", text: "Water Park"},
			{ id: "Rugby Ground", text: "Rugby Ground"},
			{ id: "Soccer Field", text: "Soccer Field"}
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

findSuburbDesignations('Waikanae');

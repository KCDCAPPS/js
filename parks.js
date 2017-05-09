window.onload = function() {
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

		$('#designation').on('select2:select', function (e) {
			findParkDesignations($('#designation').val())
		});
		
		$('#designation').on('select2:unselect', function (e) {
			console.log('Removed!!!!!!');
			findParkDesignations($('#designation').val())
		});
		

		var parks = {
			"Maclean Park": [{
				"Designation": [
					"Dog Friendly",
					"Water Park",
					"Base Ball Pitch",
					"Soccer Field"
				],
				"Suburb": "Paraparaumu"
			}],
			"Tennis Court Road": [{
				"Designation": [
					"Dog Friendly",
					"Tennis Court"
				],
				"Suburb": "Paraparaumu"
			}],
			"Waikanae Park": [{
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
			$( "#park-list" ).empty();
			var designations = [];
			$.each(parks, function(park, attrs) {
				console.log(park);
				$.each(attrs, function(i, item) {
					if(item['Suburb'] == suburb){
						$.each(item['Designation'], function(ii, parkDesignation) {
							if($.inArray(parkDesignation, designations) == -1 ? true : false){
								console.log('looooopy');
								console.log($.inArray(parkDesignation, designations) == -1 ? true : false);
								console.log(parkDesignation);
								console.log($.inArray(parkDesignation, designations));
								designations.push(parkDesignation);
							}
						});									
					}
				});
			});

			console.log('Designations');
			console.log(designations);

			return designations;
		}

		//Return all parks for the selected designations and suburb
		function findParkDesignations(selectedDesignations) {
			$( "#park-list" ).empty();
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
							if($.inArray(parkDesignation, selectedDesignations) != -1 ? true : false){
								match++;
								console.log('match');
								console.log(match);
							}
						});
					}
				});
				if(match == selectedDesignations.length){
					availParks.push(park);

					var parkList = [
						'<div class="row">',
							"<div class='well col-md-12' style='background-color: #ffffff; margin-top: 10px;'>",
								"<div class='col-md-4'>",
									"<img style='width: 220px; height: 150px;' ",
									"src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgdmlld0JveD0iMCAwIDE0MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzE0MHgxNDAKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNWJlYjYxNTc3NiB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1YmViNjE1Nzc2Ij48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjQ1LjUiIHk9Ijc0LjUiPjE0MHgxNDA8L3RleHQ+PC9nPjwvZz48L3N2Zz4=' ",
									"alt='...' class='img-thumbnail'>",
								"</div>",
								"<div class='col-md-8'>",
									"<h2 style='margin-top: 10px;'>" + park + "</h2>",
									"<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>",
								"</div>",
							"</div>",
						"</div>"
					];

					$( "#park-list" ).append( parkList.join(' ') );
				}


				match = 0;
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
}

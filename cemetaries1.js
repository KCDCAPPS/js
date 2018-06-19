window.onload = function() {
		var suburb = '';
		var visibleParks = 0;
		/* UAT ONLY */
		//var domain = "http://uat.kapiticoast.govt.nz.testwin.gdmedia.tv/";
		var domain = "http://uat.www.kapiticoast.govt.nz.testwin.gdmedia.tv/";

		$('#suburb').select2({
			placeholder: "Select a Suburb",
			allowClear: true,
			data: [
			{
			  id: 'Cemetery Search',
			  text: 'Cemetery Search'
			},
			{
			  id: 'Burials',
			  text: 'Burials'
			},
			{
			  id: 'Ashes',
			  text: 'Ashes'
			},
			{
			  id: 'Purchase a Plot',
			  text: 'Purchase a Plot'
			},
			{
			  id: 'Cemeteries Database Search',
			  text: 'Cemeteries Database Search'
			}
			// ... more data objects ...
			]
		});

		$('#designation').select2({
			placeholder: "What would you like to search for?",
			tags: true,
			tokenSeparators: [',', ' ']
		})
		$('#designation').prop('disabled', 'disabled');


		$('#suburb').on('select2:select', function (evt) {
			suburb = $(this).val();
			designations = findSuburbDesignations(suburb);
			
			
			$('#designation').prop('disabled', false);
		});
		
		$('#suburb').on('select2:unselect', function (e) {
			suburb = '';
			findSuburbDesignations('')
			$('#designation').prop('disabled', 'disabled');
			$('#parks-btn').html('Show More...');
			$('#parks-btn').hide();
		});

		$('#designation').on('select2:select', function (e) {
			findParkDesignations($('#designation').val())
		});
		
		$('#designation').on('select2:unselect', function (e) {
			findParkDesignations($('#designation').val());
		});
		
		var parks = {
			"Awa Tapu Cemetery": [{
				"Designation": [
					"Awa Tapu Cemetery",
					"Dog off leash"
				],
				"Suburb": "Cemetery Search",
				"Location": "Ocean Road, Paraparaumu Beach",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Paraparaumu/#Wesley",
				"Blurb": "Wesley Knight Park is one of two fully-fenced off-leash dog parks in Paraparaumu. You can get to it via Ocean Road or Seaview Road, and there's a double safety gate at each entrance. There are poo bags at the gate if you've forgotten yours - please pick up your dog's poo!",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Wesleysmall.jpg"
			}]
		}
		
		//Scroll up to help out mobile users
		$.fn.gotoAnchor = function(anchor) {
			//location.href = this.selector; // this doesn't go high enough but is more effecient
			$(document).scrollTop( $("#parks-end").offset().top - 200); 
		}
		
		$('#parks-btn').on('click', function (e, t) {
			var count = 0;
			if(visibleParks == $('.park-item').length){
				$('.park-item').each(function(i) {
					var element = $(this);
					if(i >= 5) {
						element.css('display', 'none')
					}
					visibleParks = 0;
				});
				$('#parks-btn').html('Show More...')
				$('#parks-end').gotoAnchor();
			} else {
				$('.park-item').each(function(i) {
					var element = $(this);
					var shown = false;
					visibleParks = 0;
					if(element.css('display') == 'none' && count < 5) {
						element.show();
						count++
						if(i == $('.park-item').length -1){
							$('#parks-btn').html('Show Less...')
							visibleParks = i + 1;
						}	
					} 						 
				});
			}
		})
		
		function addNewPark(park, parkAttributes, hide){
			//Allow an external site to be added, so we will need to check to see if the URL contains a https or www as all internal links exclude this and all external ones requires either of these and can contain both.
			//Remember -1 means not found. This allows us to easily change between production and uat with allowing for externally linked pages such as the QE2 park link which goes to a central government page
			var parkUrl = (parkAttributes.Webpage.indexOf('http') == -1 &&  parkAttributes.Webpage.indexOf('www') == -1) ? domain + parkAttributes.Webpage : parkAttributes.Webpage;
			
			var parkList = [
				'<a class="park-item" href="'+ parkUrl + ' " target="_blank"', hide ? 'style="display: none"' : '' ,'  >',
					'<div class="row">',
						"<div class='well col-md-12' style='background-color: #ffffff; margin-top: 10px; cursor: pointer;'>",
							"<div class='col-md-4'>",
								"<img style='width: 230px; height: 170px;' ",
								"src='" + parkAttributes.Image + "' ",
								"alt='" + park + "' class='img-thumbnail'>",
							"</div>",
							"<div class='col-md-8'>",
								"<h2 style='margin-top: 10px;'>" + park + "</h2>",
								"<p>" + parkAttributes.Blurb + "</p>",
								"<address style='margin-bottom: 0px;'>",
									"<strong>Location: </strong>",
									parkAttributes.Location,
								"</address>",
							"</div>",
						"</div>",
					"</div>",
				"</a>"
			];

			$( "#park-list" ).append( parkList.join(' ') );
		}
	
		//Return all designations for parks for a selected suburb
		function findSuburbDesignations(suburb) {
			var visibleParks = 0;
			$('#parks-btn').html('Show More...')
			$( "#park-list" ).empty();
			$('#designation').find('option').remove().end();
			var designations = [];
			if(suburb != ''){
				var count = 0;
				$.each(parks, function(park, attrs) {
					$.each(attrs, function(i, item) {
						if(item['Suburb'] == suburb){
							$.each(item['Designation'], function(ii, parkDesignation) {
								if($.inArray(parkDesignation, designations) == -1 ? true : false)
									designations.push(parkDesignation);
							});	
							
							hideExcessParks(park, attrs, count)
							count++;							
						}
					});
					
				});

				$.each(designations.sort(), function (i, designation) {
					$('#designation').append(
						$('<option>', {
							value: designation,
							text : designation
						})
					);
				});
			}
			applyHoverStyles();
		}

		//Return all parks for the selected designations and suburb
		function findParkDesignations(selectedDesignations) {
			$( "#park-list" ).empty();
			var availParks = [];
			var match = 0;
			var visibleParks = 0;
			$('#parks-btn').html('Show More...')
			var count = 0;
			//Loop through parks
			$.each(parks, function(park, attrs) {
				//Loop through parks attributes/properties
				$.each(attrs, function(i, item) {
					if(item['Suburb'] == suburb){
						//See if park matches one of the selected designations
						$.each(item['Designation'], function(i, parkDesignation) {
							if($.inArray(parkDesignation, selectedDesignations) != -1 ? true : false){
								match++;
							}
						});
					}
				});
				if($.isArray(selectedDesignations) && match == selectedDesignations.length){
					availParks.push(park);
					hideExcessParks(park, attrs, count)	
					count++					
				}

				match = 0;

			});
			if(!($.isArray(selectedDesignations))){
				findSuburbDesignations(suburb);
			}
			
			applyHoverStyles();

			return parks;
		}
		
		function applyHoverStyles(){
			$('.well').mouseover(function() {
				$(this).css({'border-color': '#009FE3'});
			});	
			$('.well').mouseout(function() {
				$(this).css({'border-color': '#e3e3e3'});
			});	
			$('.well').parent().parent().css({ 'color': 'inherit' });
		}
		
		function hideExcessParks(park, attrs, count){
			var hide = count > 4 ? true : false;
			if(count > 4){
				$('#parks-btn').show();
			} else{
				$('#parks-btn').hide();
			}
				
			addNewPark(park, attrs[0], hide)	
		}
		
}

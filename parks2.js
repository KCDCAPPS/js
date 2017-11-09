window.onload = function() {
		var suburb = '';
		var visibleParks = 0;
		var domain = "http://uat.kapiticoast.govt.nz.testwin.gdmedia.tv/";

		$('#suburb').select2({
			placeholder: "Select a Suburb",
			allowClear: true,
			data: [
			{
			  id: 'Ōtaki',
			  text: 'Ōtaki'
			},
			{
			  id: 'Otaihanga',
			  text: 'Otaihanga'
			},
			{
			  id: 'Paekākāriki',
			  text: 'Paekākāriki'
			},
			{
			  id: 'Paraparaumu',
			  text: 'Paraparaumu'
			},
			{
			  id: 'Paraparaumu Beach',
			  text: 'Paraparaumu Beach'
			},
			{
			  id: 'Raumati',
			  text: 'Raumati'
			},
			{
			  id: 'Raumati South',
			  text: 'Raumati South'
			},
			{
			  id: 'Te Horo',
			  text: 'Te Horo'
			},
			{
			  id: 'Waikanae',
			  text: 'Waikanae'
			},
			{
			  id: 'Waikanae Beach',
			  text: 'Waikanae Beach'
			}
			// ... more data objects ...
			]
		});

		$('#designation').select2({
			placeholder: "Select one or more amenities to filter the park list",
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
			"Aōtaki Street Skate Park": [{
				"Designation": [
					"Picnic Area",
					"Playground",
					"Skate Park",
					"Toilets"
				],
				"Suburb": "Ōtaki",
				"Location": "Aōtaki Street, Ōtaki",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/otaki/#aotaki",
				"Blurb": "Something for all ages! Kāpiti’s only ‘Learn to Ride’ track allows young children to bike and scooter around in style within the safety of this unique playground! Bring the older kids to the skate park and then settle down for a picnic. This park is located at the south end of Aōtaki Stret in Ōtaki.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Awatea Lakes": [{
				"Designation": [
					"Playground",
					"Scenic Walk"
				],
				"Suburb": "Paraparaumu",
				"Location": "Jade Lane, Paraparaumu",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Paraparaumu/#awatea",
				"Blurb": "Awatea Lakes spreads between Awatea Avenue, Waterstone Avenue and Jade Lane. Native planting makes the brief walk around the pond a nice escape. Feed the ducks and let the kids loose on a playground that's set back and lowered from the road.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Jadesmall.png"
			}],
			"Campbell Park": [{
				"Designation": [
					"Dog on leash",
					"Greenspace",
					"Picnic Area",
					"Playground",
					"Sports Grounds",
					"Skate Park",
					"Toilets"
				],
				"Suburb": "Paekākāriki",
				"Location": "Wellington Road, Paekākāriki",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/campbell-park/",
				"Blurb": "Located just across the road from Paekākāriki Beach, Campbell Park offers football spectators and players a unique experience. Above the playing field, there's a playground where children can play safely – the best way to get here is via The Parade. There's plenty of open grassy space for picnics and a leisurely stroll.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Dixie Street Reserve": [{
				"Designation": [
					"Basketball Hoop",
					"Greenspace",
					"Picnic Area",
					"Playground"
				],
				"Suburb": "Te Horo",
				"Location": "Dixie Street, Te Horo",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/otaki/#Dixie",
				"Blurb": "Information about this park is coming soon..",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/dixiesmall.png"
			}],
			"Eatwell Reserve": [{
				"Designation": [
					"Dog off leash"
				],
				"Suburb": "Paraparaumu Beach",
				"Location": "Gray Avenue, Paraparaumu Beach",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Paraparaumu/#eatwell",
				"Blurb": "Eatwell Reserve is one of two fenced dog parks in Paraparaumu and accessed via Gray Avenue. It tucks around and opens up into a wide open space for dogs to run around. A creek runs through the reserve and mature trees border the north boundary creating a picturesque large open space.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Eatwellsmall.png"
			}],
			"Edgewater Reserve": [{
				"Designation": [
					"Greenspace",
					"Dog on leash",
					"Picnic Area",
					"Playground",
					"Toilets"
				],
				"Suburb": "Waikanae",
				"Location": "Fleetwood Grove, Waikanae",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/waikanae/#edge",
				"Blurb": "Information about this park is coming soon..",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Elizabeth Rose Reserve": [{
				"Designation": [
					"Picnic Area",
					"Playground"
				],
				"Suburb": "Paraparaumu",
				"Location": "Langdale Avenue, Paraparaumu",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Paraparaumu/#Elizabeth",
				"Blurb": "This recently upgraded playground is set back from the road for peace of mind with your little pre-schoolers and toddlers. The equipment is mostly suited for exploring little ones with small things to climb. A large picnic table means you can spend the day at the park, relax and enjoy the sunshine!",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Elizabethsmall.png"
			}],
			"Ferndale Drive Park": [{
				"Designation": [
					"Greenspace",
					"Playground",
					"Scenic Walk"
				],
				"Suburb": "Waikanae",
				"Location": "Ferndale Drive, Waikanae",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/waikanae/#ferndale",
				"Blurb": "Information about this park is coming soon.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Gandalf Cresent": [{
				"Designation": [
					"Picnic Area",
					"Playground"
				],
				"Suburb": "Paraparaumu",
				"Location": "Gandalf Cresent, Paraparaumu",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Paraparaumu/#Gandalf",
				"Blurb": "Swings, a tunnel slide and climbing dome make this playground fun for children of all ages. There's a picnic table with a baby swing right next to it so you can relax and watch the kids play.  Along the back boundary line a gate opens onto Te Roto Wetland Reserve.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Gandalfsmall.png"
			}],
			"Greenwood Boulevard": [{
				"Designation": [
					"Greenspace",
					"Tennis Court"
				],
				"Suburb": "Ōtaki",
				"Location": "Greenwood Boulevard, Ōtaki",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/otaki/#greenwood",
				"Blurb": "Information about this park is coming soon.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Haruatai Park": [{
				"Designation": [
					"Basketball Hoop",
					"Greenspace",
					"Picnic Area",
					"Playground",
					"Scenic Walk",
					"Splash Pad",
					"Sports Grounds",
					"Swimming Pool",
					"Toilets"
				],
				"Suburb": "Ōtaki",
				"Location": "Mill Road, Ōtaki",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/haruatai",
				"Blurb": "Home to Ōtaki Pools, Haruatai sports grounds and an awesome playground, Haruatai Park has something for everyone. Haruatai Park playground has Kāpiti’s tallest swing, a keyhole basketball court, picnic tables and toilets. A new splash pad will be open in time for summer. ",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Hookway Grove Reserve": [{
				"Designation": [
					"Picnic Area",
					"Playground",
					"Dog on leash"
				],
				"Suburb": "Paraparaumu",
				"Location": "Hookway Grove, Paraparaumu",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Paraparaumu/#hookway",
				"Blurb": "Hookway Grove Reserve is a playground nestled amongst native bush on Hookway Grove. It's suited for all ages and there's a picnic table so you can relax and enjoy the beautiful surroundings. There's a track scross the creek at the back of the reserve that you can follow all the way to Kaitawa Reserve.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Hookwaysmall.png"
			}],
			"Jim Cooke Memorial Park": [{
				"Designation": [
					"Greenspace",
					"Scenic Walk",
					"Sports Grounds"
				],
				"Suburb": "Waikanae",
				"Location": "Nimmo Avenue, Waikanae",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/waikanae/#Jim",
				"Blurb": "Information about this park is coming soon.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Kaitawa Reserve": [{
				"Designation": [
					"Basketball Hoop",
					"Dog on leash",
					"Greenspace",
					"Playground",
					"Picnic Area",
					"Scenic Walk",
					"Toilets"
				],
				"Suburb": "Paraparaumu",
				"Location": "Kaitawa Cresent, Paraparaumu",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/kaitawa-reserve/",
				"Blurb": "Kaitawa reserve has play equipment, a keyhole basketball court and picnic tables- something to keep the whole family entertained for hours on end. Follow the path down to the Wharemauku Stream to find a flying fox or up the hill to the Paraparaumu water tank for panoramic views of the Kāpiti Coast.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Kena Kena Park": [{
				"Designation": [
					"Greenspace",
					"Sports Grounds"
				],
				"Suburb": "Paraparaumu Beach",
				"Location": "Whyte Street, Paraparaumu Beach",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Paraparaumu/#kena",
				"Blurb": "Kena Kena Park is home to the Paraparaumu Cricket Club. Surrounded by trees and open green space, the park is idyllic, particularly during the summer months. The park has a grass pitch for senior cricket games, cricket nets for practice and the Paraparaumu Cricket Club rooms.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Kenasmall.png"
			}],
			"Kotuku Reserve": [{
				"Designation": [
					"Picnic Area",
					"Playground",
					"Greenspace",
					"Scenic Walk"
				],
				"Suburb": "Paraparaumu",
				"Location": "Kotuku Drive, Paraparaumu",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Paraparaumu/#Kotuku",
				"Blurb": "Kotuku Park is a beautiful open space with multiple access points. Kids can run around while being surrounded by nature and with Kāpiti Island in the background. The playground encourages play for different ages. A ship's wheel, great for imagination play, overlooks the playground and is immersed in the natural environment.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Kotukusmall.png"
			}],
			"Larch Grove Playground": [{
				"Designation": [
					"Greenspace",
					"Playground",
					"Dog on leash"
				],
				"Suburb": "Paraparaumu",
				"Location": "Larch Grove, Paraparaumu",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Paraparaumu/#Larch",
				"Blurb": "Larch Grove Playground runs between Larch Grove and Parakai Street. This playground is bright, fun and suited to young children. There's plenty of grass area to run around or have a picnic, with a path running through between the two streets. It's within walking distance to Coastlands Shopping Town and Coastlands Aquatic Centre.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Larchsmall.png"
			}],
			"Leinster Avenue Reserve": [{
				"Designation": [
					"Greenspace",
					"Picnic Area",
					"Playground"
				],
				"Suburb": "Raumati South",
				"Location": "Leinster Avenue, Raumati South",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Raumati/#Leinster",
				"Blurb": "Set back from the road for peace of mind, Leinster Avenue Reserve is a playground suited to smaller children and toddlers. Swings and small climbing structures encourage exploration while not being too high off the ground! A nice quiet spot tucked away in Raumati South.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Lorna Irene Drive Reserve": [{
				"Designation": [
					"Playground"
				],
				"Suburb": "Raumati South",
				"Location": "Lorna Irene Drive, Raumati South",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Raumati/#Lorna",
				"Blurb": "This small playground is located in an established subdivision with small trees and gardens. It’s suited to toddlers and young children. Two covered bench seats let you enjoy a bit of shade. As  one of the lesser-known playgrounds on the Kāpiti Coast, this is regarded by many as a hidden treasure!",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Maclean Park": [{
				"Designation": [
					"Basketball Hoop",
					"Greenspace",
					"Picnic Area",
					"Playground",
					"Skate Park",
					"Toilets"
				],
				"Suburb": "Paraparaumu Beach",
				"Location": "Marine Parade, Paraparaumu Beach",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/maclean-park/",
				"Blurb": "Marine Gardens is a destination playground on the Kāpiti Coast! This beachfront playground in Raumati Beach is home to a wide range of play equipment including a flying fox! The Marine Gardens splash pad is fun for all ages and a great way to enjoy the sunshine and the water.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Main Street Playground": [{
				"Designation": [
					"Picnic Area",
					"Playground",
					"Toilets"
				],
				"Suburb": "Ōtaki",
				"Location": "Main Street, Ōtaki",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/otaki/#main",
				"Blurb": "Although this playground is small, its location next to the Ōtaki Library and Ōtaki War Memorial Hall makes this playground a real gem. It’s an ideal place to stop for a play or picnic while at the Main Street shops. Enjoy the sunshine on the large bench seats or relax in the shade.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Manawa Avenue Reserve": [{
				"Designation": [
					"Greenspace",
					"Picnic Area",
					"Playground",
					"Dog on leash"
				],
				"Suburb": "Paraparaumu",
				"Location": "Manawa Avenue, Paraparaumu",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Paraparaumu/#Manawa",
				"Blurb": "This reserve has an amazing playground with an abundance of equipment! The path that runs between the two streets is great for buggys and large grass area makes it a fun space for the little ones to run around. There's a lot of equipment for all ages.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/manawasmall.png"
			}],
			"Marere Avenue Reserve": [{
				"Designation": [
					"Greenspace",
					"Picnic Area",
					"Playground",
					"Dog on leash"
				],
				"Suburb": "Paraparaumu",
				"Location": "Atarau Grove, Paraparaumu",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Paraparaumu/#Marere",
				"Blurb": "Nestled between Marere Avenue and Atarau Grove, this reserve is a hidden neighbourhood gem.  Equipment for all ages and abilities means this is a playground to bring the whole family to.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/mareresmall.png"
			}],
			"Marine Gardens": [{
				"Designation": [
					"Greenspace",
					"Minature Railway",
					"Picnic Area",
					"Playground",
					"Splash Pad",
					"Toilets"
				],
				"Suburb": "Raumati",
				"Location": "Garden Road, Raumati",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/marine-gardens",
				"Blurb": "Information about this park is coming soon.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Matai Road Reserve": [{
				"Designation": [
					"Greenspace",
					"Dog on leash",
					"Playground"
				],
				"Suburb": "Raumati",
				"Location": "Matai Road, Raumati",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Raumati/#Matai",
				"Blurb": "This reserve on Matai Road has a playground, a community garden and is home to the Kapiti Arts and Crafts Society. The playground has something for all ages and abilities, with a lot to climb on and swing from! A great playground to visit to build confidence.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Matai Street Reserve": [{
				"Designation": [
					"Basketball Hoop",
					"Greenspace",
					"Playground"
				],
				"Suburb": "Ōtaki",
				"Location": "Matai Street, Ōtaki",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/otaki/#Matai",
				"Blurb": "Follow the path and discover what this park has to offer! Matati Street Reserve is tucked back from the road giving you peace of mind that the kids can run around safely. The keyhole basketball hoop is great for the older kids while the play equipment is suited to the younger crowd.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Matthews Park": [{
				"Designation": [
					"Basketball Hoop",
					"Greenspace",
					"Picnic Area",
					"Playground",
					"Sports Grounds"
				],
				"Suburb": "Raumati South",
				"Location": "Menin Road, Raumati South",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Raumati/#Matthews",
				"Blurb": "Matthews Park is busy all year road. Its close proximity to Kāpiti College means that it’s well used for sport, as a walking route and a place to kick a ball around. Off Menin Road you’ll see the club rooms for the Kāpiti Bears Rugby League Club, a playground and a keyhole basketball court.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Matuhi Street Reserve": [{
				"Designation": [
					"Greenspace",
					"Playground",
					"Sports Grounds"
				],
				"Suburb": "Waikanae",
				"Location": "Matuhi Street, Waikanae",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/waikanae/#Matuhi",
				"Blurb": "Information about this park is coming soon.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Mazengarb Reserve": [{
				"Designation": [
					"Greenspace",
					"Picnic Area",
					"Playground",
					"Sports Grounds",
					"Toilets"
				],
				"Suburb": "Paraparaumu",
				"Location": "Scaifie Drive, Paraparaumu",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/mazengarb-reserve",
				"Blurb": "Information about this park is coming soon.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Memorial Gardens": [{
				"Designation": [
					"Greenspace",
					"Picnic Area",
					"Toilets"
				],
				"Suburb": "Ōtaki",
				"Location": "Main Street, Ōtaki",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/otaki/#Memorial",
				"Blurb": "Memorial Gardens offers a lovely spot to sit and reflect, with bench seats and gardens surrounding the Ōtaki War Memorial. Elm and birch trees create a balance of shade and sunshine. At the rear of the gardens are public toilets and the Ōtaki Plunket building.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Milne Drive Reserve": [{
				"Designation": [
					"Playground"
				],
				"Suburb": "Paraparaumu",
				"Location": "Milne Drive, Paraparaumu",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Paraparaumu/#Milne",
				"Blurb": "Within this quiet neighbourhood you'll find a great partially fenced playground set back from the road made just for little ones. Plenty of seating, a picnic table and grassed area allow for a great family outing. The path leading from the roadside to the playground is great for buggy access, and this park is home to Kāpiti's only climbable giraffe!",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Milnesmall.png"
			}],
			"Otaki Dog Park": [{
				"Designation": [
					"Dog off leash"
				],
				"Suburb": "Ōtaki",
				"Location": "Aōtaki Street, Ōtaki",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/otaki/#dog",
				"Blurb": "Information about this park is coming soon.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Otaihanga Domain": [{
				"Designation": [
					"Dog on leash",
					"Greenspace",
					"Picnic Area",
					"Playground",
					"Scenic Walk",
					"Sports Grounds",
					"Toilets"
				],
				"Suburb": "Otaihanga",
				"Location": "Makora Road, Otaihanga",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/otaihanga-domain/",
				"Blurb": "Head down to Otaihanga Domain for a picnic followed by a walk this weekend! The Domain offers access to both sides of the Waikanae River Track, plenty of picnic areas, a playground, toilets and lots of greenspace- both open and shaded by trees. A beautiful spot for everyone.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Ōtaki Domain": [{
				"Designation": [
					"Greenspace",
					"Sports Grounds"
				],
				"Suburb": "Ōtaki",
				"Location": "Domain Road, Ōtaki",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/otaki-domain",
				"Blurb": "Information about this park is coming soon.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Ōtaki i-Site Playground": [{
				"Designation": [
					"Picnic Area",
					"Playground",
					"Toilets"
				],
				"Suburb": "Ōtaki",
				"Location": "State Highway 1, Ōtaki",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/otaki/#isite",
				"Blurb": "Information about this park is coming soon.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Otaraua Park": [{
				"Designation": [
					"Greenspace",
					"Sports Grounds",
					"Toilets"
				],
				"Suburb": "Otaihanga",
				"Location": "Lancelot Grove, Otaihanga",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Paraparaumu/#Ota",
				"Blurb": "Otaraua Park is Kāpiti’s park to watch. Currently home to Football fields for winter but the long term development options are huge! The park has the potential to provide for the enjoyment of a wide range of recreational and sporting opportunities, as well as having areas for preservation and restoration.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Paraparaumu Domain": [{
				"Designation": [
					"Greenspace",
					"Playground",
					"Sports Grounds"
				],
				"Suburb": "Paraparaumu",
				"Location": "Tutanekai Street, Paraparaumu",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/paraparaumu-domain/",
				"Blurb": "Information about this park is coming soon.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/pramsmall.png"
			}],
			"Pharazyn Avenue Playground": [{
				"Designation": [
					"Basketball Hoop",
					"Greenspace",
					"Picnic Area",
					"Playground"
				],
				"Suburb": "Waikanae Beach",
				"Location": "Pharazyn Avenue, Waikanae Beach",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/waikanae/#Pharazyn",
				"Blurb": "Information about this park is coming soon.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/pharazynsmall.png"
			}],
			"Pohutukawa Park": [{
				"Designation": [
					"Dog on leash",
					"Greenspace",
					"Picnic Area",
					"Playground"
				],
				"Suburb": "Paraparaumu",
				"Location": "Makarini Street, Paraparaumu",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Paraparaumu/#Pohutukawa",
				"Blurb": "Pohutukawa Park offers a massive grassed area to kick a ball around in the summer. The play equipment suits all ages and is spread out so plenty of children can play at once. A great neighbourhood play space!",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Pohutusmall.png"
			}],
			"Queen Elizabeth Park": [{
				"Designation": [
					"Dog on leash",
					"Picnic Area",
					"Scenic Walk",
					"Toilets"
				],
				"Suburb": "Paekākāriki",
				"Location": "Wellington Road, Paekākāriki",
				"Webpage": "http://www.gw.govt.nz/QEP/",
				"Blurb": "Queen Elizabeth Park is spread across 650 hectares of duneland from Paekākāriki to Raumati South. The park has several access points and has plenty of space to enjoy swimming, walking, cycling, horseriding, or picnics. Visit the Tramway Museum, WWII Marines displays and the kahikatea forest remnant.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Regent Drive Reserve": [{
				"Designation": [
					"Picnic Area",
					"Playground",
					"Toilets"
				],
				"Suburb": "Paraparaumu",
				"Location": "Regent Drive, Paraparaumu",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Paraparaumu/#regent",
				"Blurb": "Information about this park is coming soon.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Regentsmall.png"
			}],
			"Sams Way Reserve": [{
				"Designation": [
					"Tennis Court"
				],
				"Suburb": "Raumati South",
				"Location": "Sams Way, Raumati South",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Ramati/#Sams",
				"Blurb": "Sams Way Reserve is located close to the Lorna Irene Playground in Sams Way. There are two tennis courts you can use free of charge.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"San Vito Place Reserve": [{
				"Designation": [
					"Playground"
				],
				"Suburb": "Paraparaumu",
				"Location": "San Vito Place, Paraparaumu",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Paraparaumu/#sanvito",
				"Blurb": "Information about this park is coming soon.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Sanvitosmall.png"
			}],
			"Shotover Grove Reserve": [{
				"Designation": [
					"Picnic Area",
					"Playground"
				],
				"Suburb": "Waikanae",
				"Location": "He Awa Cresent, Waikanae",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/waikanae/shotover",
				"Blurb": "Information about this park is coming soon.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/shotoversmall.png"
			}],
			"Simpson Cresent Reserve": [{
				"Designation": [
					"Greenspace",
					"Playground"
				],
				"Suburb": "Raumati",
				"Location": "Simpson Cresent, Raumati",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Raumati/#Simpson",
				"Blurb": "This reserve has a large grassed area so it's great to run around in. A spider web climbing frame and plenty of things to hang and swing off makes this a great playground for older children. Park benches around the playground area allow you to sit and enjoy the peaceful surroundings.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Tasman Road Reserve": [{
				"Designation": [
					"Greenspace",
					"Playground",
					"Toilets"
				],
				"Suburb": "Ōtaki",
				"Location": "Tasman Road, Ōtaki",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/otaki/#Tasman",
				"Blurb": "Information about this park is coming soon.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Te Atiawa Park": [{
				"Designation": [
					"BMX track",
					"Greenspace",
					"Netball Court",
					"Playground",
					"Softball pitch",
					"Sports Grounds",
					"Tennis Court",
					"Toilets"
				],
				"Suburb": "Paraparaumu Beach",
				"Location": "Percival Road, Paraparaumu Beach",
				"Webpage": "Our-Community/Parks-and-Recreation/parks/te-atiawa-park/",
				"Blurb": "Check out the new playground at Te Ātiawa Park! Spread across Donovan and Percival Roads, Te Ātiawa Park is home to several sports codes. Netball and tennis are held on the newly resurfaced Te Ātiawa Courts, softball, cricket and junior rugby on the fields, and BMX on the limestone track.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/teatiawasmall.png"
			}],
			"Tennis Court Road Reserve": [{
				"Designation": [
					"Basketball Court",
					"Dog off leash",
					"Greenspace",
					"Netball Court",
					"Picnic Area",
					"Playground",
					"Tennis Court",
					"Toilets"
				],
				"Suburb": "Raumati South",
				"Location": "Tennis Court Road, Raumati South",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/tennis-court-road-reserve",
				"Blurb": "Information about this park is coming soon.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Tilley Road Reserve": [{
				"Designation": [
					"Greenspace",
					"Sports Grounds"
				],
				"Suburb": "Paekākāriki",
				"Location": "Tilley Road, Paekākāriki",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/paekakariki/#Tilley",
				"Blurb": "Tilley Road Reserve borders Queen Elizabeth Park and is a great place to kick a ball around. Paekākāriki Sports Club uses the fields for junior football during the winter. The Te Rau o Te Rangi weaving collective meet regularly in their club room at the entrance to Tilley Road Reserve.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Totara Park Playground": [{
				"Designation": [
					"Playground"
				],
				"Suburb": "Ōtaki",
				"Location": "Sue Avenue, Ōtaki",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/otaki/#Totara",
				"Blurb": "Information about this park is coming soon.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Victor Weggery Reserve": [{
				"Designation": [
					"Dog off leash",
					"Basketball Hoop",
					"Greenspace",
					"Picnic Area",
					"Playground",
					"Toilets"
				],
				"Suburb": "Waikanae Beach",
				"Location": "Queens Road, Waikanae Beach",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/waikanae/#victor",
				"Blurb": "Information about this park is coming soon.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/victorsmall.png"
			}],
			"Waikanae North": [{
				"Designation": [
					"Greenspace",
					"Picnic Area",
					"Playground"
				],
				"Suburb": "Waikanae",
				"Location": "Waipunahau Road, Waikanae",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/waikanae/#Waikanae",
				"Blurb": "This reserve is in an up and coming neighbourhood. Newly planted trees will soon grow to create a beautiful space. Charles Flemming Retirement Village is right next door making it a great place for a quiet walk and a great spot to bring the grandkids for a swing or have a picnic.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Waikanae Park": [{
				"Designation": [
					"Dog off leash",
					"Greenspace",
					"Picnic Area",
					"Playground",
					"Skate Park",
					"Sports Grounds",
					"Swimming Pool",
					"Toilets"
				],
				"Suburb": "Waikanae",
				"Location": "Park Avenue, Waikanae",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/waikanae-park",
				"Blurb": "Information about this park is coming soon.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Waikanae Shops Playground": [{
				"Designation": [
					"Playground"
				],
				"Suburb": "Waikanae",
				"Location": "Mahara Place, Waikanae",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/waikanae/#Waikanaeshops",
				"Blurb": "Information about this park is coming soon.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Waikanae War Memorial": [{
				"Designation": [
					"Greenspace",
					"Netball Court",
					"Playground",
					"Tennis Court"
				],
				"Suburb": "Waikanae",
				"Suburb": "Waikanae",
				"Location": "Pehi Kupa Street, Waikanae",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/waikanae/#war",
				"Blurb": "Information about this park is coming soon.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Waimeha Domain": [{
				"Designation": [
					"Picnic Area",
					"Playground",
					"Tennis Court",
					"Toilets"
				],
				"Suburb": "Waikanae Beach",
				"Location": "Tutere Street, Waikanae Beach",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/waimeha-domain",
				"Blurb": "Information about this park is coming soon.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/waimehasmall.png"
			}],
			"Weka Park": [{
				"Designation": [
					"Greenspace",
					"Picnic Area",
					"Playground",
					"Sports Grounds",
					"Dog on leash",
					"Dog off leash"
				],
				"Suburb": "Raumati",
				"Location": "Weka Road, Raumati Beach",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/weka-park",
				"Blurb": "Weka Park's located near Raumati Beach Shopping Village and Raumati Beach School which makes it a great place to stop during school drop off and pickup. It has a playground full of equipment for all ages and abilities and a large sports field. Sit at the picnic tables and watch the kids play.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/imagefiller.png"
			}],
			"Wesley Knight Park": [{
				"Designation": [
					"Greenspace",
					"Dog off leash"
				],
				"Suburb": "Paraparaumu Beach",
				"Location": "Ocean Road, Paraparaumu Beach",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Paraparaumu/#Wesley",
				"Blurb": "Wesley Knight Park is one of two fully-fenced off-leash dog parks in Paraparaumu. You can get to it via Ocean Road or Seaview Road, and there's a double safety gate at each entrance. There are poo bags at the gate if you've forgotten yours - please pick up your dog's poo!",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Wesleysmall.png"
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
			var parkUrl = (parkAttributes.Webpage.indexOf('http') == -1 &&  parkAttributes.Webpage.indexOf('www') == -1) ? domain + parkAttributes.Webpage : parkAttributes.Webpage;
			
			var parkList = [
				'<a class="park-item" href="'+ parkUrl + ' " target="_blank"', hide ? 'style="display: none"' : '' ,'  >',
					'<div class="row">',
						"<div class='well col-md-12' style='background-color: #ffffff; margin-top: 10px; cursor: pointer;'>",
							"<div class='col-md-4'>",
								"<img style='width: 230px; height: 170px;' ",
								"src='" + parkAttributes.Image + "' ",
								"alt='...' class='img-thumbnail'>",
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

				$.each(designations, function (i, designation) {
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

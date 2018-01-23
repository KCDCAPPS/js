window.onload = function() {
		var suburb = '';
		var visibleParks = 0;
		/* UAT ONLY */
		//var domain = "http://uat.kapiticoast.govt.nz.testwin.gdmedia.tv/";
		var domain = "http://www.kapiticoast.govt.nz/";

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
				"Blurb": "Kāpiti’s only ‘Learn to Ride’ track allows young children to bike and scooter around in style within the safety of this unique playground! Bring the older kids to the skate park and then settle down for a picnic. This park is located at the south end of Aōtaki Street in Ōtaki.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/aotakismall.jpg"
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
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Jadesmall.jpg"
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
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/campsmall.jpg"
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
				"Blurb": "Dixie Street Reserve has a playground for all ages with a large pirate ship to explore. There's a great stretch of green space to run around, enjoy a picnic and practice your backyard cricket on the small artificial pitch. A small concrete pad and hoop means you can practice your basketball skills all summer long!",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/dixiesmall.jpg"
			}],
			"Eatwell Reserve": [{
				"Designation": [
					"Dog off leash"
				],
				"Suburb": "Paraparaumu Beach",
				"Location": "Gray Avenue, Paraparaumu Beach",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Paraparaumu/#eatwell",
				"Blurb": "Eatwell Reserve is one of two fenced dog parks in Paraparaumu. Accessed via Gray Avenue, Eatwell Reserve tucks around and opens up into a wide open space for dogs to run around. A creek runs through the reserve and mature trees sit along the northern edge.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Eatwellsmall.jpg"
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
				"Blurb": "Running alongside the Waikanae River and the Waikanae River Track, Edgewater Reserve is a nice place to stop on your walk, have some lunch and play on the swings. There are toilets by the entrance to Fleetwood Grove. This is a dog on leash area.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/edgesmall.jpg"
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
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Elizabethsmall.jpg"
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
				"Blurb": "Ferndale Drive Park has a partially-fenced playground located in a new neighbourhood and set against a backdrop of native planting. There's a climbing rope frame up to a slide for adventurous kids. Behind the playground there's a small walking track that allows you to get close to nature.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/ferndalesmall.jpg"
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
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Gandalfsmall.jpg"
			}],
			"Greenwood Boulevard": [{
				"Designation": [
					"Greenspace",
					"Tennis Court"
				],
				"Suburb": "Ōtaki",
				"Location": "Greenwood Boulevard, Ōtaki",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/otaki/#greenwood",
				"Blurb": "Surrounded by well-established trees, Greenwood Boulevard is a beautiful place to enjoy a game of tennis. The grass area is a great place to sit back and relax and enjoy the peace and quiet that comes with being away from the town centre.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/greenwoodsmall.jpg"
			}],
			"Haruatai Park": [{
				"Designation": [
					"Basketball Hoop",
					"BBQ",
					"Greenspace",
					"Picnic Area",
					"Playground",
					"Scenic Walk",
					"Splash Pad",
					"Sports Grounds",
					"Swimming Pool",
					"Tennis Court",
					"Toilets"
				],
				"Suburb": "Ōtaki",
				"Location": "Mill Road, Ōtaki",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/haruatai",
				"Blurb": "Haruatai Park is home to Ōtaki Pools, Haruatai Playground and Haruatai sports fields.  As you enter the park there's a keyhole basketball court, picnic tables with shade sails, and one of Kāpiti's newest playgrounds. The playground is home to Kāpiti's tallest swing and other super fun equipment for all ages and abilities.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/haruataismall.jpg"
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
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Hookwaysmall.jpg"
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
				"Blurb": "Jim Cooke Memorial Park is home to Waikanae Football Club. Currently a training only field, but soon to reopen as a park to be played on during winter weekend play. Follow the path down Nimmo Avenue and join up with the Waikanae side of the Waikanae River track.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/jimsmall.jpg"
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
				"Blurb": "Kaitawa Reserve has a playground, a keyhole basketball court, picnic tables and plenty of native planting - something to keep the whole family entertained for hours on end. Follow the path down to the Wharemauku Stream to find a flying fox or explore the reserve and all its natural beauty!",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/kaitawasmall.jpg"
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
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/kenasmall.jpg"
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
				"Blurb": "Kotuku Park is a beautiful open space with multiple access points. The expansive grass area means the kids can run around while being surrounded by nature and viewing Kāpiti Island in the background. The playground encourages play on several levels for different ages -great for imaginative play.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Kotukusmall.jpg"
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
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Larchsmall.jpg"
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
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/leinstersmall.jpg"
			}],
			"Lorna Irene Drive Reserve": [{
				"Designation": [
					"Playground"
				],
				"Suburb": "Raumati South",
				"Location": "Lorna Irene Drive, Raumati South",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Raumati/#Lorna",
				"Blurb": "This small playground is located in an established subdivision with small trees and gardens. It’s suited to toddlers and young children. Two covered bench seats let you enjoy a bit of shade. As  one of the lesser-known playgrounds on the Kāpiti Coast, this is regarded by many as a hidden treasure!",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/lornasmall.jpg"
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
				"Blurb": "Kāpiti has grown up with Maclean Park and it’s a great place for the whole family. Right on the beach and across the road from the local shops and cafes, Maclean Park contains a newly revamped playground, public toilets, a skate park, basketball hoop and plenty of space to have a picnic.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/macleansmall.jpg"
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
				"Blurb": "Although this playground is small, its location next to the Ōtaki Library and Ōtaki War Memorial Hall makes it a real gem. It's an ideal place to stop for a play or a picnic while at the Main Street shops. Enjoy the sunshine on the large bench seats.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/mainsmall.jpg"
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
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/manawasmall.jpg"
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
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/mareresmall.jpg"
			}],
			"Marine Gardens": [{
				"Designation": [
					"BBQ",
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
				"Blurb": "Marine Gardens is a destination playground on the Kāpiti Coast! This beachfront playground in Raumati Beach is home to a wide range of play equipment including a flying fox! The Marine Gardens splash pad is fun for all ages and a great way to enjoy the sunshine and the water.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/marinesmall.jpg"
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
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/mataismall.jpg"
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
				"Blurb": "Matai Street Reserve is tucked back from the road giving you peace of mind that the kids can run around safely. The key hole basketball hoop is great for the older kids while the play equipment's suited to the younger crowd.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/mataistreetsmall.jpg"
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
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/mattsmall.jpg"
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
				"Blurb": "This playground sits against a hill in the new 'Kāpiti Views' neighbourhood. It's suited to the younger crowd with a lot of equipment to build confidence. There are swings, including one next to the picnic table. Climb the hill to the top of the tunnel slide for a fun slide down.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/kapitismall.jpg"
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
				"Blurb": "This large reserve is home the Mazengarb Sports Complex, a playground, the Coastlands Kapiti Sports Turf and event facility, the Paraparaumu Croquet Club, Kāpiti Gymsports and many sports. The playground is set slightly down from the road with picnic tables and heaps of equipment for all ages, including a flying fox.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/mazsmall.jpg"
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
				"Blurb": "Memorial Gardens offers a lovely spot to sit and reflect, with bench seats and gardens surrounding the Ōtaki War Memorial. Elm and birch trees create a balance of shade and sunshine. At the rear of the gardens are public toilets and in the Ōtaki Plunket building.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/memorialsmall.jpg"
			}],
			"Milne Drive Reserve": [{
				"Designation": [
					"Playground"
				],
				"Suburb": "Paraparaumu",
				"Location": "Milne Drive, Paraparaumu",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Paraparaumu/#Milne",
				"Blurb": "Within this quiet neighbourhood you'll find a great partially fenced playground set back from the road made just for little ones. Plenty of seating, a picnic table and grassed area allow for a great family outing. The path leading from the roadside to the playground is great for buggy access, and this park is home to Kāpiti's only climbable giraffe!",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Milnesmall.jpg"
			}],
			"Otaki Dog Park": [{
				"Designation": [
					"Dog off leash"
				],
				"Suburb": "Ōtaki",
				"Location": "Aōtaki Street, Ōtaki",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/otaki/#dog",
				"Blurb": "This is Kāpiti's newest (and some might say the best) dog park! Fully fenced, double gate entrance, a drinking fountain and soon to be full of all kinds of fun obstacles for dogs to enjoy this dog park is sure to be a hit with your pooch!",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/dogsmall.jpg"
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
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/otasmall.jpg"
			}],
			"Ōtaki Domain": [{
				"Designation": [
					"Greenspace",
					"Sports Grounds"
				],
				"Suburb": "Ōtaki",
				"Location": "Domain Road, Ōtaki",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/otaki-domain",
				"Blurb": "Ōtaki Domain is the proud home to the Rahui Sports Club and Whiti Te Ra League Club. There are netball courts along Domain Road which are available for you to use, but it pays to book if you want to have a team practice over winter. The courts are used for tennis in the summer.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/otakidomsmall.jpg"
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
				"Blurb": "Located on the main highway, this playground is a spread out over a large grassed area. You'll find the traditional tractor, a basket swing and large picnic tables where you can enjoy a bite to eat. A great place to stop if you're visiting the shops.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/isitesmall.jpg"
			}],
			"Otaraua Park": [{
				"Designation": [
					"Greenspace",
					"Scenic Walk",
					"Sports Grounds",
					"Toilets"
				],
				"Suburb": "Otaihanga",
				"Location": "Lancelot Grove, Otaihanga",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Paraparaumu/#Ota",
				"Blurb": "Otaraua Park is Kāpiti's park to watch. It's currently home to football fields in winter, and the long-tem development options are huge! The park has potential to provide for a wide range of recreational and sporting opportunities, as well as having areas for preservation and restoration.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/otarauasmall.jpg"
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
				"Blurb": "The entrance to Paraparaumu Domain on the corner of Aorangi and Tutanekai Street is framed by the Paraparaumu War Memorial gates. Rugby, twilight soccer, cricket and athletics are played at the domain throughout the year. The playground is on Aorangi Road and there are a lot of fun things for little ones to play on.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/pramsmall.jpg"
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
				"Blurb": "This bright, fun playground is located on the corner of Pharazyn Avenue and Barbara Way. The big open grass space provides plenty of room to run around while enjoying the peacefulness of this quiet neighbourhood. There's a mix of play equipment here - a basketball hoop, swings and plenty of ways to explore and climb.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/pharazynsmall.jpg"
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
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Pohutusmall.jpg"
			}],
			"Pukekawa Park": [{
				"Designation": [
					"Dog off leash",
					"Greenspace",
					"Scenic Walk",
				],
				"Suburb": "Waikanae",
				"Location": "Greenaway Road, Waikanae",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Waikanae/#pukekawa",
				"Blurb": "Pukekawa Park is a great open space close to the Waikanae River. Head through the kissing gate and into the park to a beautiful grass area with mature trees for shade. The short distance to the Waikanae River Track makes this a great place to stop and let your dog off leash.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/pukesmall.jpg"
			}],
			"Queen Elizabeth Park": [{
				"Designation": [
					"BBQ",
					"Dog on leash",
					"Picnic Area",
					"Scenic Walk",
					"Toilets"
				],
				"Suburb": "Paekākāriki",
				"Location": "Wellington Road, Paekākāriki",
				"Webpage": "http://www.gw.govt.nz/QEP/",
				"Blurb": "Queen Elizabeth Park is spread across 650 hectares of duneland from Paekakariki to Raumati South. The park has several access points and plenty of space to enjoy swimming, walking, cycling, horseriding, or picnics. Visit the Tramway Museum, WWII Marines displays and the kahikatea forest remnant.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/qep.jpg"
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
				"Blurb": "A beautiful place to have a picnic on a sunny day. Situated in a quiet neighbourhood, there's a large grassed area to sit and relax as well as picnic tables and seating. A path loops around the grassed area. The playground includes swings and equipment for young children.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/Regentsmall.jpg"
			}],
			"Sams Way Reserve": [{
				"Designation": [
					"Tennis Court"
				],
				"Suburb": "Raumati South",
				"Location": "Sams Way, Raumati South",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Ramati/#Sams",
				"Blurb": "Sams Way Reserve is located close to the Lorna Irene Playground in Sams Way. There are two tennis courts you can use free of charge.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/samsmall.jpg"
			}],
			"San Vito Place Reserve": [{
				"Designation": [
					"Playground"
				],
				"Suburb": "Paraparaumu",
				"Location": "San Vito Place, Paraparaumu",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/Paraparaumu/#sanvito",
				"Blurb": "This playground is nestled within the San Vito Place cul-de-sac and has equipment suited to younger children. There's plenty for the little ones to practice climbing skills on and seating to relax and enjoy this quiet suburban playground.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/sansmall.jpg"
			}],
			"Shotover Grove Reserve": [{
				"Designation": [
					"Picnic Area",
					"Playground"
				],
				"Suburb": "Waikanae",
				"Location": "He Awa Cresent, Waikanae",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/waikanae/shotover",
				"Blurb": "Shotover Grove is an expansive playground located on the corner of Shotover Grove and He Awa Crescent. There are baby swings, a small slide and plenty of equipment for the little ones as well as heaps to climb on and swings for those who like a bit of a challenge!",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/shotoversmall.jpg"
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
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/simpsonsmall.jpg"
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
				"Blurb": "Tasman Road Reserve is home to an awesome beach-themed playground! There’s a pirate ship to explore and climb one, and it’s set back from the road so the kids run around safely. There’s a small car park for off-street parking with public toilets and plenty of space to have a picnic on the grass.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/tasmansmall.jpg"
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
				"Blurb": "Te Atiawa Park covers a large area and spans many sports codes - softball, cricket, rugby, netball and tennis! On the corner of Percival Road and Donovan Road you'll find the Kāpiti BMX track and a newly refreshed playground. There’s something for everyone.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/teatiawasmall.jpg"
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
				"Blurb": "Tennis Court Road Reserve (Kawatiri Reserve) is one of the larger play spaces of in Raumati South. The Reserve has a large grass area, a playground, the Raumati South Memorial Hall and tennis courts. The playground has fun equipment for all ages and there’s plenty of space to have a picnic.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/tennissmall.jpg"
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
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/tilleysmall.jpg"
			}],
			"Totara Park Playground": [{
				"Designation": [
					"Playground"
				],
				"Suburb": "Ōtaki",
				"Location": "Sue Avenue, Ōtaki",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/otaki/#Totara",
				"Blurb": "On the corner of Sue Avenue and Moy Place, Totara Park Playground is great for all ages. There's equipment for younger children with a small slide and see saws and plenty for the older kids to climb, and swing from! A nice quiet neighbourhood playground just off the main highway.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/totarasmall.jpg"
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
				"Blurb": "Next to Waimeha Lagoon, Victor Weggery Reserve is an expanse of green space with pockets of play equipment for all ages and abilities to enjoy. The sand and sand play equipment will grow their imaginations. Get your mates together and practise with the basketball hoop or kick a ball around on the grass.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/victorsmall.jpg"
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
				"Blurb": "This reserve is in an up-and-coming neighbourhood. Newly planted trees will soon grow to create a beautiful space. Charles Flemming Retirement Village is right next door making it a great place for a quiet walk and a great spot to bring the grandkids for a swing or have a picnic when they visit.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/northsmall.jpg"
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
				"Blurb": "This is a large park with multiple areas and is home to a range of sports throughout the year. There is a small skate park and playground with something to do for all ages. The open green space and picnic tables make this a great spot to enjoy with the whole family.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/waismall.jpg"
			}],
			"Waikanae Shops Playground": [{
				"Designation": [
					"Playground"
				],
				"Suburb": "Waikanae",
				"Location": "Mahara Place, Waikanae",
				"Webpage": "Our-District/Our-Community/Parks-and-Recreation/parks/waikanae/#Waikanaeshops",
				"Blurb": "Located in the middle of the Waikanae shopping centre on Mahara Place, this playground is a great spot to let the kids play and to take a break from running errands. It's set in a courtyard with seating, shade providing trees and has a friendly atmosphere. Toilets can be found just around the corner outside Mahara Gallery.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/maharasmall.jpg"
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
				"Blurb": "Different varieties of rose gardens are scattered around this park along with plenty of seating. Have a picnic on the grass or the bench seats and bring the kids for a play on the playground. There's plenty of shade created by the many trees throughout the park and some shaded seating underneath a pergola.",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/rosesmall.jpg"
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
				"Blurb": "You can get to Waikanae Beach through a number of access ways from Waimeha Domain. There’s heaps to do here; a colourful playground with equipment for different ages; picnic areas; a volleyball net; tennis courts; and plenty of open green space to run around and enjoy being close to the beach",
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/waimehasmall.jpg"
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
				"Image": "/globalassets/our-district/our-community/parks-and-recreation/wekasmall.jpg"
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

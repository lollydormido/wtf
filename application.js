	var greetings = ['Listen to some fucking ', 'Bet you never fucking heard this track by ', 'Your fucking ears will be graced by ', 'The fucking music gods have brought you ', 'Muh fucking Mozart is channeled through ', 'Your life was fucking incomplete without ', 'The music Gods have fucking brought you '];
	
	var allGreetings = greetings.length;
	var whichGreeting = Math.floor(allGreetings * Math.random());
	var listenTo = function () {
		document.getElementById("listenTo").innerHTML = greetings[whichGreeting];
	};
	
	SC.initialize({
		client_id: "7kIeyF5f2ETFo1fEWKwNQ",
	});
	
	var track;
		
	var getTrackHot = function() {
		SC.get("/tracks?filter=public&order=hotness", {limit: 50}, function(tracks) {
			var results = tracks.length;
			var random = Math.floor(results*Math.random());
			console.log(random);
			track = tracks[random];
			var soundCloudUser = track.user.username;
			var soundCloudUserUrl = track.user.permalink_url;
			document.getElementById("username").innerHTML = (' ' + '<a href="' + soundCloudUserUrl + '">' +  soundCloudUser+ '</a>');
			SC.oEmbed(track.uri, document.getElementById("track"));
			});
	};
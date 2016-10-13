// requires the keys
var keys = require('./keys.js');
var fs = require('fs');
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

var action = process.argv[2];
var value = process.argv[3];


function liriFn(action, value){

	switch(action){
		case 'my-tweets':
		tweets();
		break;

		case 'spotify-this-song':
		spotiFy();
		break;

		case 'movie-this':
		movieFind();
		break;

		case 'do-what-it-says':
		doWhat();
		break;
	};
};



function doWhat() {

	 fs.readFile("random.txt", "utf8", function(error, data) {
		var textArray = data.split(',');

		action = textArray[0];
		value = textArray[1];

		liriFn(action, value);
	 });
};



function tweets(){

	var client = new Twitter(
		keys.twitterKeys
		);

	var parameters = {
		screen_name : 'jonathan_jacks3',
		count : 20
		};

 	client.get('statuses/user_timeline', parameters, function(error, tweets, response){
  		if (!error){
    		for (var i=0;i<20;i++){
    			console.log(tweets[i].text+"  -----  "+tweets[i].created_at);
    			console.log("\n----------------------------------\n");
			}		
	 	}else{
	 		console.log("There is an error!");
	 		console.log(response);
	 	}		
	}); 	
};


function spotiFy(){

	if (process.argv[3]!=null){
		spotify.search({ type: 'track' , query: value }, function(err, data) {
			    if (err) {
			        console.log('There is an error!' + err);
			        return;
			    	}
		    		for(i=0; i<data.tracks.items.length; i++){
		    			console.log("Artist: "+data.tracks.items[i].artists[0].name);
	        			console.log("Song: "+data.tracks.items[i].name);
	        			console.log("Here's a Preview: "+data.tracks.items[i].preview_url);
	        			console.log("Album: "+data.tracks.items[i].album.name);
						console.log("\n-----------------------------------------\n");
		    		}
		});    		
	}	
		else if (process.argv[3]==null){
				spotify.search({ type: 'track' , query: 'the sign' }, function(err, data) {
					if (err) {
						console.log('There is an error! ' + err);
						return;
						}       
				        console.log("Artist: "+data.tracks.items[6].artists[0].name);
				        console.log("Song: "+data.tracks.items[6].name);
				        console.log("Here's a Preview: "+data.tracks.items[6].preview_url);
				        console.log("Album: "+data.tracks.items[6].album.name);
						console.log("\n-----------------------------------------\n");
				});
			}
};


function movieFind(){
 	var queryURL = "http://www.omdbapi.com/?t="+value+"&y=&plot=short&tomatoes=true&r=json";

 		request(queryURL, function (error, response, body){
	  		if (!error && response.statusCode == 200){
                console.log("Title -  " +JSON.parse(body)["Title"]);
                console.log("Release Year -  " +JSON.parse(body)["Year"]);
                console.log("IMDB Rating -  " +JSON.parse(body)["imdbRating"]);
                console.log("Language -  " +JSON.parse(body)["Language"]);                
                console.log("Country -  " +JSON.parse(body)["Country"]);
                console.log("Plot - " +JSON.parse(body)["Plot"]);
                console.log("Actors -  " +JSON.parse(body)["Actors"]);
                console.log("Rotten Tomatoes Rating -  " +JSON.parse(body)["tomatoRating"]);
				console.log("Rotten Tomatoes URL -  " +JSON.parse(body)["tomatoURL"]);
	    		return;
	  		}else{console.log(error);
				}
		});


	if (process.argv[3]==null){
		request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&tomatoes=true&r=json", function (error, response, body){
	  		if (!error && response.statusCode == 200){
                console.log("Title -  " +JSON.parse(body)["Title"]);
                console.log("Release Year -  " +JSON.parse(body)["Year"]);
                console.log("IMDB Rating -  " +JSON.parse(body)["imdbRating"]);
                console.log("Language -  " +JSON.parse(body)["Language"]);                
                console.log("Country -  " +JSON.parse(body)["Country"]);
                console.log("Plot - " +JSON.parse(body)["Plot"]);
                console.log("Actors -  " +JSON.parse(body)["Actors"]);
                console.log("Rotten Tomatoes Rating -  " +JSON.parse(body)["tomatoRating"]);
				console.log("Rotten Tomatoes URL -  " +JSON.parse(body)["tomatoURL"]);
	    		return;
			}
		});
	};				
};


liriFn(action, value);
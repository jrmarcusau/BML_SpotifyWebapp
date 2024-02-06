Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/
	// sleep time expects milliseconds
	function sleep (time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}
	// Return the artists of a song
	function array_to_string(a)
	{
		myString = "";
		for (var i = 0; i < a.length-1 ; i++) 
		{
		   myString += a[i].name+', ';
		}
		myString += a[a.length-1].name;
		return myString;
	}
	
	
	// Usage!
	jQuery.getScript("https://greert.github.io/files/key_lab.js", function(){
		Qualtrics.SurveyEngine.setEmbeddedData( 'accessToken', accessToken);
		//alert('acess token ' + accessToken);
	});
		var window = this;
		window.disableNextButton();
		var hidden_fields = jQuery("input[type='text']");
		found = false;
		found_ez = false;
		
		window.questionclick = function(event,element)
		{
			//Object.getOwnPropertyNames(rec);
			//alert(Object.getOwnPropertyNames(element.type));
			//alert(element.type);
			if (element.type == 'button')
			{
				found = false;
				//window.disableNextButton();
				var elements = jQuery('input[type=text]');
				//alert(elements[0].value);
				//var accessToken='BQCL2FA6MEQ4wbC6QvGt3QMpkNWvtQ4HCnWc1YzHb1Fts2AyJAIQ-JPRzJZp78gSKywMkHkBPDmvRX0Qgu6q3XNbf5LXD073zvk5QHhrioE5VRhUj4U97TYJE87s2WuLqf2zyN6ZtGT3_czGhogDkkg-hySQ_VHA8De57z7vnqkM_yS8kxt9rHsxDyCP5QGbYwF4AoF3KGziuUR-WvAgUfchv6zQPLMuA59gfv6jyZzkS-gLCKzM7-7xeTYy-cF23PCArEmVuZ6I_4GThpF2EUL6Qtw';
				var myInput1 = elements[0].value;
				//alert(myInput1);
				var myInput2 = myInput1.replace(',', '');
				var myInput3 = myInput2.replace(':', '');
				var myInput4 = myInput3.replace(' by ', ' ');
				var myInput = myInput4.replace(/"/g,"");
				//alert(myInput)
				
				jQuery.ajax({
					url: 'https://api.spotify.com/v1/search?q=' + myInput + '&type=track&limit=1',
					type: 'GET',
					headers: {
						'Authorization' : 'Bearer ' + accessToken
					},
					success: function(song) {
						//var json = jQuery.parseJSON(data);
						found = false;
						found_dressing = false;
						alert('The song found on Spotify is ' + song.tracks.items[0].name +' by '+ array_to_string(song.tracks.items[0].artists)  +'.');
						rel_date = parseInt(song.tracks.items[0].album.release_date.split("-")[0]);
						pop = song.tracks.items[0].popularity;
						min_pop = 80;
						//alert(rel_date+' '+pop);
						myUri = song.tracks.items[0].uri;
						shortUri = myUri.split(":")[2];
						
						Qualtrics.SurveyEngine.setEmbeddedData( 'shortUri1', shortUri);
						Qualtrics.SurveyEngine.setEmbeddedData( 'pop1', pop);
						Qualtrics.SurveyEngine.setEmbeddedData( 'rel_date1',rel_date);

						jQuery.ajax({
							url:'https://api.spotify.com/v1/audio-features/' + shortUri,
							type: 'GET',
							headers: {
								'Authorization' : 'Bearer ' + accessToken
							},
							success: function(song) {
								//var json = jQuery.parseJSON(data);
								valence = song.valence;
								arousal = song.energy;
								//alert('valence ' + valence + ' arousal ' + arousal);
								min_ar = Math.max(arousal-.15,.01);
								max_ar = Math.min(arousal+.15,.99);
								min_val = Math.max(valence-.15,.01);
								max_val = Math.min(arousal+.15,.99);
								Qualtrics.SurveyEngine.setEmbeddedData( 'arousal1', arousal);
								Qualtrics.SurveyEngine.setEmbeddedData( 'valence1', valence);


								//alert('min_ar ' + min_ar);
							},
							async: false
						});
						
						//no dressing
						jQuery.ajax({
									url:'https://api.spotify.com/v1/recommendations?limit=50&seed_tracks='+shortUri,
									type: 'GET',
									headers: {
										'Authorization' : 'Bearer ' + accessToken
									},
									success: function(song) {
										//var json = jQuery.parseJSON(data);
										//pop2 = song.tracks.items[0].popularity;
										
										
										
										//TODO: make new rec array
										
										rec_array = [];
										song.tracks.forEach(function(element)
										{
											temp_rel = element.album.release_date.split("-")[0]
											if (Math.abs(temp_rel-rel_date)<5)
											{
												rec_array.push(element.id)
												//alert('here!');
												//alert('temp_rel ' + temp_rel);
												//alert('rel_date ' + rel_date);
											}
										});
										
										
										
										//alert('num_recs from years ' + rec_array.length);
										if ( rec_array.length > 9)
										{
											//alert('rec_array before: '+ rec_array)
											rec_array2 = new Array(rec_array[0],rec_array[1],rec_array[2],rec_array[3],rec_array[4],rec_array[5],rec_array[6],rec_array[7],rec_array[8],rec_array[9]);

											rec11 = 'https://open.spotify.com/embed/track/'+rec_array[0];
											rec12 = 'https://open.spotify.com/embed/track/'+rec_array[1];
											rec13 = 'https://open.spotify.com/embed/track/'+rec_array[2];
											rec14 = 'https://open.spotify.com/embed/track/'+rec_array[3];
											rec15 = 'https://open.spotify.com/embed/track/'+rec_array[4];
											rec16 = 'https://open.spotify.com/embed/track/'+rec_array[5];
											rec17 = 'https://open.spotify.com/embed/track/'+rec_array[6];
											rec18 = 'https://open.spotify.com/embed/track/'+rec_array[7];
											rec19 = 'https://open.spotify.com/embed/track/'+rec_array[8];
											rec110 = 'https://open.spotify.com/embed/track/'+rec_array[9];
											
											
											//alert('rec11 '+rec11);
											Qualtrics.SurveyEngine.setEmbeddedData('rec11',rec11);
											Qualtrics.SurveyEngine.setEmbeddedData('rec12',rec12);
											Qualtrics.SurveyEngine.setEmbeddedData('rec13',rec13);
											Qualtrics.SurveyEngine.setEmbeddedData('rec14',rec14);
											Qualtrics.SurveyEngine.setEmbeddedData('rec15',rec15);
											Qualtrics.SurveyEngine.setEmbeddedData('rec16',rec16);
											Qualtrics.SurveyEngine.setEmbeddedData('rec17',rec17);
											Qualtrics.SurveyEngine.setEmbeddedData('rec18',rec18);
											Qualtrics.SurveyEngine.setEmbeddedData('rec19',rec19);
											Qualtrics.SurveyEngine.setEmbeddedData('rec110',rec110);
									
											
											Qualtrics.SurveyEngine.setEmbeddedData('recarray1',rec_array2);
											Qualtrics.SurveyEngine.setEmbeddedData('shortUri1','https://open.spotify.com/embed/track/'+shortUri);

											//alert('Recommendations worked without additional parameters. Heres the rec: spotify:track:'+rec_array[0]);
											found_dressing = true;
											alert('You may proceed by clicking the red arrow if this artist and title is correct')
											window.enableNextButton();
											found = true;
											//alert('num_recs with no dressing is greater than 3!');
										}
										
										else
										{
											//alert('num_recs is less than 3! Please select another song');
											window.disableNextButton();
											found = false;
										}
										
										
										
										//Make the playlist!




										rec11 = Qualtrics.SurveyEngine.getEmbeddedData('rec11');

									},
									async: false


								});
						
						//dressing
						jQuery.ajax({
									url:'https://api.spotify.com/v1/recommendations?limit=50&seed_tracks='+shortUri+'&min_energy='+min_ar+'&max_energy='+max_ar+'&min_popularity='+min_pop+'&min_valence='+min_val+'&max_valence='+max_val,
									type: 'GET',
									headers: {
										'Authorization' : 'Bearer ' + accessToken
									},
									success: function(song) {
										//var json = jQuery.parseJSON(data);
										//pop2 = song.tracks.items[0].popularity;
										
										rec_array = [];
										//alert('num_recs from years before ' + rec_array.length);
										song.tracks.forEach(function(element)
										{
											temp_rel = element.album.release_date.split("-")[0]
											if (Math.abs(temp_rel-rel_date)<5)
											{
												rec_array.push(element.id)
												//alert('here!');
												//alert('temp_rel ' + temp_rel);
												//alert('rel_date ' + rel_date);
											}
										});
										
										
										
										//alert('num_recs from years ' + rec_array.length);
										if (rec_array.length > 9)
										{
											//alert('rec_array dressing: '+ rec_array)
											rec_array2 = new Array(rec_array[0],rec_array[1],rec_array[2],rec_array[3],rec_array[4],rec_array[5],rec_array[6],rec_array[7],rec_array[8],rec_array[9]);

									

										
											
											rec11 = 'https://open.spotify.com/embed/track/'+rec_array[0];
											rec12 = 'https://open.spotify.com/embed/track/'+rec_array[1];
											rec13 = 'https://open.spotify.com/embed/track/'+rec_array[2];
											rec14 = 'https://open.spotify.com/embed/track/'+rec_array[3];
											rec15 = 'https://open.spotify.com/embed/track/'+rec_array[4];
											rec16 = 'https://open.spotify.com/embed/track/'+rec_array[5];
											rec17 = 'https://open.spotify.com/embed/track/'+rec_array[6];
											rec18 = 'https://open.spotify.com/embed/track/'+rec_array[7];
											rec19 = 'https://open.spotify.com/embed/track/'+rec_array[8];
											rec110 = 'https://open.spotify.com/embed/track/'+rec_array[9];
										
											
											//alert('rec11 '+rec11);
											Qualtrics.SurveyEngine.setEmbeddedData('rec11',rec11);
											Qualtrics.SurveyEngine.setEmbeddedData('rec12',rec12);
											Qualtrics.SurveyEngine.setEmbeddedData('rec13',rec13);
											Qualtrics.SurveyEngine.setEmbeddedData('rec14',rec14);
											Qualtrics.SurveyEngine.setEmbeddedData('rec15',rec15);
											Qualtrics.SurveyEngine.setEmbeddedData('rec16',rec16);
											Qualtrics.SurveyEngine.setEmbeddedData('rec17',rec17);
											Qualtrics.SurveyEngine.setEmbeddedData('rec18',rec18);
											Qualtrics.SurveyEngine.setEmbeddedData('rec19',rec19);
											Qualtrics.SurveyEngine.setEmbeddedData('rec110',rec110);
											
											//alert('rec11 two!!  '+rec11);
											//alert('rec12 two!!  '+rec12);
											//alert('rec13 two!!  '+rec13);
											
											
											//hh = Qualtrics.SurveyEngine.getEmbeddedData('rec12');
											
											//alert('hh ' + hh);
											
											Qualtrics.SurveyEngine.setEmbeddedData('recarray1',rec_array2);
											Qualtrics.SurveyEngine.setEmbeddedData('shortUri1','https://open.spotify.com/embed/track/'+shortUri);
											if(!(found_dressing))
											{
												alert('You may proceed by clicking the red arrow if this artist and title is correct')
											}
											//alert('Recommendations worked by year with parameters provided. Heres the first rec: spotify:track:'+rec_array[0]);
											window.enableNextButton();
											found = true;
											//alert('num_recs is greater than 3!');
										}
										
										else
										{
											if(!(found))
											{
												alert('We did not find enough information about this song to proceed. Please choose another song instead.');
											}
										}
										
										
										
										//Make the playlist!




										rec11 = Qualtrics.SurveyEngine.getEmbeddedData('rec11');
			
									},
									async: false


								});

					},
					error: function(xhr, status, error){
						alert("Error!" + xhr.status);
					},
					async: false,
					complete: function(){
						//alert(found);
							if(!found){
								alert('We did not find a result with this input on Spotify.');
								window.disableNextButton();
							}	

					}
				});

				if(found)
				{
					window.enableNextButton();
				}
				if(!found){
					alert('We did not find the artist ' + artist + ' on Spotify.');
				}





				}

		}



});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/

});




Qualtrics.SurveyEngine.addOnPageSubmit(function()
{
	

});
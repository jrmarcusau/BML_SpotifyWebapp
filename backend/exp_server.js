const express = require('express');
const multer = require('multer');
const fs = require('fs');
const querystring = require('querystring');
var request = require('request');
const Papa = require('papaparse');
//const Excel = require('excel.js');
const { type } = require('os');

const app = express();
app.use(express.json())
const port = 3000
//changed this to 3000 rather than 5000
const path = require('path');
const uploadDir = path.join(__dirname, 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

app.post('/api/endpoint1', (req, res) => {
    const data = 0.632;
    res.json({result: data});
});


// Landing page route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/landing.html'));
});

// Main page route
app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/about.html'));
})

app.get('/about1', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/about.html'));
}) 

app.get('/about2', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/about2.html'));
}) 

app.get('/alt', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/alt.html'));
})

app.get('/loginpage', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});


app.get('/choice', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/choice.html'))
})

// Exit page route
app.get('/exit', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/exit.html'))
});

app.use(express.static(path.join(__dirname, '../frontend')));



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});

//file io
const upload = multer({ storage: storage });

//file io
// Input: a file that the user uploads
// Output: a json with song name, artist name, energy, and valence (energy and valence not used)
app.post('/upload', upload.single('fileInput'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }

    const csvFilePath = req.file.path;

    try {
        const csvFile = fs.readFileSync(csvFilePath, 'utf8');

        Papa.parse(csvFile, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const formattedData = results.data.map(row => ({
                    name: row.song,
                    artist: row.artist,
                    energy: row.energy,
                    valence: row.valence
                }));

                // Delete the file after processing to save storage space
                fs.unlinkSync(csvFilePath);

                res.json({ success: true, message: 'File processed!', data: formattedData });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error processing file.' });
    }
});

//Processing multiple songs at once
// Input: a list of songs and a list of delta_features, which are used for generating recommendations
// Output: A success if there is no error
app.post('/multiprocess', async (req, res) => {
    console.log("multiprocess");
    const song_list = req.body.song_list;
    const delta_list = req.body.delta_list;
    //process delta_list to features

    console.log(song_list);
    console.log(delta_list);

    for (let i = 0; i < song_list.length; i++) {
        let song = song_list[i];
        var songInfo = await checkSongArtist(token, song.name, song.artist);
        var songId = songInfo.tracks.items[0].id;
        origInfo.song = songInfo.tracks.items[0].name;
        origInfo.artist = songInfo.tracks.items[0].artists[0].name;
        origFeatures = await getFeatures(token, songId);
        var adjFeatures = await adjustFeatures(origFeatures, delta_list);
        var result = await getRecs(token, songId, adjFeatures, delta_list.numResults);
        var reser = await recommendationSnapshot();
    }

    console.log("done multiprocess");
    res.json({success: true});
})


var token;  
const clientID = 'e6f9d062524b4bbc91e48d1f62f5bee7';
const clientSecret = 'aa0701813c2044e8a208361f2b6eb12b';


//post sign in
var redirect_uri = 'http://localhost:3000/callback';

// Generate a random string
// Input: a length
// Output: a string of random numbers and letters with that length
function generateRandomString(length) {
    const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    
    for (let i = 0; i < length; i++) {
        randomString += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    
    return randomString;
}

// TODO: Deprecate, potentially
// Login function
// Input: None
// Output: None, this redirects to a Spotify authorize
app.get('/login', function(req, res) {

    var state = generateRandomString(16);
    var scope = 'user-read-private user-read-email';
    
    console.log("i am in /login");
    console.log(redirect_uri);
    res.redirect('https://accounts.spotify.com/authorize?' + 
        querystring.stringify({
            response_type: 'code',
            client_id: clientID,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        })
    );

});

// TODO: Deprecate, potentiall
// Sign in function
// Input: None
// Output: Redirects to the song input page after authenticating the user

app.get('/callback', function(req, res) {
    console.log("calling back");
    var code = req.query.code || null;
    var state = req.query.state || null;

    if (state === null) {
        res.redirect('/#' + 
            querystring.stringify({
                error: 'state_mismatch'
            })
        ); 
    } else {
        console.log("starting some authOption shit");
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer.from(clientID + ':' + clientSecret).toString('base64'))
            },
            json: true
        };
        console.log("done setting up auth");

        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
      
                var access_token = body.access_token;
                token = access_token;
                var refresh_token = body.refresh_token;
      
                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };
      
                // use the access token to access the Spotify Web API
                request.get(options, function(error, response, body) {
                    res.redirect('/main');
                }) ;
      
                /*
                // we can also pass the token to the browser to make requests from there
                res.redirect('/#' +
                    querystring.stringify({
                    access_token: access_token,
                    refresh_token: refresh_token
                }));
                */
            } else {
                res.redirect('/main' +
                    querystring.stringify({
                    error: 'invalid_token'
                }));
            }
        });
        console.log("got thru everything");
        

    }
});

// Gets the API access token
// Input: None, this happens when the client secret and key are defined (happens above)
// Output: The access token
const getToken = async () => {

    const result = await fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(clientID + ':' + clientSecret)
        }, 
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
}

// Calls method above
app.get('/api/getToken', async (req, res) => {
    const token = await getToken();
    res.json(token)
})

// Checks the song to see if it exists in Spotify. Currently does not react if the song is not in Spotify
// Input: The API token, the song name and the artist name inputted by user
// Output: The result from querying the Spotify API for that song
const checkSongArtist = async(token, song, artist) => {
    console.log("in check song artist");
    console.log("token: ");
    console.log(token);
    const result = await fetch(`https://api.spotify.com/v1/search?q=track:${song}%20artist:${artist}&type=track&limit=1`, {
        method: 'GET',
        headers: {'Authorization' : `Bearer ${token}`}
    });
    const data = await result.json();
    //check min_pop = 80
    console.log(data)
    return data;
}

// Checks the song and artist and adds it to the origInfo
// Input and Output: see checkSongArtist 
app.post('/api/checkSongArtist', async (req, res) => {
    const song = req.body.song;
    const artist = req.body.artist;
    origInfo.song = song;
    origInfo.artist = artist;
    const songData = await checkSongArtist(token, song, artist);
    res.json(songData);
})

var tableData2 = [];

// Gets the features of the seed song
// Input: The API token and the song URI
// Output: the json data with the output from the audio-features call
const getFeatures2 = async (token, songId) => {
    console.log("gotten here");
    console.log(songId);
    const result3 = await fetch (`https://api.spotify.com/v1/audio-features/${songId}`, { 
        method: 'GET',
        headers: {'Authorization' : `Bearer ${token}`}
    });
    const data3 = await result3.json();
    console.log("song features");
    console.log(data3);
    return data3;
}

// TODO: Rename and clean up function
// TODO: Get access to the numResults variable
// Gets the features for the recommendations. Ignores numResults
// Input: the API token, the seed song URI, and the numResults (num results doesn't work)
// Output: A list with the data (rawData), which has the seed song as well as the recommendation songs and their features
// Additionally, a table will be populated locally (called tableData2)
// Calls: getFeatures2  
const getFeatures = async (token, songId, numResults) => {
    console.log("gotten here");
    console.log(songId);
    console.log("numResults");
    console.log(numResults);
    console.log("features adj");
    const result = await fetch (`https://api.spotify.com/v1/audio-features/${songId}`, {
        method: 'GET',
        headers: {'Authorization' : `Bearer ${token}`}
    });
    const data = await result.json();
    console.log("song features");
    console.log(data);
    //TODO: NEW STUFF
    const apiUrl = `https://api.spotify.com/v1/recommendations?limit=10&seed_tracks=${songId}`;
    //const adjFeatures = await adjustFeatures(data, offset);
    console.log("features adj2");
    //console.log(adjFeatures);
    const result2 = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Authorization' : `Bearer ${token}`}
    });
    const data2 = await result2.json();
    console.log("getRecs");
    //console.log(data2);
    //actual table
    var index = [];
    var songs = [];
    var artists = [];
    var uris = [];
    var energy = [];
    var valence = [];
    var acousticness = [];
    var danceability = [];
    var instrumentalness = [];
    var liveness = [];
    var loudness = [];
    var popularity = [];
    var releasedate = [];
    var speechiness = [];
    var tempo = [];

    //songs.push(data2.tracks[i].name)


    for (let i = 0; i < 10; i++) {
        //console.log("SONG===");
        //console.log(data2.tracks[i]);
        index.push(i+1);
        songs.push(data2.tracks[i].name);
        artists.push(data2.tracks[i].artists[0].name);
        uris.push(data2.tracks[i].href);
        const features = await getFeatures2(token, data2.tracks[i].id);

        //energy.push(0);
        //valence.push(0);
        //acousticness.push(0);
        //instrumentalness.push(0);
        //liveness.push(0);
        //loudness.push(0);
        //speechiness.push(0);
        //tempo.push(0);
        energy.push(features.energy);
        valence.push(features.valence);
        acousticness.push(features.acousticness);
        danceability.push(features.danceability);
        instrumentalness.push(features.instrumentalness);
        liveness.push(features.liveness);
        loudness.push(features.loudness);
        popularity.push(data2.tracks[i].popularity);
        releasedate.push(data2.tracks[i].album.release_date);
        speechiness.push(features.speechiness);
        tempo.push(features.tempo);


    }
    const raw_data = [];


    //0
    raw_data.push({
        origSong: origInfo.song,
        origArtist: origInfo.artist,
        recNumber: 0,
        uri: data.uri,
        song: origInfo.song,
        artist: origInfo.artist,
        energy: data.energy,
        valence: data.valence,
        acousticness: data.acousticness,
        danceability: data.danceability,
        instrumentalness: data.instrumentalness,
        liveness: data.liveness,
        loudness: data.loudness,
        popularity: origInfo.popularity,
        releasedate: origInfo.releasedate,
        speechiness: data.speechiness,
        tempo: data.tempo,
    })
    for (let i = 0; i < 10; i++) {
        api_url = data2.tracks[i].href;
        let embed_url = api_url.replace("https://api.spotify.com/v1/tracks", "https://open.spotify.com/embed/track");

        raw_data.push({
            origSong: origInfo.song,
            origArtist: origInfo.artist,
            recNumber: index[i],
            song: data2.tracks[i].name,
            artist: data2.tracks[i].artists[0].name,
            uri: embed_url,
            energy: energy[i],
            valence: valence[i],
            acousticness: acousticness[i],
            danceability: danceability[i],
            instrumentalness: instrumentalness[i],
            liveness: liveness[i],
            loudness: loudness[i],
            popularity: popularity[i],
            releasedate: releasedate[i],
            speechiness: speechiness[i],
            tempo: tempo[i],

        });
    }
    console.log("raw_data");
    //console.log(raw_data);
    tableData2.push(raw_data);
    return raw_data;
}

var tableData = [];

// TODO: numResults not working here, does it have to be "listened for" on the front end?
// Calls getFeatures
app.post('/api/getFeatures', async (req, res) => {
    const songId = req.body.songId;
    const features = await getFeatures(token, songId);
    res.json(features);
})

console.log("tableData");
console.log(tableData);

//TODO: this is currently not being used
// Adjusts features based on deltaFeatures
// Inputs: The features of the seed song (field) and the deltaFeatures or offset (field)
// Outputs: adjData, a field with the minimum valence, max energy, etc.
const adjustFeatures = (origFeatures, offset) => {
    adjData = {};
    adjData.minEn = parseFloat((Math.max(origFeatures.energy - offset.energy, 0.01)).toFixed(2));
    adjData.maxEn = parseFloat((Math.min(origFeatures.energy + offset.energy, 0.99)).toFixed(2));
    adjData.minVal = parseFloat((Math.max(origFeatures.valence - offset.valence, 0.01)).toFixed(2));
    adjData.maxVal = parseFloat((Math.min(origFeatures.valence + offset.valence, 0.99)).toFixed(2));
    adjData.pop = 80;
    console.log("adjData");
    console.log(adjData);
    return adjData;
}

//Calls adjustFeatures
// Needs the features of the seed song and the deltaFeatures
app.post('/api/adjustFeatures', async (req, res) => {
    const features = req.body.features;
    const offset = req.body.offset;
    const adjFeatures = adjustFeatures(features, offset);
    res.json(adjFeatures);

})

var recData = {};
var origInfo = {};

// TODO: use this for all recommendations, not just multiprocess
// Gets the recommendations
// Inputs: API token (string), seed song URI (string), features (field) and numResults (int)
// Outputs: the output of the recommendations API call (json) based on these fields
// Used in multiprocess
const getRecs = async(token, songId1, features, numResults) => {
    console.log("numresults");
    console.log(numResults);
    const limit = numResults;

    const seedTracks = [songId1]; // An array of multiple seed track IDs
    const seedTracksString = seedTracks.join(',');

    const apiUrl = `https://api.spotify.com/v1/recommendations?limit=${limit}&seed_tracks=${seedTracksString}&min_popularity=${features.pop}&min_energy=${features.minEn}&max_energy=${features.maxEn}&min_valence=${features.minVal}&max_valence=${features.maxVal}`;

    const result = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Authorization' : `Bearer ${token}`}
    });
    const data = await result.json();
    console.log("getRecs");
    recData = data;
    return data;
}

origFeatures = {}; //eventually encase all orig in single json
// TODO: should run getRecs, but does not currently
// Inputs: the output from frontEnd get recs
// Outputs: None, but will call recommendationSnapshot with the getRecs fetch from the frontend
app.post('/api/getRecs', async (req, res) => {
    console.log("got to getRecs");
    console.log(req.body);
    //const songId1 = req.body.songId1; //70LcF31zb1H0PyJoS1Sx1r
    //const features = req.body.features; //{minEn, maxEn, ..., pop}
    //origFeatures = req.body.orig;
    const do_the_recs = req.body.orig;
    console.log("heres the body orig");
    console.log(do_the_recs);
    //const recs = await getRecs(token, songId1, features, 10);
    //const recs = await getRecs(token, songId1, origFeatures, 10);
    //`res.json(recs);
    recommendationSnapshot(do_the_recs);

})

// TODO: Not sure if this is used? Need to see if this is called on the front end
// Input: API token (str) and a rec endpoint (string)
// Output: the output from the fetch call (json)
const getRec = async(token, recEndPoint) => {
    const result = await fetch(`${recEndPoint}`, {
        method: 'GET',
        headers: { 'Authorization' : `Bearer ${token}`}
    })

    const data = await result.json();
    return data;
}

// Calls the method above
app.post('/api/getRec', async (req, res) => {
    const recEndPoint = req.body.recEndPoint;
    const rec = await getRec(token, recEndPoint);
    res.json(rec);
})


// TODO: This is not used and should be deleted
// Input: The original features and the recommendation's features
// Output: The difference between the energy and valence features of the seed and recommendation (field)
const getRecDelta = (origFeatures1, recFeatures) => {
    var origFeatures = {energy: 0, valence: 0}
    origFeatures.energy = (origFeatures1.energy);
    origFeatures.valence = (origFeatures1.valence);

    delta = {};
    console.log("getRecDelta");
    delta.energy = recFeatures.energy - origFeatures.energy;
    delta.valence = recFeatures.valence - origFeatures.valence;
    return delta;

}

// TODO: Not used. Can delete
// Calls the above
app.post('/api/getRecDelta', async (req, res) => {
    const origFeatures = req.body.origFeatures;
    const recFeatures = req.body.recFeatures;
    const recDelta = getRecDelta(origFeatures, recFeatures);
    res.json(recDelta)

})

// Creates the raw Data for pushing to the excel table
// TODO: This seems redundant with getFeatures2
// Input: the data from getFeatures2 (list) which has features and names of the seed and recs
// Output: data (list) which has features and names of the seed and recs
async function createRawData(data) {
    var index = [];
    var songs = [];
    var artists = [];
    var uris = [];
    var energy = [];
    var valence = [];
    var acousticness = [];
    var danceability = [];
    var instrumentalness = [];
    var liveness = [];
    var loudness = [];
    var popularity = [];
    var releasedate = [];
    var speechiness = [];
    var tempo = [];
    console.log("creatingRawData");
    console.log(data); 

    for (let i = 1; i < data.length; i++) {
        console.log("SONG===");
        console.log(data[i]);
        index.push(i);
        songs.push(data[i].song);
        artists.push(data[i].artist);
        uris.push(data[i].uri);
        //const features = await getFeatures(token, data.tracks[i].id);

        energy.push(data[i].energy);
        valence.push(data[i].valence);
        acousticness.push(data[i].acousticness);
        danceability.push(data[i].danceability);
        instrumentalness.push(data[i].instrumentalness);
        liveness.push(data[i].liveness);
        loudness.push(data[i].loudness);
        popularity.push(data[i].popularity);
        releasedate.push(data[i].release_date);
        speechiness.push(data[i].speechiness);
        tempo.push(data[i].tempo);

        
    }

    //actual table
    const raw_data = [];
    //0
    i = 0;
    //TODO: Get the seed list date etc.
    raw_data.push({
        origSong: data[i].song,
        origArtist: data[i].artist,
        recNumber: 0,
        uri: data[i].uri,
        song: data[i].song,
        artist: data[i].artist,
        energy: data[i].energy,
        valence: data[i].valence,
        acousticness: data[i].acousticness,
        danceability: data[i].danceability,
        instrumentalness: data[i].instrumentalness,
        liveness: data[i].liveness,
        loudness: data[i].loudness,
        popularity: 0,
        releasedate: 0,
        speechiness: data[i].speechiness,
        tempo: data[i].tempo,
    })
    for (let i = 1; i < data.length; i++) {
        //api_url = data.tracks[i].href;
        //let embed_url = api_url.replace("https://api.spotify.com/v1/tracks", "https://open.spotify.com/embed/track");

        raw_data.push({
            origSong: data[0].song,
            origArtist: data[0].artist,
            recNumber: index[i],
            song: songs[i],
            artist: artists[i],
            uri: uris[i],
            energy: energy[i],
            valence: valence[i],
            acousticness: acousticness[i],
            danceability: danceability[i],
            instrumentalness: instrumentalness[i],
            liveness: liveness[i],
            loudness: loudness[i],
            popularity: popularity[i],
            releasedate: releasedate[i],
            speechiness: speechiness[i],
            tempo: tempo[i],
            
        });
    }

    return raw_data;
}

// Creates the raw data and pushes it to the table so it can be downloaded
// Input: data (list of fields) from getFeatures2
// Output: None, but the tableData is populated
async function recommendationSnapshot(do_the_data) {
    console.log("snapshotting");
    //const raw_data = await createRawData(recData);
    const raw_data = await createRawData(do_the_data);
    const data = Papa.unparse(raw_data);
    tableData.push(raw_data);
}

// generates csv data 
app.get('/generate-and-download/csv', async (req, res) => {
    // Example data
    console.log("generate-download");
    /*const raw_data = [
        {song: "grenade", artist: "bruno mars", energy: 64.8, valence: 63.9}
    ];*/

    //TODO: Fix
    //const raw_data = await createRawData(recData);
    const raw_data = await getFeatures(token, songId);
    const data = Papa.unparse(raw_data);

    const csvFileName = `data-${Date.now()}.csv`;
    const csvFilePath = path.join(__dirname, csvFileName);

    fs.writeFileSync(csvFilePath, data);

    res.download(csvFilePath, csvFileName, (err) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).send("Couldn't download the CSV");
        } else {
            fs.unlinkSync(csvFilePath); // Delete the file after sending to the user
        }
    });
});

app.get('/sample-download/csv', async(req, res) => {
    console.log("sample donwload");
    const csvFileName = 'sample_input.csv';
    const csvFilePath = path.join(__dirname, csvFileName)
    
    res.download(csvFilePath, csvFileName, (err) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).send("Couldn't download the CSV");
        } 
    });
})



// generate csv
app.get('/end-download/csv', async (req, res) => {

//put in this format: https://open.spotify.com/embed/track/6lanRgr6wXibZr8KgzXxBl
//download playlist spreadsheet somewhere else different butoon

    console.log("/end-download/csv");
    console.log(tableData2.flat())
    var flattenedData = tableData2.flat();
    const data = Papa.unparse(flattenedData);
    const csvFilename = `data-${Date.now()}.csv`;
    const csvFilePath = path.join(__dirname, csvFilename);

    fs.writeFileSync(csvFilePath, data);

    res.download(csvFilePath, csvFilename, (err) => {
        if (err) {
            console.error('Error:', err);
            res.status(500).send("Couldn't download the CSV");
        } else {
            fs.unlinkSync(csvFilePath); // Delete the file after sending to the user
            flattenedData = []; // Reset the data
        }
    });
});


//UNUSED
app.post('/download/csv', async (req, res) => {
    const Papa = require('papaparse');

    //const data = req.data;
    const data = [
        {song: "grenade", artist: "bruno mars", energy: 64.8, valence: 63.9}
    ];

    const csv = Papa.unparse(data);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=data.csv');
    res.send(csv);

    /*
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("sheet 1");

    worksheet.columns = [
        {header: 'Song', key: 'song', width: 10},
        {header: 'Artist', key: 'artist', width: 10},
        {header: 'Energy', key: 'energy', width: 10},
        {header: 'Valence', key: 'valence', width: 10},
    ]

    data.forEach(e => {
        worksheet.addRow(e);
    });
    
    await workbook.xlsx.writeFile('filename.xlsx');
    */

})

const init = async() => {
    token = await getToken();
    console.log("console logging: ")
    console.log(token)
};

init()

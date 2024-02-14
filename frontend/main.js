
/*
document.getElementById('myButton').addEventListener('click', function() {
    alert('Hello, Sarah! Welcome to the frontend.');
    console.log('Hello, Marcus! Welcome to the backend.');
});
*/

    
document.addEventListener('DOMContentLoaded', (event) => {
    const numberOfPages = localStorage.getItem('numberOfPages');
    // Now you can use numberOfPages in your main.js
    console.log(numberOfPages); // Just an example to show the number in the console
});

const UIController = (function() {
    const DOMElements = {
        pageNumber: '#page-number',
        buttonCheck: '#btn_check1',
        upload: '#upload',
        confirm: '#confirm',
        buttonConfirm: '#btn_confirm',
        buttonSubmit: '#btn_submit',
        features: {
            deltaAcousticness: '#delta_acousticness',
            deltaDanceability: '#delta_danceability',
            deltaEnergy: '#delta_energy',
            deltaInstrumentalness: '#delta_instrumentalness',
            deltaLiveness: '#delta_liveness',
            deltaLoudness: '#delta_loudness',
            deltaPopularity: '#delta_popularity',
            deltaReleaseDate: '#delta_releasedate',
            deltaSpeechiness: '#delta_speechiness',
            deltaTempo: '#delta_tempo',
            deltaValence: '#delta_valence',
            // Add more feature selectors if needed
        },
        useFeatures: {
            useAcousticness: '#use_acousticness',
            useDanceability: '#use_danceability',
            useEnergy: '#use_energy',
            useInstrumentalness: '#use_instrumentalness',
            useLiveness: '#use_liveness',
            useLoudness:  '#use_loudness',
            usePopularity: '#use_popularity',
            useReleaseDate: '#use_releasedate',
            useSpeechiness:  '#use_speechiness',
            useTempo:  '#use_tempo',
            useValence:  '#use_valence',
        },
        formUpload: '#upload_check',
        divRecList: '.rec-list',
        divRecDownload: '#rec-download',
        divRecDetail: '#rec-detail',
        buttonClear: '#btn_clear'
    }


    return {
        inputField() {
            return {
                pageNumber: document.querySelector(DOMElements.pageNumber),
                song: document.querySelector(`#input_song`),
                artist: document.querySelector(`#input_artist`),
                check: document.querySelector(DOMElements.buttonCheck),
                upload: document.querySelector(DOMElements.upload),
                confirm: document.querySelector(DOMElements.confirm),
                buttonConfirm: document.querySelector(DOMElements.buttonConfirm),
                features: {
                    deltaAcousticness: document.querySelector(DOMElements.features.deltaAcousticness),
                    deltaDanceability: document.querySelector(DOMElements.features.deltaDanceability),
                    deltaEnergy: document.querySelector(DOMElements.features.deltaEnergy),
                    deltaInstrumentalness: document.querySelector(DOMElements.features.deltaInstrumentalness),
                    deltaLiveness: document.querySelector(DOMElements.features.deltaLiveness),
                    deltaLoudness: document.querySelector(DOMElements.features.deltaLoudness),
                    deltaPopularity: document.querySelector(DOMElements.features.deltaPopularity),
                    deltaReleaseDate: document.querySelector(DOMElements.features.deltaReleaseDate),
                    deltaSpeechiness: document.querySelector(DOMElements.features.deltaSpeechiness),
                    deltaTempo: document.querySelector(DOMElements.features.deltaTempo),
                    deltaValence: document.querySelector(DOMElements.features.deltaValence),
                },
                useFeatures: {
                    deltaAcousticness: document.querySelector(DOMElements.features.deltaAcousticness),
                    deltaDanceability: document.querySelector(DOMElements.features.deltaDanceability),
                    deltaEnergy: document.querySelector(DOMElements.features.deltaEnergy),
                    deltaInstrumentalness: document.querySelector(DOMElements.features.deltaInstrumentalness),
                    deltaLiveness: document.querySelector(DOMElements.features.deltaLiveness),
                    deltaLoudness: document.querySelector(DOMElements.features.deltaLoudness),
                    deltaPopularity: document.querySelector(DOMElements.features.deltaPopularity),
                    deltaReleaseDate: document.querySelector(DOMElements.features.deltaReleaseDate),
                    deltaSpeechiness: document.querySelector(DOMElements.features.deltaSpeechiness),
                    deltaTempo: document.querySelector(DOMElements.features.deltaTempo),
                    deltaValence: document.querySelector(DOMElements.features.deltaValence),
                },
                file: document.querySelector('#input_file'), 
                formUpload: document.querySelector(DOMElements.formUpload),
                submit: document.querySelector(DOMElements.buttonSubmit),
                recs: document.querySelector(DOMElements.divRecList),
                recDownload: document.querySelector(DOMElements.divRecDownload), 
                recDetail: document.querySelector(DOMElements.divRecDetail),
                clearAll: document.querySelector(DOMElements.buttonClear)
            }
        },

        setPageNumber(number) {
            const html = `<p> Page ${number} </p>`;
            document.querySelector(DOMElements.pageNumber).innerHTML = html;
        },

        createRec(id, name) {
            const html = `<a href="#" class="list-group-item list-group-item-action list-group-item-light" id="${id}">${name}</a>`;
            document.querySelector(DOMElements.divRecList).insertAdjacentHTML('beforeend', html);
        },

        createInputConfirm(id) {
            const url = `https://open.spotify.com/embed/track/${id}`;
            const html = 
                `<div class="check-background">
                    <div class="confirm-widget">
                        <iframe src="${url}"  width="300px" height="380px" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                    </div>
                    <button id="btn_confirm" class="button">Confirm</button>
                </div>`;
            document.querySelector(DOMElements.confirm).insertAdjacentHTML('beforeend', html);
        },

        createUploadPopup(id) {
            const html = 
                `<div class="check-background">
                    <button id="btn_confirm" class="button">Confirm</button>
                </div>`;
                document.querySelector(DOMElements.confirm).insertAdjacentHTML('beforeend', html);
        },

        async loadDeltaInput(id) {
            const response = await fetch('deltaInput.html');
            console.log(response);
            var html = await response.text();
            const url = `https://open.spotify.com/embed/track/${id}`;
            html = html.replace("${url}", url);
            console.log(html);
            document.getElementById('delta-input').innerHTML = html;

            fetch('deltaInput.js')
                .then(response => response.text())
                .then(txt => {
                    var script = document.createElement("script");
                    script.innerHTML = txt;
                    document.body.appendChild(script);
                });
            

        },

        createDownload() {
            const html = '<a href="/generate-and-download/csv" class="btn btn-primary">Download CSV</a>'
            document.querySelector(DOMElements.divRecDownload).insertAdjacentHTML('beforeend', html);
        },

        createRecDetail(id) {
            const detailDiv = document.querySelector(DOMElements.divRecDetail);
            detailDiv.innerHTML = '';
            const url = `https://open.spotify.com/embed/track/${id}`;

            const html = 
            `
            <div class="row col-sm-12 px-0">
                <iframe src="${url}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
            `;

            detailDiv.insertAdjacentHTML('beforeend', html)
        },

        createRecDelta(delta) {
            const detailDiv = document.querySelector(DOMElements.divRecDetail);
            
            denergy = Number(delta.energy.toFixed(2));
            dvalence = Number(delta.valence.toFixed(2));

            const html = `
                <div class="row col-sm-12 px-0">
                    <p>Difference between original avg and rec song</p>
                    <p>energy: ${denergy}, valence: ${dvalence}</p>
                </div>
            `;

            detailDiv.insertAdjacentHTML('beforeend', html);
        },

        resetOptions() {
            // Reset song and artist inputs
            console.log(this.inputField().song);
            this.inputField().song.value = '';
            this.inputField().artist.value = '';
            //document.querySelector(DOMElements.inputSong).value = '';
            //document.querySelector(DOMElements.inputArtist).value = '';

            // Reset feature range inputs to their default values
            const featureDefaults = {
                deltaAcousticness: 0.15,
                deltaDanceability: 0.15,
                deltaEnergy: 0.15,
                deltaInstrumentalness: 0.15,
                deltaLiveness: 0.15,
                deltaLoudness: 3,
                deltaPopularity: 80,
                deltaReleaseDate: 2010,
                deltaSpeechiness: 0.15,
                deltaTempo: 60,
                deltaValence: 0.15,
            };

            for (const feature in featureDefaults) {
                const element = document.querySelector(DOMElements.features[feature]);
                if (element) {
                    element.value = featureDefaults[feature];

                    // If you have associated output elements for the sliders, reset them too
                    const outputElementId = feature + 'Output';
                    const outputElement = document.getElementById(outputElementId);
                    if (outputElement) {
                        outputElement.value = featureDefaults[feature];
                    }
                }
            }
        },

        resetRecDetail() {
            this.inputField().recDetail.innerHTML = '';
        },

        resetRecs() {
            this.inputField().recs.innerHTML = '';
            this.inputField().recDownload.innerHTML = '';
        },

        resetInputConfirm() {
            this.inputField().confirm.innerHTML = '';
        }

    }
})();


const APPController = (function(UICtrl) {
    const numberOfPages = localStorage.getItem('numberOfPages');
    var pageNum = 1;
    // Now you can use numberOfPages in your main.js
    console.log(numberOfPages); // Just an example to show the number in the console


    var DOMInputs = UICtrl.inputField();

    var deltaFeatures = {
        energy: 0.15,
        valence: 0.15,
        acousticness: 0.15,
        danceability: 0.15,
        instrumentalness: 0.15,
        liveness: 0.15,
        loudness: 3,
        popularity: 80,
        releasedate: 2010,
        speechiness: 0.15,
        tempo: 60,
        // any additional features should be initialized here
    };

    var songData1 = {
        name: '',
        id: '',
        artist: '',
        origFeatures: {},
        adjustFeatures: {},
        confirm: false
    }

    UICtrl.setPageNumber(pageNum);

    //function(string, string): data
    async function checkSongArtist(songInput, artistInput) {
        var response = await fetch('/api/checkSongArtist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                song: songInput,
                artist: artistInput
            })
        })
        return response.json();
    }

    //button check valid song and artist
    DOMInputs.check.addEventListener('click', async (event) => {
        event.preventDefault();
        const songInput = UICtrl.inputField().song.value;
        const artistInput = UICtrl.inputField().artist.value;
        const data = await checkSongArtist(songInput, artistInput);

        songData1.name = data.tracks.items[0].name;
        songData1.id = data.tracks.items[0].id;
        songData1.artist = data.tracks.items[0].artists[0].name;

        /*
        const userConfirmed = confirm(`Your song is ${songData1.name} by ${songData1.artist}}. Do you want to proceed?`);
        if (userConfirmed) {
            
        }
        */
        
        songData1.confirm = true; //needs to be fixed. 

        UICtrl.createInputConfirm(songData1.id);

    })

    
    document.body.addEventListener('click', function(event) {
        // Check if the clicked element is the button
        //event.preventDefault();
        
        if (event.target.id === 'btn_confirm') {
            UICtrl.resetInputConfirm();
            UICtrl.loadDeltaInput(songData1.id);
            DOMInputs = UICtrl.inputField();
        }
        
    });
    


    //upload file ("returns" responseData in object type)
    DOMInputs.formUpload.addEventListener('click', async(e) => {
        e.preventDefault();
        console.log("uploading file");
        const formData = new FormData();
        console.log(UICtrl.inputField().file.files[0]);
        formData.append('fileInput', UICtrl.inputField(1).file.files[0]);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('File upload failed.');

            const responseData = await response.json();
            const data = await checkSongArtist(responseData.data[0].name, responseData.data[0].artist);
            songData1.name = data.tracks.items[0].name;
            songData1.id = data.tracks.items[0].id;
            songData1.artist = data.tracks.items[0].artists[0].name;

            /*
            const userConfirmed = confirm(`Your song is ${songData1.name} by ${songData1.artist}}. Do you want to proceed?`);
            if (userConfirmed) {
                songData1.confirm = true;
            }
            */

            songData1.confirm = true;
            UICtrl.createInputConfirm(songData1.id);

        } catch (error) {
            console.error(error);
        } finally {}


    })

    //helper
    async function getFeatures(songId) {
        response = await fetch('/api/getFeatures', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                songId: songId
            })
        });
        return response.json();
    }

    //helper
    async function adjustFeatures(songFeatures, delta) {
        response = await fetch('/api/adjustFeatures', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                features: songFeatures,
                offset: delta
            })
        });
        return response.json(); 
    }

    //helper
    async function getRecs(songId, songFeatures) {
        response = await fetch('/api/getRecs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                songId1: songId,
                features: songFeatures
            })
        });
        data = response.json();
        console.log("recData===");
        console.log(data);
        return data;
    }

    //submit & process
    DOMInputs.submit.addEventListener('click', async (event) => {
        event.preventDefault(); // prevent form from being submitted normally
        UICtrl.resetRecs();
        UICtrl.resetRecDetail();
        
        //encapsulate these in a separate function
        console.log(UICtrl.inputField());
        if (UICtrl.inputField().features.deltaEnergy.value != ''){
            deltaFeatures.energy = parseFloat(UICtrl.inputField().features.deltaEnergy.value);
        } 
        if (UICtrl.inputField().features.deltaValence.value != ''){
            deltaFeatures.valence = parseFloat(UICtrl.inputField().features.deltaValence.value);
        }
        if (UICtrl.inputField().features.deltaAcousticness.value != '') {
            deltaFeatures.acousticness = parseFloat(UICtrl.inputField().features.deltaAcousticness.value);
        }
        if (UICtrl.inputField().features.deltaDanceability.value != '') {
            deltaFeatures.danceability = parseFloat(UICtrl.inputField().features.deltaDanceability.value);
        }
        if (UICtrl.inputField().features.deltaInstrumentalness.value != '') {
            deltaFeatures.instrumentalness = parseFloat(UICtrl.inputField().features.deltaInstrumentalness.value);
        }
        if (UICtrl.inputField().features.deltaLiveness.value != '') {
            deltaFeatures.liveness = parseFloat(UICtrl.inputField().features.deltaLiveness.value);
        }
        if (UICtrl.inputField().features.deltaLoudness.value != '') {
            deltaFeatures.loudness = parseFloat(UICtrl.inputField().features.deltaLoudness.value);
        }
        if (UICtrl.inputField().features.deltaPopularity.value != '') {
            deltaFeatures.popularity = parseFloat(UICtrl.inputField().features.deltaPopularity.value);
        }
        if (UICtrl.inputField().features.deltaReleaseDate.value != '') {
            deltaFeatures.releasedate = parseFloat(UICtrl.inputField().features.deltaReleaseDate.value);
        }
        if (UICtrl.inputField().features.deltaSpeechiness.value != '') {
            deltaFeatures.speechiness = parseFloat(UICtrl.inputField().features.deltaSpeechiness.value);
        }
        if (UICtrl.inputField().features.deltaTempo.value != '') {
            deltaFeatures.tempo = parseFloat(UICtrl.inputField().features.deltaTempo.value);
        } 

        if (songData1.confirm == true) {
            songData1.origFeatures = await getFeatures(songData1.id);
            console.log(songData1.origFeatures);
            songData1.adjustFeatures = await adjustFeatures(songData1.origFeatures, deltaFeatures);
            const recs = await getRecs(songData1.id, songData1.adjustFeatures);
            console.log("incoming recs");
            console.log(recs);
            recs.tracks.forEach(r => UICtrl.createRec(r.href, r.name));
            UICtrl.createDownload();
        }
    })

    //helper
    async function getRec(recEndPoint) {
        const response = await fetch('/api/getRec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recEndPoint: recEndPoint
            })
        });
        return response.json();
    }

    //helper
    async function getRecDelta(origFeatures, recFeatures) {
        const response3 = await fetch('/api/getRecDelta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                origFeatures: songData1.origFeatures, //make this smoother
                recFeatures: recFeatures
            })
        })

        return response3.json();
    }

    //click on recommended song
    DOMInputs.recs.addEventListener('click', async (e) => {
        e.preventDefault();
        UICtrl.resetRecDetail();
        const rec = await getRec(e.target.id)
        const recFeatures = await getFeatures(rec.id);
        const recDelta = await getRecDelta(songData1.origFeatures, recFeatures);

        UICtrl.createRecDetail(rec.id);
        UICtrl.createRecDelta(recDelta);
        地圖 = 0


    });

    DOMInputs.clearAll.addEventListener('click', async (e) => {
        e.preventDefault();
        pageNum++;
        if (pageNum > numberOfPages) {
            window.location.href = '/exit'; 
        }
        UICtrl.setPageNumber(pageNum);
        UICtrl.resetOptions();
        UICtrl.resetRecDetail();
        UICtrl.resetRecs();

    }); 

    return {
        init() {
            console.log('App is starting');
        }
    }

})(UIController);

//RUN HERE
APPController.init();



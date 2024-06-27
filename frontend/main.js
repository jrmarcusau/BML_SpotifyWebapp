
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

        // Popup when user clicks confirm. Asks the user to confirm that song and artist is right, else go back
        createInputConfirm(id) {
            const url = `https://open.spotify.com/embed/track/${id}`;
            const html = `
            <div id="confirmation-popup" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); padding: 20px; width: 800px; height: 500px; z-index: 1000; border-radius: 10px; display: flex;">
            <div style="flex: 1; display: flex; justify-content: center; align-items: center;">
                <iframe src="${url}" width="315px" height="380px" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <p style="margin-bottom: 20px;">Is this the song you were searching for?</p>
                <button id="btn_confirm" class="small-button" style="width: 200px; padding: 10px 20px; border-radius: 5px; background-color: #2B71B2; color: white; margin-bottom: 10px;">Confirm</button>
                <button id="re-enter-button" class="small-button" style="width: 200px; padding: 10px 20px; border-radius: 5px; background-color: #7E7E7E; color: white;">Re-enter</button>
            </div>
        </div>
        
            `;
            document.querySelector('body').insertAdjacentHTML('beforeend', html);
        
            // Event listener for the "Confirm" button
            document.getElementById('btn_confirm').addEventListener('click', () => {
                // Close the popup
                document.getElementById('confirmation-popup').remove();
                document.getElementById('btn_submit').style.display = 'inline-block';

            });
        
            // Event listener for the "Re-enter" button
            document.getElementById('re-enter-button').addEventListener('click', () => {
                // Close the popup
                document.getElementById('confirmation-popup').remove();
            });
        },
        
        
        
        
        
        
        
        // I think we can remove this - Dana
/*
        createUploadPopup(id) {
            console.log("createUploadPopup");
            const html = 
                `<div class="check-background">
                    <button id="btn_confirm" class="button">Confirm2</button>
                </div>`;
                document.querySelector(DOMElements.confirm).insertAdjacentHTML('beforeend', html);
        },*/

        async loadDeltaInput(id) {
            const response = await fetch('deltaInput.html');
            console.log(response);
            var html = await response.text();
            const url = `https://open.spotify.com/embed/track/${id}`;
            html = html.replace("${url}", url);
            // this must be what's showing up next - Dana
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

    //UICtrl.setPageNumber(pageNum);

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

    // Popup when "check" button is clicked. This asks the user if the song is correct.
    DOMInputs.check.addEventListener('click', async (event) => {
        console.log("checking something....")
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
                features: songFeatures,
                orig: songData1.origFeatures
            })
        });
        data = response.json();
        console.log("recData===");
        console.log(data);
        return data;
    }

    //submit & process
    DOMInputs.submit.addEventListener('click', async (event) => {
        console.log("In the event listener for submit button on main.js, aka the match my songs button");
        // I do see this briefly, so event listener is working - Dana

        event.preventDefault(); // prevent form from being submitted normally
        
        console.log("UICtrl.inputField().features.deltaEnergy.value" + UICtrl.inputField().features.deltaEnergy.value)
        // This is working. This by default is .15 and if I scroll, the value does change.
        
        // UICtrl.resetRecs();
        // UICtrl.resetRecDetail();
        
        //redirect to download CSV page
        //window.location.href = '/exit';
        // Going to try putting this at the end of the function 

        //encapsulate these in a separate function
        if (UICtrl.inputField().features.deltaEnergy.value != ''){
            deltaFeatures.energy = parseFloat(UICtrl.inputField().features.deltaEnergy.value);
            console.log("deltaFeatures.energy + " + deltaFeatures.energy);
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
            console.log ("songData1.adjustFeatures  +" + songData1.adjustFeatures )
            const recs = await getRecs(songData1.id, songData1.adjustFeatures);
            console.log("recs + " + recs);
            recs.tracks.forEach(r => UICtrl.createRec(r.href, r.name));
            UICtrl.createDownload();
        }

        //redirect to download CSV page
        //window.location.href = '/exit'; DANA UNDO THIS
        // This was at the top before
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



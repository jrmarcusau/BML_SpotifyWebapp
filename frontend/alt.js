

function updateAllSliders(value) {
    console.log("this chill");
    // Update the output for the general slider
    document.getElementById('generalSliderOutput').value = value;


    // Update each individual slider
    let sliders = document.querySelectorAll('.sync-slider');
    sliders.forEach(slider => {
        slider.value = value;
        //slider.classList.add('slider2'); THIS WORKS

        // Update the corresponding output for each slider
        let outputId = slider.getAttribute('delta-output');
        if (outputId) {
            document.getElementById(outputId).value = value;
        }
    });

    //make sure value moves
    document.querySelectorAll('.slider-color').forEach(slider => {
        const baseId = slider.id.substring(6); // Extract the part of the ID after 'delta_'
        const featureName = baseId.charAt(0).toUpperCase() + baseId.slice(1); // Capitalize the first letter
        const outputId = 'delta' + featureName + 'Output';
        
        const outputElement = document.getElementById(outputId);
        if (outputElement) {
            outputElement.value = slider.value;
            // If you also need to update the visual display of the <output> element:
            outputElement.textContent = slider.value;
        }
    });
}

function checkboxChanged(checkbox) {
    console.log("hipeee");
    var sliderId = checkbox.id.replace('use_', 'delta_');
    var slider = document.getElementById(sliderId);

    if (checkbox.checked) {
        slider.classList.add('slider2');  // Change to gray when checked
        slider.classList.add('sync-slider');
    } else {
        slider.classList.remove("slider2");
        slider.classList.remove('sync-slider');
    }
}


window.onload = function() {
    console.log("this also chill");
    let initialValue = 0.15; // Default value
    document.getElementById('general_slider').value = initialValue;
    updateAllSliders(initialValue);
};


var song_list = {};
var delta_list = {};

//upload file ("returns" responseData in object type)
document.querySelector('#upload_check').addEventListener('click', async(e) => {
    e.preventDefault();
    const html = 
        `
        <div id="check-background" class="check-background">
            <div style="width: 400px; height: 29px; padding-top: 5px; padding-bottom: 6px; padding-left: 55px; padding-right: 55px; justify-content: center; align-items: center; display: inline-flex">
                <div style="width: 290px; color: #333333; font-size: 16px; font-family: Arial; font-weight: 700; word-wrap: break-word">Have you checked your spreadsheet?</div>
            </div>
            <div style="height: 113px; padding: 16px; justify-content: center; align-items: center; gap: 16px; display: inline-flex">
                <div style="width: 367px; height: 93px; text-align: center; color: #333333; font-size: 14px; font-family: Arial; font-weight: 400; line-height: 20px; word-wrap: break-word">In order for SoundsLikeThis to work correctly, your spreadsheet must follow the template provided. If you’re ready to upload, click Confirm. If not, please go back and download the template before uploading.</div>
            </div>
            <div style="width: 363px; padding: 16px; justify-content: center; align-items: center; gap: 32px; display: inline-flex">
                <button id="check_goback" style="padding-top: 6px; padding-bottom: 8px; padding-left: 31px; padding-right: 32px; background: #7E7E7E; border-radius: 8px; overflow: hidden; justify-content: center; align-items: center; display: flex">
                    <div style="text-align: center; color: #FAFAFA; font-size: 16px; font-family: Arial; font-weight: 400; word-wrap: break-word">go back</div>
                </button>
                <button id="check_confirm" style="padding-top: 6px; padding-bottom: 8px; padding-left: 34px; padding-right: 33px; background: #2B71B2; border-radius: 8px; overflow: hidden; justify-content: center; align-items: center; display: flex">
                    <div style="text-align: center; color: #FAFAFA; font-size: 16px; font-family: Arial; font-weight: 400; word-wrap: break-word">confirm</div>
                </button>
            </div>
        </div>

        `
    document.querySelector('#upload').insertAdjacentHTML('beforeend', html);
    
    
    console.log("checking alt file");
    const formData = new FormData();
    formData.append('fileInput', document.querySelector('#input_file').files[0]);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('File upload failed.');

        const responseData = await response.json();
        console.log(responseData.data);

        song_list = responseData.data;
        console.log("song list: ");
        console.log(song_list);
        

    } catch (error) {
        console.error(error);
    } finally {}

    

})

document.body.addEventListener('click', function(event) {
    // Check if the clicked element is the button
    //event.preventDefault();
    
    console.log("clicky");

    if (event.target.id === 'info-x') {
        console.log("x-spec");
        document.querySelector('#info-popup').remove();
    } 



    if (event.target.id == "check_goback") {
        console.log("check_goback");
        document.querySelector('#check-background').remove();
        document.querySelector('#input_file').value = '';
    }

    if (event.target.id == "check_confirm") {
        console.log("check_goback");
        document.querySelector('#check-background').remove();

    }

    if (event.target.id === 'btn_next') {
        console.log("btn=Next");
    }
    
});



document.querySelector('#btn_next').addEventListener('click', async(e) => {
    e.preventDefault();
    console.log("in btn_next");

    const numberOfResults = document.getElementById('numResults').value;
    localStorage.setItem('numberOfResults', numberOfResults);

    //delta list --fix to use features
    delta_list = {
        acousticness: parseFloat(document.querySelector('#delta_acousticness').value),
        danceability: parseFloat(document.querySelector('#delta_danceability').value),
        energy: parseFloat(document.querySelector('#delta_energy').value),
        instrumentalness: parseFloat(document.querySelector('#delta_instrumentalness').value),
        liveness: parseFloat(document.querySelector('#delta_liveness').value),
        loudness: parseFloat(document.querySelector('#delta_loudness').value),
        popularity: parseFloat(document.querySelector('#delta_popularity').value),
        releasedate: parseFloat(document.querySelector('#delta_releasedate').value),
        speechiness: parseFloat(document.querySelector('#delta_speechiness').value),
        tempo: parseFloat(document.querySelector('#delta_tempo').value),
        valence: parseFloat(document.querySelector('#delta_valence').value),
        numResults: numberOfResults
    }

    console.log("delta_list:");
    console.log(delta_list);

    console.log("song_list");
    console.log(song_list);

    const response = await fetch('/multiprocess', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // This line is crucial
        },
        body: JSON.stringify({
            song_list: song_list,
            delta_list: delta_list,
        })
    });

    console.log("done");

    window.location.href = '/exit';

})

document.getElementById('info-button').addEventListener('click', async(event) => {
    event.preventDefault();
    console.log("info!");

    const html = 
        `<div id="info-popup" class="info-popup-delta">
            <p class="subtitle">What do these features mean?</p>
            <p class="description">To see individual descriptions of these features, click the name or see the “about these features” page. </p>
            <img src="x.png" id="info-x" class="info-x"></img>
        </div>`
    
    document.querySelector('#info-popup-border').insertAdjacentHTML('beforeend', html);
})

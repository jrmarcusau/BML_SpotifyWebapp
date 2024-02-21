

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
        let outputId = slider.getAttribute('data-output');
        if (outputId) {
            document.getElementById(outputId).value = value;
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


document.getElementById('info-button').addEventListener('click', async(event) => {
    event.preventDefault();
    console.log("info!");

    const html = 
        `<div id="info-popup" class="info-popup-delta">
            <h4>What do these features mean?</h4>
            <p>To see individual descriptions of these features, click the name.</p>
            <p>https//developer.spotify.com/documentation/web-api/
                    reference/get-recommendations</p>
            <button id="info-x" class="info-x">x</button>
        </div>`
    
    document.querySelector('#info-popup-border').insertAdjacentHTML('beforeend', html);
})

document.body.addEventListener('click', function(event) {
    // Check if the clicked element is the button
    //event.preventDefault();
    
    console.log("clicky");

    if (event.target.id === 'info-x') {
        console.log("x-spec");
        document.querySelector('#info-popup').remove(); // This removes the popup element itself
    }
    
});

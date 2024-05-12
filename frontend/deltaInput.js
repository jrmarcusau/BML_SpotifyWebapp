// DANA this is probably where i should add the next button at the end

function updateAllSliders(value) {
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
    var sliderId = checkbox.id.replace('use_', 'delta_');
    var slider = document.getElementById(sliderId);

    if (checkbox.checked) {
        slider.classList.add('slider2');  // Change to gray when checked
        slider.classList.add('sync-slider');
        slider.removeAttribute('disabled'); // Enable the slider
    } else {
        slider.classList.remove("slider2");
        slider.classList.remove('sync-slider');
        slider.setAttribute('disabled', 'disabled'); // Disable the slider
    }
}

window.onload = function() {
    let initialValue = 0.15; // Default value
    document.getElementById('general_slider').value = initialValue;
    updateAllSliders(initialValue);
};


document.getElementById('info-button').addEventListener('click', async(event) => {
    event.preventDefault();
    console.log("info!");

    const html = 
        `<div id="info-popup" class="info-popup-delta">
            <p class="subtitle">What do these features mean?</p>
            <p class="description">To see individual descriptions of these features, click the name or see the <a href="/about">“about these features”</a> page.</p>
            <img src="x.png" id="info-x" class="info-x" alt="Close"></img>
        </div>`
    
    document.querySelector('#info-popup-border').insertAdjacentHTML('beforeend', html);
    // Hide the info button
    document.getElementById('info-button').style.display = 'none';
})

document.body.addEventListener('click', function (event) {
    if (event.target.id === 'info-x') {
        console.log("x-spec");
        document.querySelector('#info-popup').remove(); // This removes the popup element itself
        // Puts the info button back
        document.getElementById('info-button').style.display = 'block';
    }
});

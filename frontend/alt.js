

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
    } else {
        slider.classList.remove("slider2");
    }
}


window.onload = function() {
    console.log("this also chill");
    let initialValue = 0.15; // Default value
    document.getElementById('general_slider').value = initialValue;
    updateAllSliders(initialValue);
};


//upload file ("returns" responseData in object type)
document.querySelector('#upload_check').addEventListener('click', async(e) => {
    e.preventDefault();
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

        
        await fetch('/multiprocess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // This line is crucial
            },
            body: responseData
        });


        


    } catch (error) {
        console.error(error);
    } finally {}


})



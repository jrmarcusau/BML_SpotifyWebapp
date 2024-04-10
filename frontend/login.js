document.getElementById('btn_login').addEventListener('click', async (event) => {
    event.preventDefault();
    console.log("tryna log rn");
    window.location.href = "/login";
})

document.getElementById('btn_continue').addEventListener('click', async(event) => {
    event.preventDefault();
    console.log("continuing");
    window.location.href = "/choice";
})


document.getElementById('info-button').addEventListener('click', async(event) => {
    event.preventDefault();
    console.log("info!");

    const html = 
        `<div id="info-popup" class="info-popup">
            <p class="subtitle">Why would I want to log in instead of using a public account?</p>
            <p class = "description">Spotify automatically saves the listening preferences of its users. If you log in with your own account, song recommendations will be biased (even with the feature constraints you set) towards your own listening history. If you log in with the public account associated with this tool, your recommendations will be biased towards the history of other users of this site (which will necessarily be broader).</p>

            <img src="x.png" id="info-x" class="info-x"></img>

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

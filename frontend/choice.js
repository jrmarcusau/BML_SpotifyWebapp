

document.getElementById('btn_manual').addEventListener('click', async(event) => {
    event.preventDefault();
    console.log("continuing");
    window.location.href = "/main";
})

document.getElementById('btn_spreadsheet').addEventListener('click', async(event) => {
    event.preventDefault();
    console.log("continuing 2");
    window.location.href = "/alt";
})


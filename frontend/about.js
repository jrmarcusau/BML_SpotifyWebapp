document.querySelector("#about").addEventListener('click', async(e) => {
    e.preventDefault();
    console.log("about section!");
    window.location.href = "/about";
})

document.querySelector("#home").addEventListener('click', async(e) => {
    e.preventDefault();
    console.log("home!");
    window.location.href = "/";
})
document.getElementById('btn_login').addEventListener('click', async (event) => {
    event.preventDefault();
    console.log("tryna log rn");
    window.location.href = "/login";
})

document.getElementById('btn_continue').addEventListener('click', async(event) => {
    event.preventDefault();
    console.log("continuing");
    window.location.href = "/main"
})
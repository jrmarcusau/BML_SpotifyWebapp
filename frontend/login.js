document.getElementById('btn_login').addEventListener('click', async (event) => {
    event.preventDefault();
    console.log("tryna log rn");
    window.location.href = "/login";
})

document.getElementById('btn_continue').addEventListener('click', async(event) => {
    event.preventDefault();
    console.log("continuing");
    window.location.href = "/main";
})

document.getElementById('btn_continue2').addEventListener('click', async(event) => {
    event.preventDefault();
    console.log("continuing 2");
    window.location.href = "/alt";
})
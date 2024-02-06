document.getElementById('enterApp').addEventListener('click', function() {
    window.location.href = '/loginpage';
});

document.getElementById('enterApp').addEventListener('click', function() {
    const numberOfPages = document.getElementById('numPages').value;
    localStorage.setItem('numberOfPages', numberOfPages);
    window.location.href = '/loginpage';
});

document.getElementById('btn_login').addEventListener('click', async (event) => {
    event.preventDefault();
    console.log("tryna log rn");
    window.location.href = "/login";
})

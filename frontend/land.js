document.getElementById('enterApp').addEventListener('click', function() {
    window.location.href = '/loginpage';
});

document.getElementById('enterApp').addEventListener('click', function() {
    const numberOfPages = document.getElementById('numPages').value;
    localStorage.setItem('numberOfPages', numberOfPages);
    window.location.href = '/loginpage';
});

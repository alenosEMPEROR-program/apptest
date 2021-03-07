const { ipcRender } = require("electron");

const zoekBtn = document.getElementById('zoeken-btn');

zoekBtn.addEventListener('click', function(event) {
    ipcRender.send("zoekWin", ""); 
});
const targetTitle = document.getElementById('target-title');
const select = document.getElementById('bookmark-folders');
const getButton = document.getElementById('get-bookmark');
const randoButton = document.getElementById('get-rando');

(function getBookmark(){
    getButton.addEventListener('click', () => {
        try {
            chrome.runtime.sendMessage('get-bookmark', (response) => {
                console.log(response);
            });
        } catch (err) {
            console.error(err);
        }
    })
})();

(function getRando(){
    randoButton.addEventListener('click', () => {
        try {
             chrome.runtime.sendMessage('get-rando', (response) => {
                console.log(response);
            });
        } catch (err) {
            console.error(err);
        }
    })
})();

(async function updateCache(){
    try {
        await chrome.runtime.sendMessage('update-cache', (response) => {
            console.log(response);
        })
    } catch (err) {
        console.error(err);
    }
})();


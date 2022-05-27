const getButton = document.getElementById('get-bookmark');
const randoButton = document.getElementById('get-rando');

function getBookmark(){
    getButton.addEventListener('click', async () => {
        try {
            await chrome.runtime.sendMessage('get-bookmark', (response) => {
                console.log(response);
            });
        } catch (err) {
            console.error(err);
        }
    })
}

function getRando(){
    randoButton.addEventListener('click', async () => {
        try {
            await chrome.runtime.sendMessage('get-rando', (response) => {
                console.log(response);
            });
        } catch (err) {
            console.error(err);
        }
    })
}

getBookmark();
getRando();
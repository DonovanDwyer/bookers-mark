const targetTitle = document.getElementById('target-title');
const select = document.getElementById('bookmark-folders');
const getButton = document.getElementById('get-bookmark');
const randoButton = document.getElementById('get-rando');

(function getSelect(){
    select.addEventListener('change', () => {
        try {
            chrome.storage.sync.set({ targetFolder: { 
                id: select.value, 
                title: select[select.selectedIndex].innerHTML,
                index: select.selectedIndex
            }
        });
        targetTitle.innerText = select[select.selectedIndex].innerHTML;
        } catch (err){
            console.error(err);
        }
    })
})();

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
            for (const folder of response){
                let title, id;
                if (folder.id === '0') {
                    title = 'Root Folder';
                    id = '0';
                } else {
                    title = folder.title === '' ? 'Untitled Folder' : folder.title;
                    id = folder.id;
                }
                let option = document.createElement('option');
                option.value = id;
                option.append(document.createTextNode(title));
                select.append(option);
            }
            chrome.storage.sync.get(['targetFolder'], (result) => {
                let text = document.createTextNode(result.targetFolder.title);
                targetTitle.append(text);
                select.selectedIndex = result.targetFolder.index;
            })
        })
    } catch (err) {
        console.error(err);
    }
})();


const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const targetFolder = async () => {
    let bookmarks = await chrome.bookmarks.getTree();
    function recursiveLookup(tree, acc){
        let arr = acc;
        for (const item of tree){
            if (item.children) {
                arr.push(item);
                recursiveLookup(item.children, arr);
            }
        }
        return arr;
    }
    return recursiveLookup(bookmarks, []);
}

const openBookmark = async (random) => {
    chrome.storage.sync.get(['targetFolder'], async (res) => {
        let tree = await chrome.bookmarks.getSubTree(res.targetFolder.id);
        tree = tree[0].children;
        let bookmarks = [];
        const recursiveLookup = (elem, acc) => {
            const arr = acc;
            for (let i = 0; i < elem.length; i++){
                if (!elem[i].children) {
                    arr.push(elem[i]);
                } else {
                    recursiveLookup(elem[i].children, arr);
                }
            }
            return arr;
        }
        bookmarks = recursiveLookup(tree, bookmarks);
        const bookmark = random ? bookmarks[getRandomInt(0, bookmarks.length - 1)] : bookmarks.shift();
        await chrome.tabs.create({
            active: true,
            url: bookmark.url
        });
        await chrome.bookmarks.remove(bookmark.id);
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message == 'get-bookmark') {
        openBookmark();
        sendResponse('Bookmark Get');
    } 
    if (message == 'get-rando'){
        openBookmark(true);
        sendResponse('Rando Get');
    }
    if (message == 'update-cache'){
        targetFolder().then(sendResponse);
        return true;
    }
});
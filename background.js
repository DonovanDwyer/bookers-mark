const targetFolder = async () => {
    let x = await chrome.bookmarks.getTree();
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
    return recursiveLookup(x, []);
}

const openNextBookMark = async () => {
    // console.log(await chrome.bookmarks.getTree());
    let tree = await chrome.bookmarks.getSubTree("707");
    tree = tree[0].children;

    let bookmarks = [];
    
    const recursiveLookup = (elem, acc) => {
        console.log(elem, acc);
        let arr = acc;
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

    let bookmark = bookmarks.shift();
    await chrome.tabs.create({
        active: true,
        url: bookmark.url
    });
    await chrome.bookmarks.remove(bookmark.id);
}

const openRandoBookMark = async () => {
    // console.log(await chrome.bookmarks.getTree());
    let tree = await chrome.bookmarks.getSubTree("707");
    tree = tree[0].children;

    let bookmarks = [];
    
    const recursiveLookup = (elem, acc) => {
        console.log(elem, acc);
        let arr = acc;
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

    let length = bookmarks.length - 1;
    let bookmark = bookmarks[getRandomInt(0, length)];
    await chrome.tabs.create({
        active: true,
        url: bookmark.url
    });
    await chrome.bookmarks.remove(bookmark.id);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message == 'get-bookmark') {
        openNextBookMark();
        sendResponse('Bookmark Get');
    } else if (message == 'get-rando'){
        openRandoBookMark();
        sendResponse('Rando Get');
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message == 'update-cache'){
        targetFolder().then(sendResponse);
        return true;
    }
})
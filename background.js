const openBkMkInNewTab = async () => {
    // const children = await chrome.bookmarks.getSubTree("1555");
    // await chrome.tabs.create({
    //     active: true,
    //     url: children[0].children[0].url
    // });
    // let x = children[0].children[0].id;
    // console.log(x);
    // console.log(await chrome.bookmarks.getTree());
    // await chrome.bookmarks.remove(x);
}

const openNextBookMark = async () => {
    let tree = await chrome.bookmarks.getSubTree("674");
    tree = tree[0].children;
    let length = tree.length - 1;
    let bookmark = tree.shift();
    console.log(length, bookmark, tree);
    // folders have children, bookmarks do not
    if (bookmark.children){
        bookmark = bookmark.children.shift();
        console.log('hit a folder');
    }
    await chrome.tabs.create({
        active: true,
        url: bookmark.url
    });
    // console.log(x);
    // console.log(await chrome.bookmarks.getTree());
    // await chrome.bookmarks.remove(x);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message == 'get-bookmark') {
        openNextBookMark();
        sendResponse('Bookmark Get');
    } else if (message == 'get-rando'){
        sendResponse('Rando Get');
    }
})
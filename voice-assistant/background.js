//taking request from content script and work acording to the message
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log("Received %o from %o, frame", msg, sender.tab, sender.frameId);
    sendResponse("Gotcha!");
    if (msg.text == "new tab") {
        chrome.tabs.create({
            url: 'https://google.com'
        });
    }
    else if (msg.text == "close this tab") {
        chrome.tabs.remove(sender.tab.id);
    }
    else if (msg.text == "add bookmark") {
        chrome.bookmarks.getTree(node => {
            console.log(node)
            if (node[0].children[1].children[0].title != 'Extension bookmarks') {
                chrome.bookmarks.create(
                    { 'parentId': node.id, 'title': 'Extension bookmarks' },
                    function (newFolder) {
                        console.log("added folder: " + newFolder.title);
                    },
                );
            }
            chrome.bookmarks.create({
                'parentId': node[0].children[1].children[0].id,
                'title': sender.tab.title,
                'url': sender.tab.url,
            });
        })
    }
    else if (msg.text == "remove bookmark") {
        chrome.bookmarks.getTree(node => {
            for (let i = 0; i < node[0].children[1].children[0].children.length; i++) {
                if (node[0].children[1].children[0].children[i].url == sender.tab.url) {
                    chrome.bookmarks.remove(node[0].children[1].children[0].children[i].id)
                }
            }
        })
    }
    else if (msg.text == "close other tab") {
        chrome.tabs.query({ windowId: sender.tab.windowId }, (tab) => {
            tab.forEach(element => {
                console.log(element)
                if (element.active == false) {
                    chrome.tabs.remove(element.id);
                }
            });
        });
    }
    else if (msg.text == "new window") {
        chrome.windows.create({
            url: chrome.runtime.getURL("my-new-tab.html")
        });
    }
    else if (msg.text == "close window") {
        chrome.tabs.query({ windowId: sender.tab.windowId }, (tabs) => {
            for (let i = 0; i < tabs.length; i++) {
                chrome.tabs.remove(tabs[i].id);
                console.log(tabs[i].id)
            }
        });
    }
    else if (msg.text.includes("https://www.google.com/search?q=")) {
        chrome.tabs.create({
            url: msg.text
        });
    }
    else if (msg.text == "move this to prev tab") {
        chrome.tabs.move(sender.tab.id, { 'index': sender.tab.index - 1 })
    }
    else if (msg.text == "move this to next tab") {
        chrome.tabs.move(sender.tab.id, { 'index': sender.tab.index + 1 })
    }
    else if (msg.text == "refresh") {
        chrome.tabs.update(sender.tab.id, { 'url': sender.tab.url });
    }
    else if (msg.text == "open next tab") {
        chrome.tabs.query({ windowId: sender.tab.windowId }, (tabs) => {
            chrome.tabs.update(tabs[sender.tab.index].id, { 'active': false });
            chrome.tabs.update(tabs[sender.tab.index + 1].id, { 'active': true })
        });
    }
    else if (msg.text == "open previous tab") {
        chrome.tabs.query({ windowId: sender.tab.windowId }, (tabs) => {
            chrome.tabs.update(tabs[sender.tab.index].id, { 'active': false });
            chrome.tabs.update(tabs[sender.tab.index - 1].id, { 'active': true })
        });
    }
    else if (msg.text == "delete history") {
        chrome.history.deleteAll(function () {
            location.reload();
        });
    }
    else if (msg.text == "delete cookies") {
        chrome.cookies.getAll({ url: sender.tab.url },
            cookie => {
                if (cookie) {
                    console.log(cookie)
                    cookie.forEach(el => {
                        chrome.cookies.remove({ url: sender.tab.url + el.path, name: el.name }, () => {
                            console.log("removed")
                        })

                    });

                }
                else {
                    console.log('Can\'t get cookie!');
                }
            });
    }
    else if (msg.greeting != "" ) {
        chrome.tabs.create({
            url: msg.text
        });
    }
});


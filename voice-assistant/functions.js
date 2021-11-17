//after detecting main keyword run this function
function doWork() {
    //recongnize voice and setting what to do
    var recog = new SpeechAPI({ interimResults: true });
    recog.start(function (transcript) {
        if (transcript != "") {
            console.log(transcript)
            if (transcript.includes("Mohit")) {
                var ttsRecorder = new SpeechSynthesisRecorder(text = "Yes what can I do?");
                ttsRecorder.start()
                return setTimeout(doWork, 1500);
            }
            else if (transcript.includes("open new tab")) {
                var ttsRecorder = new SpeechSynthesisRecorder(text = "new tab opened");
                ttsRecorder.start()
                newTab();
                return setTimeout(doWork, 1500);
            }
            else if (transcript.includes("close this tab")) {
                var ttsRecorder = new SpeechSynthesisRecorder(text = "closed this tab");
                ttsRecorder.start()
                closeThisTab();
                return setTimeout(doWork, 1500);
            }
            else if (transcript.includes("close other tabs")) {
                var ttsRecorder = new SpeechSynthesisRecorder(text = "closed other tabs");
                ttsRecorder.start()
                closeOtherTab();
                return setTimeout(doWork, 1500);
            }
            else if (transcript.includes("move this tab to next tab")) {
                var ttsRecorder = new SpeechSynthesisRecorder(text = "Moved to next tab");
                ttsRecorder.start()
                moveNextTab();
                return setTimeout(doWork, 1500);
            }
            else if (transcript.includes("move this tab to previous tab")) {
                var ttsRecorder = new SpeechSynthesisRecorder(text = "Moved to previous tab");
                ttsRecorder.start()
                movePrevTab();
                return setTimeout(doWork, 1500);
            }
            else if (transcript.includes("open new window")) {
                var ttsRecorder = new SpeechSynthesisRecorder(text = "new window opened");
                ttsRecorder.start()
                newWindow()
                return setTimeout(doWork, 1500);
            }
            else if (transcript.includes("close this window")) {
                closeWindow()
            }
            else if (transcript.includes("search")) {
                var ttsRecorder = new SpeechSynthesisRecorder(text = "searching");
                ttsRecorder.start()
                search(transcript)
                return setTimeout(doWork, 1500);
            }
            else if (transcript.includes("refresh")) {
                var ttsRecorder = new SpeechSynthesisRecorder(text = "refreshing");
                ttsRecorder.start()
                refresh();
                return setTimeout(doWork, 1500);
            }
            else if (transcript == "scroll down") {
                var ttsRecorder = new SpeechSynthesisRecorder(text = "Scrolled");
                ttsRecorder.start()
                window.scrollBy(0, 450);
                return setTimeout(doWork, 1500);
            }
            else if (transcript == "scroll up") {
                var ttsRecorder = new SpeechSynthesisRecorder(text = "Scrolled");
                ttsRecorder.start()
                window.scrollBy(0, -450);
                return setTimeout(doWork, 1500);
            }
            else if (transcript == "scroll bottom") {
                var ttsRecorder = new SpeechSynthesisRecorder(text = "Scrolled");
                ttsRecorder.start()
                window.scrollTo(0, document.body.scrollHeight);
                return setTimeout(doWork, 1500);
            }
            else if (transcript == "scrolltop") {
                var ttsRecorder = new SpeechSynthesisRecorder(text = "Scrolled");
                ttsRecorder.start()
                window.scrollTo(0, -document.body.scrollHeight);
                return setTimeout(doWork, 1500);
            }
            else if (transcript.includes("add bookmark")) {
                var ttsRecorder = new SpeechSynthesisRecorder(text = "added to bookmark");
                ttsRecorder.start()
                addBookmark();
                return setTimeout(doWork, 1500);
            }
            else if (transcript.includes("remove bookmark")) {
                var ttsRecorder = new SpeechSynthesisRecorder(text = "removed to bookmark");
                ttsRecorder.start()
                removeBookmark();
                return setTimeout(doWork, 1500);
            }
            else if (transcript.includes("Open next tab")) {
                var ttsRecorder = new SpeechSynthesisRecorder(text = "opened next tab");
                ttsRecorder.start()
                openNextTab();
                return setTimeout(doWork, 1500);
            }
            else if (transcript.includes("open previous tab")) {
                var ttsRecorder = new SpeechSynthesisRecorder(text = "opened previous tab");
                ttsRecorder.start()
                openPrevTab();
                return setTimeout(doWork, 1500);
            }
            else if (transcript.includes("delete history")) {
                var ttsRecorder = new SpeechSynthesisRecorder(text = "history deleted");
                ttsRecorder.start()
                deleteHistory();
                return setTimeout(doWork, 1500);
            }
            else if (transcript.includes("delete cookies")) {
                var ttsRecorder = new SpeechSynthesisRecorder(text = "cookies deleted");
                ttsRecorder.start()
                deleteCookies();
                return setTimeout(doWork, 1500);
            }
            else if (transcript.includes("go to") || transcript.includes("redirect to")) {
                openlink(transcript);
                return setTimeout(doWork, 1500);
            }
            else {
                var ttsRecorder = new SpeechSynthesisRecorder(text = "can you say that again");
                ttsRecorder.start()
                return setTimeout(doWork, 1500);
            }

        }
    });
}

//delete cookies from current url
function deleteCookies() {
    chrome.runtime.sendMessage({ text: "delete cookies" }, function (response) {
        console.log("Response: ", response);
    });
}

//open a perticular link
function openlink(link) {
    var mylink = link;
    var Searchindex = mylink.indexOf("to") + 2;
    var searchKey = mylink.slice(Searchindex);
    console.log(searchKey);
    if (mylink.includes("go to")){
        var ttsRecorder = new SpeechSynthesisRecorder(text = 'going to' + searchKey);
        ttsRecorder.start()
        }
        else if (mylink.includes("redirect to")){
            var ttsRecorder = new SpeechSynthesisRecorder(text = 'redirecting to' + searchKey);
            ttsRecorder.start()  
        }
    var url = "https://www."+ searchKey.trim();
    chrome.runtime.sendMessage({ greeting: "Open", text: url}, function (response) {
        console.log("Response: ", response);
    });
}
//delete history
function deleteHistory() {
    chrome.runtime.sendMessage({ text: "delete history" }, function (response) {
        console.log("Response: ", response);
    });
}
//open previous tab
function openPrevTab() {
    chrome.runtime.sendMessage({ text: "open previous tab" }, function (response) {
        console.log("Response: ", response);
    });
}
//open next tab
function openNextTab() {
    chrome.runtime.sendMessage({ text: "open next tab" }, function (response) {
        console.log("Response: ", response);
    });
}
//add bookmark
function addBookmark() {
    chrome.runtime.sendMessage({ text: "add bookmark" }, function (response) {
        console.log("Response: ", response);
    });
}
//add bookmark
function removeBookmark() {
    chrome.runtime.sendMessage({ text: "remove bookmark" }, function (response) {
        console.log("Response: ", response);
    });
}
//refresh current page
function refresh() {
    chrome.runtime.sendMessage({ text: "refresh" }, function (response) {
        console.log("Response: ", response);
    });
}
//open new tab
function newTab() {
    chrome.runtime.sendMessage({ text: "new tab" }, function (response) {
        console.log("Response: ", response);
    });
}
//close this tab
function closeThisTab() {
    chrome.runtime.sendMessage({ text: "close this tab" }, function (response) {
        console.log("Response: ", response);
    });
}
//close other tabs
function closeOtherTab() {
    chrome.runtime.sendMessage({ text: "close other tab" }, function (response) {
        console.log("Response: ", response);
    });
}
// move this tab to next tab
function moveNextTab() {
    chrome.runtime.sendMessage({ text: "move this to next tab" }, function (response) {
        console.log("Response: ", response);
    });
}
// move this tab to previous tab
function movePrevTab() {
    chrome.runtime.sendMessage({ text: "move this to prev tab" }, function (response) {
        console.log("Response: ", response);
    });
}
//open new window
function newWindow() {
    chrome.runtime.sendMessage({ text: "new window" }, function (response) {
        console.log("Response: ", response);
    });
}
//close this wimdow
function closeWindow() {
    chrome.runtime.sendMessage({ text: "close window" }, function (response) {
        console.log("Response: ", response);
    });
}
// search anything in serch engine
function search(text) {
    var mytext = text;
    var Searchindex = mytext.indexOf("search") + 6;
    var searchKey = mytext.slice(Searchindex);
    console.log(searchKey);
    var url = "https://www.google.com/search?q=" + searchKey.trim().replace(" ", "+");
    chrome.runtime.sendMessage({ text: url }, function (response) {
        console.log("Response: ", response);
    });
}




/*

This features added in extension

1. open new tab
2. close this tab 
3. close other tabs 
4. move this tab to next tab
5. move this tab to previous tab
6. open new window
7. close this window
8. search (on google search engine)
9. refresh current page
10. scroll down
11. scroll up
12. scroll bottom
13. scroll top
14. add bookmark
15. remove bookmark
16. Open next tab
17. open previous tab
18. delete history
19. go to/ redirect to example.com
20. delete cookies
*/




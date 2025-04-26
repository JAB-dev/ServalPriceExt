chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if ( (tab.url.indexOf("takealot.com") > -1 ) && (tab.url.indexOf("PLID") > -1) ) {
        chrome.tabs.sendMessage(tabId, {message: "OnTakealot"});
    }
}
);

chrome.runtime.onInstalled.addListener((details) => {
    // Check if values already exist, and set defaults only if they don't
    chrome.storage.local.get(['enableLittleButton', 'theme'], (result) => {
        if (result.enableLittleButton === undefined) {
            chrome.storage.local.set({ enableLittleButton: false });
        }
        if (result.theme === undefined) {
            chrome.storage.local.set({ theme: 'modern' });
        }
    });
    
    if (details.reason === "install" || details.reason === "update") {
        const optionsUrl = chrome.runtime.getURL('options.html');
        const urlWithParam = `${optionsUrl}?reason=${details.reason}`;
        chrome.tabs.create({ url: urlWithParam });
    }
});

async function fetchData(url) {
    //we want to extract  the 8 digit code after PLID from the url and return https://www.servaltracker.com/products/PLIDXXXXXXXX/
    //Loop through url and find the index of PLID
    for (let i = 0; i < url.length-5; i++) {
        if (url[i] === "P" && url[i + 1] === "L" && url[i + 2] === "I" && url[i + 3] === "D") {
            //we found the index of PLID
            //now we want to extract the 8 digit code after PLID
            let code = "";
            for (let j = i + 4; j < i + 12; j++) {
                code += url[j];
            }
            return `https://www.servaltracker.com/products/PLID${code}/`;
        }
    }
    //If we finish the for loop that means we did not find the index of PLID
    //so we return null 
    return null;

}

const OnClickEventHandler = () => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        fetchData(url).then(data => {
            if (data != null) {
               chrome.tabs.create({url: data});
            }else{
                alert("Doesn't seem to be a valid takealot url, ensure you have the product page open");
            }
        });
    });
}

//when I receive a message from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "ButtonClicked") {
        OnClickEventHandler();
    }
});

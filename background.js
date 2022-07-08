//alert the contentscript when we are on takealot.com and "PLID" is in the url
//create a listener
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if ( (tab.url.indexOf("takealot.com") > -1 ) && (tab.url.indexOf("PLID") > -1) ) {
        chrome.tabs.sendMessage(tabId, {message: "OnTakealot"});
    }
}
);

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
//Function OnClickEventHandler()
const OnClickEventHandler = () => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        // use `url` here inside the callback because it's asynchronous!
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

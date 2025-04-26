//lambda function
(() => {
    //Function OnClickEventHandler()
    const OnClickEventHandler = () => {
        //send a message so the background script can create a new tab
        chrome.runtime.sendMessage({message: "ButtonClicked"});
    }

    //listen for the message from the background script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        //if the message is "OnTakealot"
        if (request.message === "OnTakealot") {
            //alert the contentscript
            CreateButton();
        }
    });

    //Function CreateButton()
    const CreateButton = () => {
        //only create the button once
        if (document.getElementById("takealot-button") === null) {
            //create a button, that will actually be an image
            let button = document.createElement("img");
            button.id = "takealot-button";
            //set the src of the button to the image
            button.src = "https://github.com/JAB-dev/ServalPriceExt/blob/main/PriceButton.png?raw=true";

            //set the button's style
            chrome.storage.local.get('theme', function(result) {
                // Check if the 'theme' value exists in local storage
                if (result.theme) {
                    // Perform the necessary action based on the selected theme value
                    if (result.theme === 'classic') {
                        // Change the link to the classic theme
                        button.src = "https://github.com/JAB-dev/ServalPriceExt/blob/main/PriceButtonClassic.png?raw=true";
                    }
                }
            });

            //set the button's text
            button.title = "Click me to open on servaltracker.com";
            //add the button to class "pdp-main-panel"
            document.getElementsByClassName("pdp-main-panel")[0].appendChild(button);
            //add the listener to the button
            button.addEventListener("click", () => {
                //Call a function OnClickEventHandler()
                OnClickEventHandler();
            });
            //shrink the button to be half of its parent
            button.style.width = "100%";
            button.style.height = "5%";
            //border to make it more obvious its a button
            button.style.border = "1px solid black";
        }
    }

    //create a button when the page loads, in the effort of removing edge cases
    CreateButton();
})();
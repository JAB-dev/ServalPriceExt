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
            button.src = "https://www.servaltracker.com/static/images/logo/serval_1024x1024.png";
            //set the button's text
            button.title = "Click me to open on servaltracker.com";
            //add a button to the class starting with "buybox-actions"
            document.getElementsByClassName("buybox-actions")[0].appendChild(button);
            //add the button to class "pdp-main-panel"
            document.getElementsByClassName("pdp-main-panel")[0].appendChild(button);
            //add the listener to the button
            button.addEventListener("click", () => {
                //Call a function OnClickEventHandler()
                OnClickEventHandler();
            });
        }
    }

    //create a button when the page loads, in the effort of removing edge cases
    CreateButton();

})();














    // button=document.getElementById("showPrice");
    // if(button==null){
    //     button=document.createElement("button");
    //     button.id="showPrice";
    //     button.innerHTML="Show price chart";
    //     //button should be big as well
    //     button.style.fontSize="20px";
    //     button.onclick=()=>{
    //         //send a message to the background script to get the price
    //         chrome.runtime.sendMessage({message:"GetPrice"});
    //     }
    //     div=document.querySelector("div[class^='pdp-module_sidebar-buybox']");
    //     while (div==null){
    //         div=document.querySelector("div[class^='pdp-module_sidebar-buybox']");
    //     }
    //     if (div != null) {
    //         div.appendChild(button);
    //     }else{
    //         alert("notfind")
    //     }
    // }

(() => {
    const OnClickEventHandler = () => {
        chrome.runtime.sendMessage({message: "ButtonClicked"});
    }

    // Listen for the message from the background script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.message === "OnTakealot") {
            // Apply settings, which will fetch from storage and then create the button
            ApplySettings();
        }
    });

    const CreateButton = (theme, isLittleButton) => {
        const buttonId = isLittleButton ? "little-button" : "takealot-button";
        if (document.getElementById(buttonId) === null) {
            let button = document.createElement("img");
            button.id = buttonId;
            button.src = theme === 'classic'
                ? "https://github.com/JAB-dev/ServalPriceExt/blob/main/PriceButtonClassic.png?raw=true"
                : "https://github.com/JAB-dev/ServalPriceExt/blob/main/PriceButton.png?raw=true";

            button.title = "Click me to open on servaltracker.com";
            const targetElement = isLittleButton
                ? document.querySelector(".buybox-actions-container")
                : document.getElementsByClassName("pdp-main-panel")[0];

            if (targetElement) {
                if (isLittleButton) {
                    targetElement.insertAdjacentElement("beforebegin", button);
                } else {
                    targetElement.appendChild(button);
                }
                button.addEventListener("click", () => {
                    OnClickEventHandler();
                });
            } else {
                console.error("Target element not found for button insertion.");
            }

            // Apply styles based on button type
            button.style.width = isLittleButton ? "100%" : "fit-content";
            button.style.maxWidth = isLittleButton ? "100%" : "90%";
            button.style.height = isLittleButton ? "3%" : "4%";
            button.style.maxHeight = isLittleButton ? "3%" : "4%";
            button.style.border = theme === 'classic' ? "1px solid black" : "0px"; 
            button.style.objectFit = "contain";
            button.style.marginTop = isLittleButton ? "5px" : "10px";
            button.style.marginBottom = isLittleButton ? "5px" : "10px";
            button.style.display = "inline-block";
            button.style.boxSizing = "border-box";
            button.style.padding = "0";
            button.style.backgroundColor = "transparent";
            button.style.borderRadius = isLittleButton ? "4px" : "20px";
        }
    };

    const ApplySettings = () => {
        chrome.storage.local.get(['enableLittleButton', 'theme'], function(result) {
            const isLittleButton = result.enableLittleButton || false;
            const theme = result.theme || 'modern';

            // Remove any existing buttons to avoid duplicates
            const existingLargeButton = document.getElementById("takealot-button");
            const existingLittleButton = document.getElementById("little-button");
            if (existingLargeButton) existingLargeButton.remove();
            if (existingLittleButton) existingLittleButton.remove();

            CreateButton(theme, isLittleButton);
        });
    };

    // Listen for changes in storage and reapply settings
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === "local" && (changes.enableLittleButton || changes.theme)) {
            ApplySettings();
        }
    });

    // Initial application of settings might still be needed depending on injection timing,
    // but ApplySettings will also be called by the OnTakealot message if the page matches.
    ApplySettings();
})();
(() => {
    // Get the select element by its id
    var selectElement = document.getElementById('theme');

    //make sure the currently selected theme is selected in the dropdown
    chrome.storage.local.get('theme', function(result) {
        // Check if the 'theme' value exists in local storage
        if (result.theme) {
            // Perform the necessary action based on the selected theme value
            if (result.theme === 'classic') {
                //make sure the first option value is actually  <option value="classic">Classic Yellow</option>
                selectElement.value = "classic";
            }
        }
    });
    
    // Add event listener to detect changes
    selectElement.addEventListener('change', function() {
        // Get the selected value
        var selectedValue = selectElement.value;

        // Store the selected value in local storage
        chrome.storage.local.set({ theme: selectedValue });
    });


})();
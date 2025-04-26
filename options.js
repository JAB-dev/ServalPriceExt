document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const reason = urlParams.get('reason');

    const messageDiv = document.getElementById('install-update-message');

    if (reason === 'install' && messageDiv) {
        messageDiv.textContent = "Welcome! Thanks for installing Serval Price Extension. Configure your preferences below.";
        messageDiv.style.display = 'block';
    } else if (reason === 'update' && messageDiv) {
        messageDiv.textContent = "Serval Price Extension has been updated! Check out the new small button option below.";
        messageDiv.style.display = 'block';
    }

    // Load saved settings
    chrome.storage.local.get(['theme', 'enableLittleButton'], (result) => {
        if (result.theme) {
            document.getElementById('theme').value = result.theme;
        }
        if (result.enableLittleButton !== undefined) {
            document.getElementById('little-button').checked = result.enableLittleButton;
        }
    });

    // Save theme selection
    document.getElementById('theme').addEventListener('change', (event) => {
        chrome.storage.local.set({ theme: event.target.value }, () => {
            console.log(`Theme set to ${event.target.value}`);
        });
    });

    // Save little button checkbox state
    document.getElementById('little-button').addEventListener('change', (event) => {
        chrome.storage.local.set({ enableLittleButton: event.target.checked }, () => {
            console.log(`Enable Little Button set to ${event.target.checked}`);
        });
    });
});
window.addEventListener('load', () => {
    const apiKeyInput = document.getElementById('api-key');
    apiKeyInput.type = 'password';

    chrome.storage.local.get('apiKey', ({ apiKey }) => {
        if (apiKey) {
            apiKeyInput.value = apiKey;
        }
    });

    const submit = document.getElementById('submit');
    submit.addEventListener('click', (event) => {
        event.preventDefault();
        const apiKey = apiKeyInput.value;
        chrome.storage.local.set({ apiKey: apiKey });
    });
});
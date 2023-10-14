function setupContextMenu() {
    chrome.contextMenus.create({
        id: 'explain-word',
        title: 'Explain word',
        contexts: ['selection']
    });
}

chrome.runtime.onInstalled.addListener(() => {
    setupContextMenu();
});

chrome.contextMenus.onClicked.addListener((data) => {
    chrome.runtime.sendMessage({
        name: 'explain-word',
        data: { value: data.selectionText }
    });
});

chrome.runtime.onMessage.addListener(async ({ name, data }) => {
    if (name === 'request-to-chat') {
        let answer = ''

        try {
            const apiKey = await new Promise(resolve => chrome.storage.local.get(['apiKey'], result => resolve(result.apiKey)));
            const apiModel = "gpt-3.5-turbo-16k";
            const message = [
                {
                    "role": "system",
                    "content": "You an Estonian language interpreter. You explain meaning of words or phrase using simple A2 level Estonian. \nYou also provide couple examples.\nBe precise and short."
                },
                {
                    role: "user",
                    "content": data.value
                }]

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    "model": apiModel,
                    "messages": message,
                    "temperature": 1,
                    "max_tokens": 256,
                    "top_p": 1,
                    "frequency_penalty": 0,
                    "presence_penalty": 0
                })
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch. Status code: ${response.status}`);
            }

            const responseData = await response.json();

            if (responseData && responseData.choices && responseData.choices.length > 0) {
                answer = responseData.choices[0].message.content;
            }
        } catch (error) {
            answer = `${error}`;
        }

        chrome.runtime.sendMessage({
            name: 'response-from-chat',
            data: { value: answer }
        });
    }
});
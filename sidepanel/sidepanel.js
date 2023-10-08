  
  chrome.runtime.onMessage.addListener(({ name, data }) => {
    if (name === 'explain-word') {
      document.body.querySelector('#select-info').style.display = 'none';
  
      document.body.querySelector('#selected').innerText = data.value;
      document.body.querySelector('#examples').innerText = 'Loading...';
      
      const requestToChat = `Provide three simple sentences in Estonian with using word '${data.value}' for better understanding the meaning of it.`
      chrome.runtime.sendMessage({
        name: 'request-to-chat',
        data: { value: requestToChat }
      });
    }

    if (name === "response-from-chat") {
      document.body.querySelector('#examples').innerText = data.value;
    }
  });
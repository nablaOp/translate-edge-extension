  
  chrome.runtime.onMessage.addListener(({ name, data }) => {
    console.log('name: ', name);
    if (name === 'explain-word') {
      document.body.querySelector('#select-info').style.display = 'none';
  
      document.body.querySelector('#selected').innerText = data.value;
      document.body.querySelector('#examples').innerText = "examples";
    }
  });
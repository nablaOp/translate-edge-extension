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

(async () => {
  await addButton()
})();

async function addButton() {
  const buttonContainer = document.querySelector('.layout-row-end');
  const buttonFromContainer = buttonContainer?.querySelector('button');

  var downloadButton = document.createElement('button');

  const path = chrome.runtime.getURL("assets/download-icon.svg");
  const response = await fetch(path);
  const svgText = await response.text()
  
  downloadButton.innerHTML = svgText;

  downloadButton.addEventListener("click", () => {
    alert("Button was clicked!");
  });

  if (buttonFromContainer) {
    downloadButton.className = buttonFromContainer.className
  }

  buttonContainer?.appendChild(downloadButton);
}

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.message != "getOrderId") {
    return
  }
  const pubhubReaderDiv = document.querySelector('#pubhub-reader');
  const orderId = pubhubReaderDiv?.getAttribute('order-id');
  sendResponse(orderId);
}
);
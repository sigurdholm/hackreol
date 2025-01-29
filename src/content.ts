chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    if (request.message != "getOrderId") {
      return
    }
    const pubhubReaderDiv = document.querySelector('#pubhub-reader');
    const orderId = pubhubReaderDiv?.getAttribute('order-id');
    sendResponse(orderId);
  }
);
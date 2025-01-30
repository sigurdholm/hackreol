chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action !== "download") {
        return;
    }

    const url = message.url;
    const title = message.title;

    chrome.downloads.download({
        url: url,
        filename: `${title}.epub`
    });

    return true;
});
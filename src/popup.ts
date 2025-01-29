import { EpubResponse } from "./models/EpubResponse";
import { FileService } from "./services/FileService";
import { MetadataService } from "./services/MetadataService";

async function downloadEpub() {
    const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
    const activeTab = tabs[0];

    const orderId = await chrome.tabs.sendMessage(activeTab.id as number, { "message": "getOrderId" }); 
    
    const metadata = await MetadataService.getMetadata(orderId);
    const fileData = await FileService.getFile(metadata);
    
    const blob = new Blob([fileData], { type: 'application/epub+zip' });
    const url = URL.createObjectURL(blob);

    chrome.downloads.download({
        url: url,
        filename: `${metadata.title}.epub`
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("clickMe")?.addEventListener("click", downloadEpub);
});
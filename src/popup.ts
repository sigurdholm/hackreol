import { EpubResponse } from "./models/EpubResponse";
import { FileService } from "./services/FileService";
import { MetadataService } from "./services/MetadataService";

function downloadEpub() {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id as number, { "message": "getOrderId" }, async (orderId) => {

            const metadata = await MetadataService.getMetadata(orderId);
            const fileData = await FileService.getFile(metadata);
            const blob = new Blob([fileData], { type: 'application/epub+zip' });
            const url = URL.createObjectURL(blob);

            chrome.downloads.download({
                url: url,
                filename: `${metadata.title}.epub`
            });

            // chrome.runtime.sendMessage({ action: 'downloadEpub', data: orderId }, (response) => {
            //     if (response) {
            //         const epubResponse = response as EpubResponse;
            //         const blob = epubResponse.blob as Blob
            //         console.log(`title: ${epubResponse.metadata.title}`)

            //         console.log(blob instanceof Blob);
            //         const url = URL.createObjectURL(blob);

            //         chrome.downloads.download({
            //             url: url,
            //             filename: `${epubResponse.metadata.title}.epub`
            //         });
            //     }
            // });
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("clickMe")?.addEventListener("click", downloadEpub);
});
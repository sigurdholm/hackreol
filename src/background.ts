import { EpubResponse } from "./models/EpubResponse";
import { FileService } from "./services/FileService";
import { MetadataService } from "./services/MetadataService";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action !== 'downloadEpub' || !message.data) {
        console.log("hey");
        return
    }

    (async () => {
        const orderId = message.data;

        const metadata = await MetadataService.getMetadata(orderId);
        const fileData = await FileService.getFile(metadata);
        const blob = new Blob([fileData], { type: 'application/epub+zip' });

        const response: EpubResponse = { metadata: metadata, blob: blob };
        console.log(response.blob instanceof Blob);
        sendResponse(response);
    })();

    // fetchEpub(orderId).then(sendResponse);

    return true;
});

// TODO: Use this later
async function fetchEpub(orderId: string): Promise<EpubResponse> {
    const metadata = await MetadataService.getMetadata(orderId);
    const fileData = await FileService.getFile(metadata);

    const blob = new Blob([fileData], { type: 'application/epub+zip' });

    const response: EpubResponse = { metadata: metadata, blob: blob };
    return response;
}

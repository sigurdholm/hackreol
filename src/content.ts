import { FileService } from "./services/FileService";
import { MetadataService } from "./services/MetadataService";

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

  downloadButton.addEventListener("click", async () => {
    await downloadEpub();
  });

  if (buttonFromContainer) {
    downloadButton.className = buttonFromContainer.className
  }

  buttonContainer?.appendChild(downloadButton);
}

async function downloadEpub() {
  const pubhubReaderDiv = document.querySelector('#pubhub-reader');
  const orderId = pubhubReaderDiv?.getAttribute('order-id');

  if (!orderId) {
    // TODO: Add error
    return;
  }

  const metadata = await MetadataService.getMetadata(orderId);
  const fileData = await FileService.getFile(metadata);

  const blob = new Blob([fileData], { type: 'application/epub+zip' });
  const url = URL.createObjectURL(blob);

  chrome.runtime.sendMessage({ action: "download", title: metadata.title, url: url });
}
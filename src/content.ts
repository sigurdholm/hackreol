import { FileService } from "./services/FileService";
import { MetadataService } from "./services/MetadataService";
import { Constants } from "./common/Constants";

// "Main" function
(async () => {
  await addButton()
})();

async function addButton() {
  const buttonContainer = document.querySelector('.layout-row-end');
  const buttonFromContainer = buttonContainer?.querySelector('button');

  const downloadButton = document.createElement('button');

  // Set button icon (SVG) 
  downloadButton.innerHTML = Constants.DOWNLOAD_ICON;

  if (buttonFromContainer) {
    // Make button match style of other buttons in the container
    downloadButton.className = buttonFromContainer.className
  }

  // Set button action
  downloadButton.addEventListener("click", async () => {
    await downloadEpub();
  });

  // Add button to container
  buttonContainer?.appendChild(downloadButton);
}

async function downloadEpub() {
  // Get Pubhub div from DOM
  const pubhubReaderDiv = document.querySelector('#pubhub-reader');
  if (!pubhubReaderDiv) {
    alert("Pub Hub div could not be found");
    return;
  }

  // Get order id from div attribute
  const orderId = pubhubReaderDiv.getAttribute('order-id');
  if (!orderId) {
    alert("Order ID could not be found");
    return;
  }

  try {
    // Fetch content
    const metadata = await MetadataService.getMetadata(orderId);
    const fileData = await FileService.getFile(metadata);

    // Format data
    const blob = new Blob([fileData], { type: 'application/epub+zip' });
    const url = URL.createObjectURL(blob);
    const fileName = `${metadata.author} - ${metadata.title}.epub`

    // Download by utilizing a temporary hyperlink tag
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click(); // Trigger the download
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error: any) {
    alert(`Error occured while fetching epub: ${error.message}`);
  }
}
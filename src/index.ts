import { KeyDecryptor } from './utils/KeyDecryptor';
import { AesCtrEncryptionEngine } from './utils/AesCtrEncryptionEngine';
import fs from 'fs';

const encryptedKey = "HSjPMbL+kyyiLpDit6dI/IgVTpFgaNGp143gXASBDQY=";
const url = "https://bookstreaming.pubhub.dk/v1/order/file/45b0e882-cd3c-4a1d-8645-a59991506ab0";

(async () => {
    const decryptedKey = await KeyDecryptor.decrypt(encryptedKey);
    const encryptionEngine = new AesCtrEncryptionEngine(decryptedKey);

    const response = await fetch(url);
    const encryptedData = await response.arrayBuffer();
    const data = encryptionEngine.decrypt(encryptedData, 0);
    const buffer = Buffer.from(data); 
    
    await fs.promises.writeFile("./file.epub", buffer);

    console.log("done!");
})()



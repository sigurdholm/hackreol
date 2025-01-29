import { Constants } from "../common/Constants";
import { Metadata } from "../models/Metadata";
import { KeyDecryptor } from "../utils/KeyDecryptor";
import { AesCtrEncryptionEngine } from "../utils/AesCtrEncryptionEngine";

export class FileService {
    static async getFile(metadata: Metadata): Promise<ArrayBuffer> {
        const url = `${Constants.API_BASE}/${Constants.FILE_ENDPOINT}/${metadata.orderId}`;
        const response = await fetch(url); 
        const encryptedData = await response.arrayBuffer();
        const decryptedKey = await KeyDecryptor.decrypt(metadata.key);
        const encryptionEngine = new AesCtrEncryptionEngine(decryptedKey);
        const data = encryptionEngine.decrypt(encryptedData, 0);
        return data
    }
}
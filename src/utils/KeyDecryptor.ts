import { Constants } from '../common/Constants';
import { Buffer } from 'buffer';

export class KeyDecryptor {
  static async decrypt(encryptedKey: string): Promise<Uint8Array> {
    const encryptedKeyBuffer = Buffer.from(encryptedKey, 'base64');

    const importedKey = await crypto.subtle.importKey(
      "raw",
      Constants.keyEncryptionKey,
      { name: "AES-CBC" },
      false,
      ["decrypt"]
    );

    const decryptedKeyBuffer = await crypto.subtle.decrypt(
      {
        name: "AES-CBC",
        iv: Constants.keyEncryptionIv
      },
      importedKey,
      encryptedKeyBuffer
    );

    return new Uint8Array(decryptedKeyBuffer);
  }
}

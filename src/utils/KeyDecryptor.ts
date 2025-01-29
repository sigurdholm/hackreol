import { Constants } from '../common/Constants';
import { createDecipheriv } from 'crypto';

export class KeyDecryptor {
  static decrypt(encryptedKey: string): Uint8Array {
    const encryptedBuffer = Buffer.from(encryptedKey, 'base64');

    const decipher = createDecipheriv(
      'aes-256-cbc', 
      Buffer.from(Constants.keyEncryptionKey), 
      Buffer.from(Constants.keyEncryptionIv)
    );

    let decrypted = decipher.update(encryptedBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return new Uint8Array(decrypted);
  }
}

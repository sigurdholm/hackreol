import aesjs from 'aes-js';

export class AesCtrEncryptionEngine {
  readonly BLOCK_SIZE = 16;

  constructor(private key: Uint8Array) { }

  decrypt(data: ArrayBuffer, startOffset: number): ArrayBuffer {
    const offsetInFirstBlock = startOffset % this.BLOCK_SIZE;
    const blockIndex = (startOffset - offsetInFirstBlock) / this.BLOCK_SIZE;
    
    const aesCtr = new aesjs.ModeOfOperation.ctr(this.key, new aesjs.Counter(blockIndex));

    if (offsetInFirstBlock > 0) aesCtr.decrypt(new Uint8Array(offsetInFirstBlock));

    const result = aesCtr.decrypt(new Uint8Array(data));
    return result.buffer;
  }
}

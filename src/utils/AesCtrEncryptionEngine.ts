import aesjs from 'aes-js';
import Enigma from '@cubbit/enigma';
import { subtle } from 'crypto';

export class AesCtrEncryptionEngineFactory {
  create(key: Uint8Array) { // : IEncryptionEngine | IAsyncEncryptionEngine {
    return new AesCtrEncryptionEngine(key);
    // if (window.crypto && window.crypto.subtle && this.wasmIsSupported()) {
    //   return new AesCtrEnigmaEncryptionEngine(key);
    // } else {
    //   return new AesCtrEncryptionEngine(key);
    // }
  }

  private wasmIsSupported(): boolean {
    try {
      if (typeof WebAssembly === "object" && typeof WebAssembly.instantiate === "function") {
        const module = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
        if (module instanceof WebAssembly.Module) return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
      }
    } catch (e) {
      // ignored
    }
    return false;
  }
}

export class AesCbcEncryptionEngine { //  implements IEncryptionEngine {
  constructor(private key: Uint8Array, private iv: Uint8Array) { }

  async decrypt(data: ArrayBuffer): Promise<Uint8Array> {
    const cryptoKey = await subtle.importKey(
      'raw',
      this.key,
      { name: 'AES-CBC' },
      false,
      ['decrypt']
    );
    console.log("ne");
    console.log(data);
    console.log(data.byteLength);
  
    const decryptedData = await subtle.decrypt(
      { 
        name: 'AES-CBC', 
        iv: this.iv 
      },
      cryptoKey,                   
      data
    );

    console.log("na");

    return new Uint8Array(decryptedData);


  }
}

export class AesCtrEncryptionEngine { // implements IEncryptionEngine {
  readonly BLOCK_SIZE = 16;

  constructor(private key: Uint8Array) { }

  decrypt(data: ArrayBuffer, startOffset: number): ArrayBuffer {
    const offsetInFirstBlock = startOffset % this.BLOCK_SIZE;
    const blockIndex = (startOffset - offsetInFirstBlock) / this.BLOCK_SIZE;

    // The counter mode of operation maintains internal state, so to
    // decrypt a new instance must be instantiated.
    const aesCtr = new aesjs.ModeOfOperation.ctr(this.key, new aesjs.Counter(blockIndex));

    // Skip the first bytes if offset is in the middle of a block
    if (offsetInFirstBlock > 0) aesCtr.decrypt(new Uint8Array(offsetInFirstBlock));

    const result = aesCtr.decrypt(new Uint8Array(data));
    return result.buffer;
  }
}

export class AesCtrEnigmaEncryptionEngine { //  implements IAsyncEncryptionEngine {
  readonly BLOCK_SIZE = 16;
  key: Buffer;

  constructor(key: Uint8Array) {
    this.key = Buffer.from(key.buffer);
  }

  private createCounter(value: number) {
    const arr = new Uint8Array(this.BLOCK_SIZE);
    // We cannot safely handle numbers beyond the safe range for integers
    if (value > Number.MAX_SAFE_INTEGER) {
      throw new Error("integer value out of safe range");
    }

    for (let index = 15; index >= 0; --index) {
      arr[index] = value % 256;
      value = value / 256;
    }

    return arr;
  }

  async decrypt(data: ArrayBuffer, startOffset: number): Promise<ArrayBuffer> {
    const offsetInFirstBlock = startOffset % this.BLOCK_SIZE;
    const blockIndex = (startOffset - offsetInFirstBlock) / this.BLOCK_SIZE;
    const counter = this.createCounter(blockIndex);

    // TODO: Check if a decrypt_stream implementation is more efficient (if even possible on web)
    // const aes = await new Enigma.AES().init({ key: this.key, algorithm: Enigma.AES.Algorithm.CTR });
    // return new Promise((resolve, reject) => {
    //   const aes_stream = aes.decrypt_stream(Buffer.from(counter));
    //   const data_stream = new PassThrough();
    //   data_stream.write(new Uint8Array(offsetInFirstBlock).buffer);
    //   data_stream.end(data);
    //   data_stream
    //     .pipe(aes_stream)
    //     .on("finish", resolve)
    //     .on("error", reject);
    // });

    try {
      const aes = await new Enigma.AES()
        .init({ key: this.key, algorithm: Enigma.AES.Algorithm.CTR });
      const buffer = offsetInFirstBlock > 0 ? Buffer.concat([Buffer.alloc(offsetInFirstBlock), Buffer.from(data)]) : Buffer.from(data);
      const buffer_1 = await aes.decrypt({ content: buffer, iv: Buffer.from(counter) });
      return buffer_1.slice(offsetInFirstBlock);
    } catch (reason) {
      console.warn("Decryption error:", reason);
      return new ArrayBuffer(0);
    }
  }
}

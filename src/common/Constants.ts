export abstract class Constants {
    static readonly keyEncryptionKey = Uint8Array.from([
        0x1e,
        0xc1,
        0x96,
        0x45,
        0x20,
        0xf7,
        0x23,
        0x5f,
        0x5c,
        0xff,
        0xc1,
        0x9f,
        0x79,
        0x28,
        0x97,
        0xb3,
        0x27,
        0x9f,
        0x4b,
        0x6e,
        0x20,
        0xcd,
        0xd2,
        0x3a,
        0x51,
        0x37,
        0x9e,
        0x21,
        0x08,
        0x95,
        0x6c,
        0x4a
    ]);
    static readonly keyEncryptionIv = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    static readonly SYNCHRONIZATION_INTERVAL: number = 5 * 1000;
    static readonly LOCATOR_BASE_URL: string = "dk.publizon.reader";
    static readonly API_ENDPOINT_LIVE: string = "https://bookstreaming.pubhub.dk";
    static readonly API_ENDPOINT_QA: string = "https://bookstreaming.qa.pubhub.dk";
}

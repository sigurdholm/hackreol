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
    static readonly API_BASE: string = "https://bookstreaming.pubhub.dk";
    static readonly METADATA_ENDPOINT: string = "v1/order/metadata"
    static readonly FILE_ENDPOINT: string = "v1/order/file"

    static readonly DOWNLOAD_ICON = `
        <svg fill="#000000" height="18" width="18" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
            viewBox="0 0 471.2 471.2" xml:space="preserve" class="svg-icon">
            <g>
                <g>
                    <path d="M457.7,230.15c-7.5,0-13.5,6-13.5,13.5v122.8c0,33.4-27.2,60.5-60.5,60.5H87.5c-33.4,0-60.5-27.2-60.5-60.5v-124.8
                        c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v124.8c0,48.3,39.3,87.5,87.5,87.5h296.2c48.3,0,87.5-39.3,87.5-87.5v-122.8
                        C471.2,236.25,465.2,230.15,457.7,230.15z"/>
                    <path d="M226.1,346.75c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.8-85.8c5.3-5.3,5.3-13.8,0-19.1c-5.3-5.3-13.8-5.3-19.1,0l-62.7,62.8
                        V30.75c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v273.9l-62.8-62.8c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1
                        L226.1,346.75z"/>
                </g>
            </g>
        </svg>
    `
}

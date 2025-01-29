export class Base64Binary {
    public static decode(base64: string) {
        const raw = Buffer.from(base64, 'base64').toString('utf-8');
        const rawLength = raw.length;
        const array = new Uint16Array(new ArrayBuffer(rawLength));

        for (let i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }
        console.log(array)
        console.log(array.length)
        return array;
    }
}

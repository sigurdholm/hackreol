import { Constants } from "../common/Constants";
import { Metadata } from "../models/Metadata";

export class MetadataService {
    static async getMetadata(orderId: string): Promise<Metadata> {
        const url = `${Constants.API_BASE}/${Constants.METADATA_ENDPOINT}/${orderId}`
        const response = await fetch(url);
        const data: Metadata = await response.json();
        return data; 
    }
}
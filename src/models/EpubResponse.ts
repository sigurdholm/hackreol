import { Metadata } from "./Metadata"

export interface EpubResponse {
    metadata: Metadata
    blob: Blob
}
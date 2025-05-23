import { ImageFormats } from "./ImageFormats";

export interface AuctionImage {
  id:                number;
  documentId:        string;
  name:              string;
  alternativeText:   string | null;
  caption:           string | null;
  width:             number;
  height:            number;
  formats:           ImageFormats;
  hash:              string;
  ext:                string;
  mime:              string;
  size:              number;
  url:               string;
  previewUrl:        string | null;
  provider:          string;
  provider_metadata: any | null;
  createdAt:         string;
  updatedAt:         string;
  publishedAt:       string;
}
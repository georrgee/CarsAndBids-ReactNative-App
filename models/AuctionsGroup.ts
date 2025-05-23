import { Auction } from "./Auction";

export interface AuctionsGroup {
  id:          number;
  documentId:  string;
  name:        string;
  createdAt:   string;
  updatedAt:   string;
  publishedAt: string;
  auctions:    Auction[];
}
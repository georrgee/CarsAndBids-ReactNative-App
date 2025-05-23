import { AuctionImage } from "./AuctionImage";

export interface Auction {
  id:             number;
  documentId:     string;
  title:          string;
  subtitle:       string;
  auction_id:     string;
  createdAt:      string;
  updatedAt:      string;
  publishedAt:    string;
  num_bids:       number;
  num_comments:   number;
  high_bid:       number;
  auction_url:    string;
  auction_end:    string;
  auction_status: string;
  main_image:     AuctionImage;
}
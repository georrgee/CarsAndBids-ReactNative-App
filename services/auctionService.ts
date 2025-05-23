import { AUCTIONS_LIST_URL, SINGLE_AUCTION_URL } from '@/constants/AuctionAPI';
import { Auction,  AuctionGroupResponse } from '@/models';

export async function fetchAuctions(): Promise<AuctionGroupResponse> {

  const response = await fetch(AUCTIONS_LIST_URL);

  if (!response.ok) throw new Error('Failed to fetch auctions');
  
  return response.json();
};

export async function fetchSingleAuction(auctionId: string): Promise<Auction | null> {

  const response = await fetch(SINGLE_AUCTION_URL(auctionId));
  
  if (!response.ok) throw new Error('Failed to fetch auction');

  const data = await response.json();

  return data.data[0] || null;
}
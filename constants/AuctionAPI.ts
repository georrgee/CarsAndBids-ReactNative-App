export const API_BASE_URL = 'https://sbffr.carsandbids.com/api';
export const AUCTION_GROUPS_URL = `${API_BASE_URL}/auction-groups`;

export const AUCTIONS_LIST_URL = `${AUCTION_GROUPS_URL}/myvj0bjns2k55kvwuuukalb1?populate[0]=auctions.main_image`;

export const SINGLE_AUCTION_URL = (auctionId: string) => `${API_BASE_URL}/auctions?filters[auction_id][$eq]=${auctionId}`;
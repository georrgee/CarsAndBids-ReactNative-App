import { useState, useEffect } from 'react';
import { fetchSingleAuction } from '@/services/auctionService';
import { Auction } from '@/models';

export function useSingleAuction(auctionId: string) {

  const [auction, setAuction] = useState<Auction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<Error | null>(null);

  useEffect(() => {
    getAuction();
  }, [auctionId]);

  const getAuction = async () => {
    try {
      setLoading(true);
      const result = await fetchSingleAuction(auctionId);
      setAuction(result);

    } catch (err) {
      setError(err as Error);
      
    } finally {
      setLoading(false);
    }
  };

  return { auction, loading, error };
}
import { useState, useEffect } from 'react';
import { fetchAuctions } from '@/services';
import { Auction } from '@/models';

export function useAuctions() {

  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getAuctions();
  }, []);

  const getAuctions = async () => {

    try {
      setLoading(true);
      const response = await fetchAuctions();
      const auctions = response.data.auctions;
      setAuctions(auctions);

    } catch (error) {
      setError(error as Error);

    } finally {
      setLoading(false);
    }
  };

  return { auctions, loading, error };
}
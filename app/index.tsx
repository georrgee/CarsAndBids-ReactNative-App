import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, Pressable, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';

const mockAuctions = [
  { id: '1', title: 'Vintage Watch Collection', endTime: '2023-12-31', currentBid: '$1,200' },
  { id: '2', title: 'Rare Comic Books', endTime: '2023-12-25', currentBid: '$850' },
  { id: '3', title: 'Antique Furniture Set', endTime: '2024-01-05', currentBid: '$3,500' },
  { id: '4', title: 'Sports Memorabilia', endTime: '2023-12-28', currentBid: '$750' },
  { id: '5', title: 'Art Deco Jewelry', endTime: '2024-01-10', currentBid: '$2,100' },
];
type Auction = {
  id: string;
  title: string;
  endTime: string;
  currentBid: string;
  // Add other properties as needed
};

export default function AuctionsListScreen() {

  const router = useRouter();
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchAuctions = async () => {

      try {

        // Replace this with your actual API call
        // const response = await fetch('your-api-endpoint');
        // const data = await response.json();
        // setAuctions(data);

        // Using mock data for now
        setTimeout(() => {
          setAuctions(mockAuctions);
          setLoading(false);
        }, 1000);

      } catch (error) {
        console.error('Error fetching auctions:', error);
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  
  const handleAuctionPress = (auction: Auction) => router.push(`/auction/${auction.id}`);

  const renderAuctionItem = ({ item }: { item: Auction }) => (
    <Pressable
      style={styles.auctionItem}
      onPress={() => handleAuctionPress(item)}>
      <Text style={styles.auctionTitle}>{item.title}</Text>
      <View style={styles.auctionDetails}>
        <Text>Ends: {item.endTime}</Text>
        <Text style={styles.bidAmount}>Current Bid: {item.currentBid}</Text>
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2e78b7" />
        <Text style={styles.loadingText}>Loading auctions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={auctions}
        renderItem={renderAuctionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  listContent: {
    padding: 16,
  },
  auctionItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  auctionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  auctionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bidAmount: {
    fontWeight: '600',
    color: '#2e78b7',
  },
});
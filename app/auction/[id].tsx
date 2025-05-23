import { StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { Text, View } from '@/components/Themed';

// Mock function to get auction details - replace with your actual data fetching
const getAuctionDetails = async (id: string) => {
  // Simulate API call
  return {
    id,
    title: `Auction #${id}`,
    description: 'Detailed description of the auction item',
    webUrl: `https://your-auction-site.com/auctions/${id}`,
  };
};

export default function AuctionDetailScreen() {

  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [auctionDetails, setAuctionDetails] = useState<{
    title: string;
    webUrl: string;
  } | null>(null);

  useEffect(() => {
    const loadAuctionDetails = async () => {
      if (id) {
        try {
          const details = await getAuctionDetails(id);
          setAuctionDetails(details);
        } catch (error) {
          console.error('Error loading auction details:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadAuctionDetails();
  }, [id]);

  // Update the header title with the auction title
  useEffect(() => {
    if (auctionDetails?.title) {
      // This will update the header title dynamically
      // You can also use Stack.Screen options if needed
    }
  }, [auctionDetails]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2e78b7" />
        <Text style={styles.loadingText}>Loading auction details...</Text>
      </View>
    );
  }

  if (!auctionDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Auction not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Optional: Display a header with auction info above the WebView */}
      <Stack.Screen options={{ title: auctionDetails.title }} />

      <WebView
        source={{ uri: auctionDetails.webUrl }}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error:', nativeEvent);
          setLoading(false);
        }} />

      {loading && (
        <View style={styles.webviewLoadingContainer}>
          <ActivityIndicator size="large" color="#2e78b7" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webviewLoadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});
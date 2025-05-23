import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, Pressable, FlatList, SafeAreaView } from 'react-native';
import { Text, View} from '@/components/Themed';
import { useRouter } from 'expo-router';
import { Auction } from '@/models';
import { useAuctions } from '@/hooks';
import { AuctionCard } from '@/components/organisms';

export default function AuctionsListScreen() {

  const router = useRouter();
  const { auctions, loading, error } = useAuctions();

  const handleAuctionPress = (auction: Auction) => router.push(`/auction/${auction.auction_id}`);

  const renderAuctionItem = ({ item }: { item: Auction }) => {

    return (
      <AuctionCard
        imageUrl={item.main_image.formats.medium.url}
        title={item.title}
        subtitle={`${item.subtitle} \nEnded ${item.auction_end}`}
        price={item.high_bid.toString()}
        onPress={() => handleAuctionPress(item)}
        starred={true}
        onStarPress={() => {/* handle star */ }} />
    )
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2e78b7" />
        <Text style={styles.loadingText}>Loading auctions...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>
            cars <Text style={styles.headerAmp}>&amp;</Text> bids
          </Text>
        </View>

        <FlatList
          data={auctions}
          renderItem={renderAuctionItem}
          keyExtractor={(item) => item.auction_id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'flex-start',
  },

  headerTitle: {
    fontFamily: 'RubikMedium',
    fontSize: 32,
    letterSpacing: 0.5,
  },

  headerAmp: {
    color: '#3CB371', // green for the ampersand
    fontFamily: 'RubikMedium',
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
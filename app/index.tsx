import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, Pressable, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { Auction } from '@/models';
import { useAuctions } from '@/hooks';

export default function AuctionsListScreen() {

  const router = useRouter();
  const { auctions, loading, error } = useAuctions();

  const handleAuctionPress = (auction: Auction) => router.push(`/auction/${auction.auction_id}`);

  const renderAuctionItem = ({ item }: { item: Auction }) => (
    <Pressable
      style={styles.auctionItem}
      onPress={() => handleAuctionPress(item)}>
      <Text style={styles.auctionTitle}>{item.title}</Text>
      <View style={styles.auctionDetails}>
        <Text>Ends: {item.auction_end}</Text>
        <Text style={styles.bidAmount}>Current Bid: {item.high_bid}</Text>
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
        keyExtractor={(item) => item.auction_id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false} />
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
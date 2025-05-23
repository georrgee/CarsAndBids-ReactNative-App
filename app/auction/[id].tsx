import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { WebView } from 'react-native-webview';
import { useSingleAuction } from '@/hooks/useSingleAuction';
import { Text, View } from '@/components/Themed';

export default function AuctionDetailScreen() {

  const { id } = useLocalSearchParams<{ id: string }>();
  const { auction, loading, error } = useSingleAuction(id);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2e78b7" />
        <Text style={styles.loadingText}>Loading auction details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Auction not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Optional: Display a header with auction info above the WebView */}
      <Stack.Screen options={{ title: auction?.title ? auction.title :  'Auction Item'  }} />

      <WebView
        source={{ uri: auction?.auction_url ? auction.auction_url : ''  }}
        style={styles.webview}
        //onLoadStart={() => loading}
        //onLoad={() => loading}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error:', nativeEvent);
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
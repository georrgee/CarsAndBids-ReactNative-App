import React from 'react';
import { Image, Pressable } from 'react-native';
import { View, Text } from '@/components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { AuctionCardProps } from './types';
import { styles } from './styles';

const AuctionCard: React.FC<AuctionCardProps> = (props) => { 

const {
  imageUrl,
  title,
  subtitle,
  price,
  onPress,
  onStarPress,
  starred = false,
} = props;

return (
  <Pressable style={styles.card} onPress={onPress}>
    <View style={styles.imageContainer}>
      <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.priceTag}>
        <Text style={styles.priceText}>Sold for {price}</Text>
      </View>
      <Pressable style={styles.starButton} onPress={onStarPress} hitSlop={10}>
        <FontAwesome name={starred ? 'star' : 'star-o'} size={22} color={starred ? '#FFD700' : '#888'} />
      </Pressable>
    </View>
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  </Pressable>
)
}

export default AuctionCard;
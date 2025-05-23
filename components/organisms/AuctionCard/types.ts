export interface AuctionCardProps {
  imageUrl:     string;
  title:        string;
  subtitle:     string;
  price:        string;
  onPress:      () => void;
  onStarPress?: () => void;
  starred?:     boolean;
}
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    //backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },

  imageContainer: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: 250,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },

  priceTag: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  priceText: {
    //color: '#fff',
    fontFamily: 'RubikMedium',
    fontSize: 15,
  },
  
  starButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
    elevation: 2,
  },
  
  content: {
    padding: 14,
  },
  title: {
    fontFamily: 'RubikMedium',
    fontSize: 17,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'RubikRegular',
    fontSize: 14,
    color: '#666',
  },
});
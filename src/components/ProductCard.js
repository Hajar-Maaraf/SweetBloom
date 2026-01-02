import React, { useRef, useEffect } from 'react';
import { View, Text, Image, Pressable, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

const CATEGORY_COLORS = {
  fleurs: '#E91E63',
  chocolats: '#8D6E63',
  gateaux: '#FF7043',
};

const CATEGORY_LABELS = {
  fleurs: '🌸 Fleurs',
  chocolats: '🍫 Chocolats',
  gateaux: '🎂 Gâteaux',
};

const CATEGORY_GRADIENTS = {
  fleurs: ['#E91E63', '#F48FB1'],
  chocolats: ['#6D4C41', '#A1887F'],
  gateaux: ['#FF7043', '#FFAB91'],
};

export default function ProductCard({ product, onPress, onAddToCart, onFavorite, isFavorite, compact = false, index = 0 }) {
  const categoryColor = CATEGORY_COLORS[product.category] || '#E91E63';
  const categoryLabel = CATEGORY_LABELS[product.category] || product.category;
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: false,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 100,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: false,
    }).start();
  };

  if (compact) {
    return (
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <Pressable 
          style={styles.compactCard} 
          onPress={() => onPress && onPress(product)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <View style={styles.compactImageContainer}>
              <Image
                source={{ uri: product.image || 'https://via.placeholder.com/150' }}
                style={styles.compactImage}
                resizeMode="cover"
              />
              <View style={[styles.compactGradient, { backgroundColor: `${categoryColor}30` }]} />
              {onFavorite && (
                <TouchableOpacity
                  style={styles.compactFavoriteButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    onFavorite(product);
                  }}
                >
                  <Ionicons
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    size={18}
                    color={isFavorite ? '#E91E63' : '#fff'}
                  />
                </TouchableOpacity>
              )}
              {product.category && (
                <View style={[styles.compactBadge, { backgroundColor: categoryColor }]}>
                  <Text style={styles.compactBadgeText}>
                    {product.category === 'fleurs' ? '🌸' : product.category === 'chocolats' ? '🍫' : '🎂'}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.compactInfo}>
              <Text style={styles.compactTitle} numberOfLines={2}>{product.title}</Text>
              <View style={styles.compactBottomRow}>
                <Text style={[styles.compactPrice, { color: categoryColor }]}>
                  {product.price?.toFixed(0)} DH
                </Text>
                {onAddToCart && (
                  <TouchableOpacity
                    style={[styles.compactAddButton, { backgroundColor: categoryColor }]}
                    onPress={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                  >
                    <Ionicons name="add" size={18} color="#fff" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Animated.View>
        </Pressable>
      </Animated.View>
    );
  }

  // Full card view
  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <Pressable 
        style={styles.card} 
        onPress={() => onPress && onPress(product)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          {/* Product Image */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.image || 'https://via.placeholder.com/150' }}
              style={styles.image}
              resizeMode="cover"
            />
            {/* Gradient overlay */}
            <View style={styles.imageOverlay} />
            
            {/* Category Badge */}
            {product.category && (
              <View style={[styles.categoryBadge, { backgroundColor: categoryColor }]}>
                <Text style={styles.categoryText}>{categoryLabel}</Text>
              </View>
            )}
            
            {/* Favorite Button */}
            {onFavorite && (
              <TouchableOpacity
                style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
                onPress={(e) => {
                  e.stopPropagation();
                  onFavorite(product);
                }}
              >
                <Ionicons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={24}
                  color={isFavorite ? '#E91E63' : '#fff'}
                />
              </TouchableOpacity>
            )}

            {/* Rating Badge */}
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>4.8</Text>
            </View>
          </View>

          {/* Product Info */}
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={2}>
              {product.title}
            </Text>
            <Text style={styles.description} numberOfLines={2}>
              {product.description}
            </Text>
            
            {/* Features */}
            <View style={styles.featuresRow}>
              <View style={styles.featureTag}>
                <Ionicons name="checkmark-circle" size={12} color="#4CAF50" />
                <Text style={styles.featureText}>Frais</Text>
              </View>
              <View style={styles.featureTag}>
                <Ionicons name="time" size={12} color="#FF9800" />
                <Text style={styles.featureText}>24h</Text>
              </View>
              <View style={styles.featureTag}>
                <Ionicons name="shield-checkmark" size={12} color="#2196F3" />
                <Text style={styles.featureText}>Garanti</Text>
              </View>
            </View>

            <View style={styles.bottomRow}>
              <View>
                <Text style={styles.priceLabel}>Prix</Text>
                <Text style={[styles.price, { color: categoryColor }]}>
                  {product.price?.toFixed(0)} DH
                </Text>
              </View>
              {onAddToCart && (
                <TouchableOpacity
                  style={[styles.addButton, { backgroundColor: categoryColor }]}
                  onPress={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                  }}
                >
                  <Ionicons name="cart-outline" size={18} color="#fff" />
                  <Text style={styles.addButtonText}>Ajouter</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // Full card styles
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'transparent',
  },
  categoryBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  favoriteButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 25,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  favoriteButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    shadowColor: '#E91E63',
    shadowOpacity: 0.4,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  info: {
    padding: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 13,
    color: '#636E72',
    marginBottom: 12,
    lineHeight: 20,
  },
  featuresRow: {
    flexDirection: 'row',
    marginBottom: 14,
    gap: 8,
  },
  featureTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  featureText: {
    fontSize: 11,
    color: '#636E72',
    marginLeft: 4,
    fontWeight: '500',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 11,
    color: '#B2BEC3',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 25,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  
  // Compact card styles
  compactCard: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  compactImageContainer: {
    position: 'relative',
    height: CARD_WIDTH,
  },
  compactImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  compactFavoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 6,
  },
  compactInfo: {
    padding: 12,
  },
  compactTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 8,
    lineHeight: 18,
  },
  compactBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  compactPrice: {
    fontSize: 16,
    fontWeight: '800',
  },
  compactAddButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  compactGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  compactBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  compactBadgeText: {
    fontSize: 14,
  },
});

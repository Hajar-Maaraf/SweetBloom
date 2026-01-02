import React, { useEffect, useState, useContext, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getProducts } from '../services/productsApi';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../contexts/CartContext';
import { getFavorites, toggleFavorite } from '../utils/favorites';

const CATEGORIES = [
  { id: 'all', label: 'Tous', icon: 'grid-outline', color: '#E91E63' },
  { id: 'fleurs', label: 'Fleurs', icon: 'flower-outline', color: '#E91E63' },
  { id: 'chocolats', label: 'Chocolats', icon: 'cafe-outline', color: '#795548' },
  { id: 'gateaux', label: 'Gâteaux', icon: 'fast-food-outline', color: '#FF9800' },
];

export default function CatalogScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    loadProducts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  useEffect(() => {
    filterByCategory();
  }, [selectedCategory, products]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavoriteIds(favs.map((f) => f.id));
  };

  const handleToggleFavorite = async (product) => {
    await toggleFavorite(product);
    await loadFavorites();
  };

  const filterByCategory = () => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) => p.category === selectedCategory)
      );
    }
  };

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { id: product.id });
  };

  const renderCategoryButton = (category) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryButton,
        selectedCategory === category.id && { backgroundColor: category.color },
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Ionicons
        name={category.icon}
        size={24}
        color={selectedCategory === category.id ? '#fff' : category.color}
      />
      <Text
        style={[
          styles.categoryLabel,
          { color: selectedCategory === category.id ? '#fff' : category.color },
        ]}
      >
        {category.label}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) => (
    <ProductCard
      product={item}
      onPress={() => handleProductPress(item)}
      onAddToCart={() => addToCart(item)}
      onFavorite={() => handleToggleFavorite(item)}
      isFavorite={favoriteIds.includes(item.id)}
      index={index}
    />
  );

  return (
    <View style={styles.container}>
      {/* Enhanced Header with Gradient Effect */}
      <View style={styles.header}>
        <View style={styles.headerGradientOverlay} />
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Bienvenue sur</Text>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>🌸 SweetBloom</Text>
              <View style={styles.titleUnderline} />
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity 
              style={styles.headerIcon}
              onPress={() => navigation.navigate('Notifications')}
            >
              <View style={styles.notificationDot} />
              <Ionicons name="notifications-outline" size={26} color="#2D3436" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.subtitleContainer}>
          <View style={styles.subtitleBadge}>
            <Ionicons name="flower" size={16} color="#E91E63" />
            <Text style={styles.subtitle}>Fleurs fraîches</Text>
          </View>
          <View style={styles.subtitleBadge}>
            <Ionicons name="cafe" size={16} color="#795548" />
            <Text style={styles.subtitle}>Chocolats</Text>
          </View>
          <View style={styles.subtitleBadge}>
            <Ionicons name="pizza" size={16} color="#FF9800" />
            <Text style={styles.subtitle}>Gâteaux</Text>
          </View>
        </View>
      </View>

      {/* Enhanced Categories with Better Design */}
      <View style={styles.categoriesSection}>
        <Text style={styles.categoriesTitle}>Catégories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {CATEGORIES.map(renderCategoryButton)}
        </ScrollView>
      </View>

      {/* Enhanced Section Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? '✨ Nos Produits' : 
             selectedCategory === 'fleurs' ? '🌸 Nos Fleurs' :
             selectedCategory === 'chocolats' ? '🍫 Nos Chocolats' : '🎂 Nos Gâteaux'}
          </Text>
          <Text style={styles.sectionSubtitle}>
            {selectedCategory === 'all' ? 'Découvrez toute notre collection' :
             `Collection ${selectedCategory}`}
          </Text>
        </View>
        <View style={styles.productCountBadge}>
          <Text style={styles.productCount}>{filteredProducts.length}</Text>
        </View>
      </View>

      {/* Products List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E91E63" />
          <Text style={styles.loadingText}>Chargement des produits...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="basket-outline" size={64} color="#ddd" />
              <Text style={styles.emptyText}>Aucun produit trouvé</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF2F4',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  headerGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(233, 30, 99, 0.02)',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  titleContainer: {
    position: 'relative',
  },
  titleUnderline: {
    position: 'absolute',
    bottom: -4,
    left: 0,
    width: 80,
    height: 3,
    backgroundColor: '#E91E63',
    borderRadius: 2,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FDF2F4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E91E63',
    zIndex: 1,
    borderWidth: 2,
    borderColor: '#fff',
  },
  greeting: {
    fontSize: 15,
    color: '#999',
    marginBottom: 4,
    fontWeight: '500',
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#E91E63',
    letterSpacing: -1,
  },
  subtitleContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  subtitleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
    borderWidth: 1,
    borderColor: '#FFE0EB',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  categoriesSection: {
    paddingTop: 20,
    paddingBottom: 8,
  },
  categoriesTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3436',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 20,
    marginRight: 12,
    minWidth: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0)',
  },
  categoryLabel: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 8,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
  },
  productCountBadge: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  productCount: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '800',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#888',
    fontSize: 14,
  },
  productsList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    marginTop: 16,
    color: '#888',
    fontSize: 16,
  },
});

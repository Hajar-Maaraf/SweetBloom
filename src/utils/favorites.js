import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@sweetbloom_favorites';

export async function getFavorites() {
  try {
    const stored = await AsyncStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
}

export async function addFavorite(product) {
  try {
    const favorites = await getFavorites();
    const exists = favorites.find((p) => p.id === product.id);
    if (!exists) {
      const updated = [...favorites, product];
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    }
    return favorites;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return [];
  }
}

export async function removeFavorite(productId) {
  try {
    const favorites = await getFavorites();
    const updated = favorites.filter((p) => p.id !== productId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return [];
  }
}

export async function toggleFavorite(product) {
  try {
    const favorites = await getFavorites();
    const exists = favorites.find((p) => p.id === product.id);
    if (exists) {
      return await removeFavorite(product.id);
    } else {
      return await addFavorite(product);
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return [];
  }
}

export async function isFavorite(productId) {
  try {
    const favorites = await getFavorites();
    return favorites.some((p) => p.id === productId);
  } catch (error) {
    console.error('Error checking favorite:', error);
    return false;
  }
}

export async function clearFavorites() {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify([]));
    return [];
  } catch (error) {
    console.error('Error clearing favorites:', error);
    return [];
  }
}

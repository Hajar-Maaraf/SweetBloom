import { db } from './firebase';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';

// Mock products with categories for development/fallback
const mockProducts = [
  // Fleurs
  {
    id: '1',
    title: 'Bouquet de Roses Rouges',
    price: 299.00,
    description: 'Un magnifique bouquet de 12 roses rouges fraîches, symbole d\'amour et de passion. Parfait pour exprimer vos sentiments.',
    category: 'fleurs',
    image: 'https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '2',
    title: 'Bouquet Tulipes Colorées',
    price: 199.00,
    description: 'Un ensemble vibrant de tulipes multicolores pour égayer votre journée et apporter de la joie.',
    category: 'fleurs',
    image: 'https://images.pexels.com/photos/1179026/pexels-photo-1179026.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '3',
    title: 'Bouquet de Tournesols',
    price: 179.00,
    description: 'Des tournesols lumineux qui apportent le soleil dans votre maison. Idéal pour une décoration chaleureuse.',
    category: 'fleurs',
    image: 'https://images.pexels.com/photos/1624076/pexels-photo-1624076.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '4',
    title: 'Orchidée Phalaenopsis',
    price: 350.00,
    description: 'Une élégante orchidée blanche dans un pot décoratif. Symbole de raffinement et de luxe.',
    category: 'fleurs',
    image: 'https://images.pexels.com/photos/4751978/pexels-photo-4751978.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '5',
    title: 'Bouquet Mixte Printanier',
    price: 249.00,
    description: 'Un assortiment de fleurs de saison aux couleurs vives. Parfait pour toutes les occasions.',
    category: 'fleurs',
    image: 'https://images.pexels.com/photos/931166/pexels-photo-931166.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  // Chocolats
  {
    id: '6',
    title: 'Coffret Chocolats Assortis',
    price: 189.00,
    description: 'Une sélection de 24 chocolats fins artisanaux aux saveurs variées : noir, lait, praliné.',
    category: 'chocolats',
    image: 'https://images.pexels.com/photos/4110101/pexels-photo-4110101.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '7',
    title: 'Truffes au Chocolat Noir',
    price: 149.00,
    description: 'Des truffes onctueuses enrobées de cacao pur 70%. Un délice pour les amateurs de chocolat intense.',
    category: 'chocolats',
    image: 'https://images.pexels.com/photos/4109998/pexels-photo-4109998.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '8',
    title: 'Boîte Pralinés Luxe',
    price: 229.00,
    description: 'Pralinés au chocolat au lait avec éclats de noisettes croquantes. Coffret cadeau élégant.',
    category: 'chocolats',
    image: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '9',
    title: 'Tablette Chocolat Artisanal',
    price: 89.00,
    description: 'Tablette de chocolat noir 85% origine Madagascar. Notes fruitées et intenses.',
    category: 'chocolats',
    image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  // Gâteaux
  {
    id: '10',
    title: 'Gâteau Fraisier Deluxe',
    price: 280.00,
    description: 'Un délicieux gâteau aux fraises fraîches et crème mousseline légère. Pour 8-10 personnes.',
    category: 'gateaux',
    image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '11',
    title: 'Tarte Citron Meringuée',
    price: 199.00,
    description: 'Une tarte acidulée au citron avec une meringue dorée et croustillante. Un classique revisité.',
    category: 'gateaux',
    image: 'https://images.pexels.com/photos/14705134/pexels-photo-14705134.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '12',
    title: 'Gâteau Chocolat Fondant',
    price: 320.00,
    description: 'Un gâteau au chocolat fondant personnalisable avec votre message. Cœur coulant irrésistible.',
    category: 'gateaux',
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '13',
    title: 'Macarons Assortis (12 pcs)',
    price: 159.00,
    description: 'Une boîte de 12 macarons aux parfums variés : vanille, framboise, pistache, chocolat.',
    category: 'gateaux',
    image: 'https://images.pexels.com/photos/3776947/pexels-photo-3776947.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '14',
    title: 'Wedding Cake 3 Étages',
    price: 890.00,
    description: 'Un gâteau de mariage élégant sur 3 étages, entièrement personnalisable selon vos envies.',
    category: 'gateaux',
    image: 'https://images.pexels.com/photos/1729797/pexels-photo-1729797.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '15',
    title: 'Cheesecake New York',
    price: 220.00,
    description: 'L\'authentique cheesecake crémeux avec son coulis de fruits rouges. Recette traditionnelle.',
    category: 'gateaux',
    image: 'https://images.pexels.com/photos/4109999/pexels-photo-4109999.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

// Flag to use Firestore or mock data
const USE_FIRESTORE = false; // Set to true when Firestore is populated

export async function getProducts(category = null) {
  try {
    if (USE_FIRESTORE && db) {
      let q = collection(db, 'products');
      
      if (category) {
        q = query(collection(db, 'products'), where('category', '==', category));
      }
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    }
  } catch (error) {
    console.error('Firestore error, falling back to mock data:', error);
  }
  
  // Return mock data (filtered by category if specified)
  if (category) {
    return mockProducts.filter((p) => p.category === category);
  }
  return mockProducts;
}

export async function getProductById(id) {
  try {
    if (USE_FIRESTORE && db) {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    }
  } catch (error) {
    console.error('Firestore error, falling back to mock data:', error);
  }
  
  return mockProducts.find((p) => p.id === id);
}

export async function getProductsByCategory(category) {
  return getProducts(category);
}

export async function searchProducts(queryText) {
  const allProducts = await getProducts();
  const lowerQuery = queryText.toLowerCase();
  
  return allProducts.filter(
    (p) =>
      p.title?.toLowerCase().includes(lowerQuery) ||
      p.description?.toLowerCase().includes(lowerQuery)
  );
}

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen({ navigation }) {
  const handleSocial = (platform) => {
    const urls = {
      instagram: 'https://instagram.com/sweetbloom.ma',
      facebook: 'https://facebook.com/sweetbloom.ma',
      twitter: 'https://twitter.com/sweetbloom_ma',
    };
    Linking.openURL(urls[platform]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.title}>À propos</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Logo & Name */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoEmoji}>🌸</Text>
          </View>
          <Text style={styles.appName}>SweetBloom</Text>
          <Text style={styles.tagline}>Fleurs • Chocolats • Gâteaux</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notre histoire</Text>
          <View style={styles.card}>
            <Text style={styles.aboutText}>
              SweetBloom est née de la passion de créer des moments de bonheur. 
              Depuis 2020, nous confectionnons avec amour des bouquets de fleurs fraîches, 
              des chocolats artisanaux et des gâteaux personnalisés pour toutes vos occasions spéciales.
            </Text>
            <Text style={styles.aboutText}>
              Notre mission est de transformer chaque célébration en un souvenir inoubliable, 
              avec des produits de qualité premium livrés à votre porte.
            </Text>
          </View>
        </View>

        {/* Values */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nos valeurs</Text>
          <View style={styles.valuesGrid}>
            <View style={styles.valueItem}>
              <View style={[styles.valueIcon, { backgroundColor: '#E91E6315' }]}>
                <Ionicons name="heart" size={24} color="#E91E63" />
              </View>
              <Text style={styles.valueTitle}>Passion</Text>
              <Text style={styles.valueDesc}>Créé avec amour</Text>
            </View>
            <View style={styles.valueItem}>
              <View style={[styles.valueIcon, { backgroundColor: '#4CAF5015' }]}>
                <Ionicons name="leaf" size={24} color="#4CAF50" />
              </View>
              <Text style={styles.valueTitle}>Fraîcheur</Text>
              <Text style={styles.valueDesc}>Produits du jour</Text>
            </View>
            <View style={styles.valueItem}>
              <View style={[styles.valueIcon, { backgroundColor: '#2196F315' }]}>
                <Ionicons name="diamond" size={24} color="#2196F3" />
              </View>
              <Text style={styles.valueTitle}>Qualité</Text>
              <Text style={styles.valueDesc}>Premium garanti</Text>
            </View>
            <View style={styles.valueItem}>
              <View style={[styles.valueIcon, { backgroundColor: '#FF980015' }]}>
                <Ionicons name="flash" size={24} color="#FF9800" />
              </View>
              <Text style={styles.valueTitle}>Rapidité</Text>
              <Text style={styles.valueDesc}>Livraison 24h</Text>
            </View>
          </View>
        </View>

        {/* Social */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suivez-nous</Text>
          <View style={styles.socialRow}>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#E1306C' }]}
              onPress={() => handleSocial('instagram')}
            >
              <Ionicons name="logo-instagram" size={26} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#1877F2' }]}
              onPress={() => handleSocial('facebook')}
            >
              <Ionicons name="logo-facebook" size={26} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: '#1DA1F2' }]}
              onPress={() => handleSocial('twitter')}
            >
              <Ionicons name="logo-twitter" size={26} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Legal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations légales</Text>
          <View style={styles.legalCard}>
            <TouchableOpacity style={styles.legalItem}>
              <Text style={styles.legalText}>Conditions générales d'utilisation</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.legalItem}>
              <Text style={styles.legalText}>Politique de confidentialité</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.legalItem}>
              <Text style={styles.legalText}>Politique de remboursement</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Fait avec ❤️ au Maroc</Text>
          <Text style={styles.copyright}>© 2025 SweetBloom. Tous droits réservés.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF2F4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  logoSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FDF2F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoEmoji: {
    fontSize: 50,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E91E63',
  },
  tagline: {
    fontSize: 15,
    color: '#888',
    marginTop: 6,
  },
  version: {
    fontSize: 13,
    color: '#bbb',
    marginTop: 8,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  aboutText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
    marginBottom: 12,
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  valueItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  valueIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3436',
  },
  valueDesc: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  legalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  legalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  legalText: {
    fontSize: 15,
    color: '#2D3436',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  footerText: {
    fontSize: 15,
    color: '#888',
  },
  copyright: {
    fontSize: 12,
    color: '#bbb',
    marginTop: 6,
  },
});

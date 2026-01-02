import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    newProducts: true,
    stockAlerts: true,
  });

  const handleToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    Alert.alert('Succès', 'Vos préférences de notifications ont été enregistrées!');
  };

  const notificationSettings = [
    {
      key: 'orderUpdates',
      icon: 'cube-outline',
      title: 'Mises à jour des commandes',
      description: 'Recevez des notifications sur le statut de vos commandes',
      color: '#4CAF50',
    },
    {
      key: 'promotions',
      icon: 'pricetag-outline',
      title: 'Promotions et offres',
      description: 'Soyez informé de nos offres spéciales et réductions',
      color: '#E91E63',
    },
    {
      key: 'newsletter',
      icon: 'mail-outline',
      title: 'Newsletter',
      description: 'Recevez notre newsletter hebdomadaire',
      color: '#2196F3',
    },
    {
      key: 'newProducts',
      icon: 'sparkles-outline',
      title: 'Nouveaux produits',
      description: 'Découvrez nos nouveaux produits en avant-première',
      color: '#FF9800',
    },
    {
      key: 'stockAlerts',
      icon: 'alert-circle-outline',
      title: 'Alertes de stock',
      description: 'Soyez notifié quand un produit favori est de nouveau disponible',
      color: '#9C27B0',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#E91E63" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="information-circle" size={24} color="#2196F3" />
          <Text style={styles.infoBannerText}>
            Configurez vos préférences pour recevoir les notifications qui vous intéressent
          </Text>
        </View>

        {/* Notification Settings */}
        <View style={styles.section}>
          {notificationSettings.map((setting) => (
            <View key={setting.key} style={styles.settingItem}>
              <View style={[styles.iconContainer, { backgroundColor: `${setting.color}15` }]}>
                <Ionicons name={setting.icon} size={24} color={setting.color} />
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{setting.title}</Text>
                <Text style={styles.settingDescription}>{setting.description}</Text>
              </View>
              <Switch
                value={notifications[setting.key]}
                onValueChange={() => handleToggle(setting.key)}
                trackColor={{ false: '#ddd', true: '#FFB6C8' }}
                thumbColor={notifications[setting.key] ? '#E91E63' : '#f4f3f4'}
              />
            </View>
          ))}
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>📊 Statistiques</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {Object.values(notifications).filter(v => v).length}
              </Text>
              <Text style={styles.statLabel}>Notifications activées</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {Object.values(notifications).filter(v => !v).length}
              </Text>
              <Text style={styles.statLabel}>Notifications désactivées</Text>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Ionicons name="checkmark-circle" size={24} color="#fff" />
          <Text style={styles.saveButtonText}>Enregistrer les préférences</Text>
        </TouchableOpacity>

        {/* Additional Info */}
        <View style={styles.noteSection}>
          <Ionicons name="help-circle-outline" size={20} color="#999" />
          <Text style={styles.noteText}>
            Vous pouvez modifier ces paramètres à tout moment. Les notifications vous aident à rester informé de vos commandes et des offres spéciales.
          </Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  placeholder: {
    width: 40,
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 16,
    margin: 20,
    borderRadius: 12,
    gap: 12,
  },
  infoBannerText: {
    flex: 1,
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 8,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#999',
    lineHeight: 18,
  },
  statsSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E91E63',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E91E63',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    marginBottom: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  noteSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginBottom: 40,
    gap: 8,
  },
  noteText: {
    flex: 1,
    fontSize: 13,
    color: '#999',
    lineHeight: 20,
  },
});

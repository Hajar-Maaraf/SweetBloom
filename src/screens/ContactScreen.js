import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CONTACT_ITEMS = [
  {
    id: 'phone',
    icon: 'call-outline',
    label: 'Téléphone',
    value: '+212 5XX-XXXXXX',
    color: '#4CAF50',
    action: 'tel:+2125XXXXXXXX',
  },
  {
    id: 'email',
    icon: 'mail-outline',
    label: 'Email',
    value: 'contact@sweetbloom.ma',
    color: '#2196F3',
    action: 'mailto:contact@sweetbloom.ma',
  },
  {
    id: 'whatsapp',
    icon: 'logo-whatsapp',
    label: 'WhatsApp',
    value: '+212 6XX-XXXXXX',
    color: '#25D366',
    action: 'https://wa.me/2126XXXXXXXX',
  },
  {
    id: 'location',
    icon: 'location-outline',
    label: 'Adresse',
    value: 'Casablanca, Maroc',
    color: '#E91E63',
    action: null,
  },
];

const HOURS = [
  { day: 'Lundi - Vendredi', time: '9h00 - 19h00' },
  { day: 'Samedi', time: '10h00 - 18h00' },
  { day: 'Dimanche', time: 'Fermé' },
];

export default function ContactScreen() {
  const handlePress = (action) => {
    if (action) {
      Linking.openURL(action);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Contactez-nous</Text>
        <Text style={styles.subtitle}>Nous sommes là pour vous aider</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Contact Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nos coordonnées</Text>
          {CONTACT_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.contactCard}
              onPress={() => handlePress(item.action)}
              disabled={!item.action}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                <Ionicons name={item.icon} size={24} color={item.color} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactLabel}>{item.label}</Text>
                <Text style={styles.contactValue}>{item.value}</Text>
              </View>
              {item.action && (
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Hours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horaires d'ouverture</Text>
          <View style={styles.hoursCard}>
            {HOURS.map((hour, index) => (
              <View 
                key={index} 
                style={[
                  styles.hourRow, 
                  index < HOURS.length - 1 && styles.hourRowBorder
                ]}
              >
                <Text style={styles.dayText}>{hour.day}</Text>
                <Text style={[
                  styles.timeText,
                  hour.time === 'Fermé' && styles.closedText
                ]}>
                  {hour.time}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Social */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suivez-nous</Text>
          <View style={styles.socialRow}>
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#E1306C' }]}>
              <Ionicons name="logo-instagram" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#1877F2' }]}>
              <Ionicons name="logo-facebook" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#1DA1F2' }]}>
              <Ionicons name="logo-twitter" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    marginTop: 6,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 16,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 14,
  },
  contactLabel: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D3436',
  },
  hoursCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  hourRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dayText: {
    fontSize: 15,
    color: '#2D3436',
    fontWeight: '500',
  },
  timeText: {
    fontSize: 15,
    color: '#4CAF50',
    fontWeight: '600',
  },
  closedText: {
    color: '#E91E63',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 14,
  },
  socialButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
});

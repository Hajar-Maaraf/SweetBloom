import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FAQ_ITEMS = [
  {
    id: '1',
    question: 'Comment passer une commande?',
    answer: 'Parcourez notre catalogue, ajoutez les produits au panier, puis validez votre commande. Vous pouvez payer par carte, en espèces à la livraison ou par virement.',
  },
  {
    id: '2',
    question: 'Quels sont les délais de livraison?',
    answer: 'Nous livrons généralement sous 24h à Casablanca. Pour les autres villes, comptez 2-3 jours ouvrables. Les commandes avant 14h sont livrées le lendemain.',
  },
  {
    id: '3',
    question: 'Puis-je modifier ou annuler ma commande?',
    answer: 'Vous pouvez modifier ou annuler votre commande dans les 2 heures suivant la validation. Contactez-nous par téléphone ou WhatsApp.',
  },
  {
    id: '4',
    question: 'Comment suivre ma commande?',
    answer: 'Vous recevrez un SMS et un email avec le numéro de suivi dès l\'expédition. Vous pouvez également suivre votre commande dans l\'onglet "Mes commandes".',
  },
  {
    id: '5',
    question: 'Que faire si mon produit arrive endommagé?',
    answer: 'Contactez-nous immédiatement avec des photos du produit. Nous vous rembourserons ou enverrons un remplacement dans les plus brefs délais.',
  },
  {
    id: '6',
    question: 'Proposez-vous des livraisons le dimanche?',
    answer: 'Oui! Nous livrons 7j/7, y compris les dimanches et jours fériés pour les occasions spéciales.',
  },
];

export default function HelpScreen({ navigation }) {
  const [expandedId, setExpandedId] = useState(null);
  const [message, setMessage] = useState('');

  const handleContact = (type) => {
    switch (type) {
      case 'phone':
        Linking.openURL('tel:+2125XXXXXXXX');
        break;
      case 'whatsapp':
        Linking.openURL('https://wa.me/2126XXXXXXXX');
        break;
      case 'email':
        Linking.openURL('mailto:support@sweetbloom.ma');
        break;
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) {
      Alert.alert('Erreur', 'Veuillez écrire votre message.');
      return;
    }
    Alert.alert(
      'Message envoyé!',
      'Nous vous répondrons dans les plus brefs délais.',
      [{ text: 'OK', onPress: () => setMessage('') }]
    );
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
        <Text style={styles.title}>Aide & Support</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Quick Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nous contacter</Text>
          <View style={styles.contactRow}>
            <TouchableOpacity
              style={[styles.contactButton, { backgroundColor: '#4CAF5015' }]}
              onPress={() => handleContact('phone')}
            >
              <Ionicons name="call" size={24} color="#4CAF50" />
              <Text style={[styles.contactText, { color: '#4CAF50' }]}>Appeler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.contactButton, { backgroundColor: '#25D36615' }]}
              onPress={() => handleContact('whatsapp')}
            >
              <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
              <Text style={[styles.contactText, { color: '#25D366' }]}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.contactButton, { backgroundColor: '#2196F315' }]}
              onPress={() => handleContact('email')}
            >
              <Ionicons name="mail" size={24} color="#2196F3" />
              <Text style={[styles.contactText, { color: '#2196F3' }]}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Questions fréquentes</Text>
          {FAQ_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.faqItem}
              onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{item.question}</Text>
                <Ionicons
                  name={expandedId === item.id ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#888"
                />
              </View>
              {expandedId === item.id && (
                <Text style={styles.faqAnswer}>{item.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Send Message */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Envoyer un message</Text>
          <View style={styles.messageCard}>
            <TextInput
              style={styles.messageInput}
              placeholder="Décrivez votre problème ou question..."
              multiline
              numberOfLines={4}
              value={message}
              onChangeText={setMessage}
              textAlignVertical="top"
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Ionicons name="send" size={20} color="#fff" />
              <Text style={styles.sendButtonText}>Envoyer</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Horaires du support</Text>
          <View style={styles.hoursCard}>
            <View style={styles.hourRow}>
              <Text style={styles.dayText}>Lundi - Vendredi</Text>
              <Text style={styles.timeText}>9h00 - 19h00</Text>
            </View>
            <View style={styles.hourRow}>
              <Text style={styles.dayText}>Samedi</Text>
              <Text style={styles.timeText}>10h00 - 18h00</Text>
            </View>
            <View style={styles.hourRow}>
              <Text style={styles.dayText}>Dimanche</Text>
              <Text style={styles.timeText}>10h00 - 14h00</Text>
            </View>
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 16,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 5,
  },
  contactText: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
  },
  faqItem: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#2D3436',
    paddingRight: 10,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  messageCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },
  messageInput: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    minHeight: 100,
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E91E63',
    borderRadius: 25,
    paddingVertical: 14,
    marginTop: 12,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  hoursCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dayText: {
    fontSize: 15,
    color: '#2D3436',
  },
  timeText: {
    fontSize: 15,
    color: '#4CAF50',
    fontWeight: '600',
  },
});

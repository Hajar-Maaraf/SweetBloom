import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MOCK_CARDS = [
  {
    id: '1',
    type: 'visa',
    lastFour: '4242',
    expiry: '12/26',
    isDefault: true,
  },
  {
    id: '2',
    type: 'mastercard',
    lastFour: '8888',
    expiry: '03/27',
    isDefault: false,
  },
];

const PAYMENT_METHODS = [
  { id: 'card', icon: 'card', label: 'Carte bancaire', color: '#2196F3' },
  { id: 'cash', icon: 'cash', label: 'Paiement à la livraison', color: '#4CAF50' },
  { id: 'transfer', icon: 'swap-horizontal', label: 'Virement bancaire', color: '#FF9800' },
];

export default function PaymentScreen({ navigation }) {
  const [cards, setCards] = useState(MOCK_CARDS);
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [showAddCard, setShowAddCard] = useState(false);

  const handleSetDefault = (id) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === id,
    })));
  };

  const handleDeleteCard = (id) => {
    Alert.alert(
      'Supprimer la carte',
      'Êtes-vous sûr de vouloir supprimer cette carte?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => setCards(cards.filter(c => c.id !== id)),
        },
      ]
    );
  };

  const getCardIcon = (type) => {
    switch (type) {
      case 'visa':
        return 'card';
      case 'mastercard':
        return 'card';
      default:
        return 'card-outline';
    }
  };

  const getCardColor = (type) => {
    switch (type) {
      case 'visa':
        return '#1A1F71';
      case 'mastercard':
        return '#EB001B';
      default:
        return '#666';
    }
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
        <Text style={styles.title}>Paiement</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modes de paiement</Text>
          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodCard,
                selectedMethod === method.id && styles.methodCardActive,
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <View style={[styles.methodIcon, { backgroundColor: `${method.color}15` }]}>
                <Ionicons name={method.icon} size={24} color={method.color} />
              </View>
              <Text style={styles.methodLabel}>{method.label}</Text>
              <View style={[
                styles.radioOuter,
                selectedMethod === method.id && styles.radioOuterActive,
              ]}>
                {selectedMethod === method.id && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Saved Cards */}
        {selectedMethod === 'card' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Cartes enregistrées</Text>
              <TouchableOpacity onPress={() => setShowAddCard(!showAddCard)}>
                <Ionicons name="add-circle" size={28} color="#E91E63" />
              </TouchableOpacity>
            </View>

            {cards.length === 0 ? (
              <View style={styles.emptyCards}>
                <Ionicons name="card-outline" size={48} color="#ddd" />
                <Text style={styles.emptyText}>Aucune carte enregistrée</Text>
              </View>
            ) : (
              cards.map((card) => (
                <View key={card.id} style={styles.cardItem}>
                  <View style={[styles.cardIcon, { backgroundColor: getCardColor(card.type) }]}>
                    <Ionicons name="card" size={20} color="#fff" />
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardType}>
                      {card.type.charAt(0).toUpperCase() + card.type.slice(1)} •••• {card.lastFour}
                    </Text>
                    <Text style={styles.cardExpiry}>Expire {card.expiry}</Text>
                  </View>
                  {card.isDefault ? (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultText}>Par défaut</Text>
                    </View>
                  ) : (
                    <TouchableOpacity onPress={() => handleDeleteCard(card.id)}>
                      <Ionicons name="trash-outline" size={20} color="#FF5252" />
                    </TouchableOpacity>
                  )}
                </View>
              ))
            )}

            {showAddCard && (
              <View style={styles.addCardForm}>
                <Text style={styles.formTitle}>Ajouter une carte</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Numéro de carte"
                  keyboardType="numeric"
                  maxLength={19}
                />
                <View style={styles.row}>
                  <TextInput
                    style={[styles.input, { flex: 1, marginRight: 10 }]}
                    placeholder="MM/AA"
                    maxLength={5}
                  />
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="CVV"
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Nom sur la carte"
                />
                <TouchableOpacity style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>Enregistrer la carte</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* Cash on Delivery Info */}
        {selectedMethod === 'cash' && (
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={24} color="#4CAF50" />
            <Text style={styles.infoText}>
              Payez en espèces à la réception de votre commande. 
              Un supplément de 10 DH peut s'appliquer.
            </Text>
          </View>
        )}

        {/* Bank Transfer Info */}
        {selectedMethod === 'transfer' && (
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={24} color="#FF9800" />
            <View style={styles.bankInfo}>
              <Text style={styles.infoText}>Effectuez un virement vers:</Text>
              <Text style={styles.bankDetails}>Banque: Attijariwafa Bank</Text>
              <Text style={styles.bankDetails}>IBAN: MA64 XXX XXXX XXXX XXXX</Text>
              <Text style={styles.bankDetails}>BIC: BCMAMAMC</Text>
            </View>
          </View>
        )}

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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 16,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0)',
  },
  methodCardActive: {
    borderColor: '#E91E63',
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginLeft: 14,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterActive: {
    borderColor: '#E91E63',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E91E63',
  },
  emptyCards: {
    alignItems: 'center',
    padding: 30,
  },
  emptyText: {
    fontSize: 15,
    color: '#888',
    marginTop: 12,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  cardIcon: {
    width: 44,
    height: 30,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
    marginLeft: 14,
  },
  cardType: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D3436',
  },
  cardExpiry: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  defaultBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  defaultText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  addCardForm: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginTop: 8,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
  },
  saveButton: {
    backgroundColor: '#E91E63',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 16,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    lineHeight: 20,
  },
  bankInfo: {
    marginLeft: 12,
  },
  bankDetails: {
    fontSize: 14,
    color: '#2D3436',
    marginTop: 6,
    fontWeight: '500',
  },
});

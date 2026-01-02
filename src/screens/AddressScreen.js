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

const MOCK_ADDRESSES = [
  {
    id: '1',
    label: 'Maison',
    name: 'Mohammed Alami',
    address: '123 Rue des Fleurs',
    city: 'Casablanca',
    postalCode: '20000',
    phone: '+212 6XX-XXXXXX',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Bureau',
    name: 'Mohammed Alami',
    address: '456 Boulevard Hassan II',
    city: 'Casablanca',
    postalCode: '20100',
    phone: '+212 6XX-XXXXXX',
    isDefault: false,
  },
];

export default function AddressScreen({ navigation }) {
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    name: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });

  const handleSetDefault = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Supprimer l\'adresse',
      'Êtes-vous sûr de vouloir supprimer cette adresse?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => setAddresses(addresses.filter(a => a.id !== id)),
        },
      ]
    );
  };

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.address || !newAddress.city) {
      Alert.alert('Erreur', 'Veuillez remplir les champs obligatoires.');
      return;
    }
    const address = {
      ...newAddress,
      id: Date.now().toString(),
      isDefault: addresses.length === 0,
    };
    setAddresses([...addresses, address]);
    setShowForm(false);
    setNewAddress({ label: '', name: '', address: '', city: '', postalCode: '', phone: '' });
    Alert.alert('Succès', 'Adresse ajoutée avec succès!');
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
        <Text style={styles.title}>Mes Adresses</Text>
        <TouchableOpacity onPress={() => setShowForm(!showForm)}>
          <Ionicons name={showForm ? "close" : "add"} size={28} color="#E91E63" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Add Address Form */}
        {showForm && (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Nouvelle adresse</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom de l'adresse (ex: Maison)"
              value={newAddress.label}
              onChangeText={(text) => setNewAddress({ ...newAddress, label: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Nom complet *"
              value={newAddress.name}
              onChangeText={(text) => setNewAddress({ ...newAddress, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Adresse *"
              value={newAddress.address}
              onChangeText={(text) => setNewAddress({ ...newAddress, address: text })}
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, { flex: 1, marginRight: 10 }]}
                placeholder="Ville *"
                value={newAddress.city}
                onChangeText={(text) => setNewAddress({ ...newAddress, city: text })}
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Code postal"
                value={newAddress.postalCode}
                onChangeText={(text) => setNewAddress({ ...newAddress, postalCode: text })}
                keyboardType="numeric"
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Téléphone"
              value={newAddress.phone}
              onChangeText={(text) => setNewAddress({ ...newAddress, phone: text })}
              keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
              <Text style={styles.addButtonText}>Ajouter l'adresse</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Addresses List */}
        {addresses.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="location-outline" size={80} color="#ddd" />
            <Text style={styles.emptyTitle}>Aucune adresse</Text>
            <Text style={styles.emptySubtitle}>
              Ajoutez une adresse de livraison
            </Text>
          </View>
        ) : (
          <View style={styles.addressList}>
            {addresses.map((addr) => (
              <View key={addr.id} style={styles.addressCard}>
                <View style={styles.addressHeader}>
                  <View style={styles.labelContainer}>
                    <Ionicons
                      name={addr.label === 'Bureau' ? 'business' : 'home'}
                      size={18}
                      color="#E91E63"
                    />
                    <Text style={styles.labelText}>{addr.label || 'Adresse'}</Text>
                    {addr.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Text style={styles.defaultText}>Par défaut</Text>
                      </View>
                    )}
                  </View>
                  <TouchableOpacity onPress={() => handleDelete(addr.id)}>
                    <Ionicons name="trash-outline" size={20} color="#FF5252" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.addressName}>{addr.name}</Text>
                <Text style={styles.addressText}>{addr.address}</Text>
                <Text style={styles.addressText}>{addr.city} {addr.postalCode}</Text>
                {addr.phone && <Text style={styles.phoneText}>{addr.phone}</Text>}
                {!addr.isDefault && (
                  <TouchableOpacity
                    style={styles.setDefaultButton}
                    onPress={() => handleSetDefault(addr.id)}
                  >
                    <Text style={styles.setDefaultText}>Définir par défaut</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        )}
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
  formContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
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
  addButton: {
    backgroundColor: '#E91E63',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2D3436',
    marginTop: 20,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#888',
    marginTop: 8,
  },
  addressList: {
    padding: 20,
  },
  addressCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginLeft: 8,
  },
  defaultBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 10,
  },
  defaultText: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '600',
  },
  addressName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  phoneText: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  setDefaultButton: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  setDefaultText: {
    fontSize: 14,
    color: '#E91E63',
    fontWeight: '600',
  },
});

import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';

export default function Navigation() {
  const { user, loading } = useAuth();

  console.log('Navigation - loading:', loading, 'user:', user?.email || 'null');

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FDF2F4' }}>
        <ActivityIndicator size="large" color="#E91E63" />
      </View>
    );
  }

  // Si pas d'utilisateur connecté, afficher les écrans d'authentification
  if (!user) {
    console.log('No user - showing AuthStack');
    return <AuthStack />;
  }

  console.log('User logged in - showing AppTabs');
  return <AppTabs />;
}
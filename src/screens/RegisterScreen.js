// Ecran d'inscription SweetBloom.
// Formulaire avec email, password, confirmPassword.
// Vérifie que password === confirmPassword avant d'appeler register.
// Utilise register de AuthContext pour créer l'utilisateur dans Firebase.
// Après succès, l'utilisateur doit être connecté et redirigé vers les tabs (grâce à AuthContext + navigation).

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);

  const { register } = useAuth();

  // Animation values
  const logoAnim = useRef(new Animated.Value(0)).current;
  const formAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: false,
      }),
      Animated.timing(formAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: false,
    }).start();
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    if (!password) return { level: 0, text: '', color: '#E0E0E0' };
    if (password.length < 6) return { level: 1, text: 'Faible', color: '#FF5252' };
    if (password.length < 8) return { level: 2, text: 'Moyen', color: '#FFC107' };
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { level: 3, text: 'Fort', color: '#4CAF50' };
    }
    return { level: 2, text: 'Moyen', color: '#FFC107' };
  };

  const passwordStrength = getPasswordStrength();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    setLoading(true);
    try {
      console.log('Attempting registration with:', email);
      await register(email, password);
      console.log('Registration successful!');
      // Après succès, AuthContext met à jour user et la navigation redirige automatiquement
    } catch (error) {
      console.error('Registration error:', error.code, error.message);
      let message = 'Une erreur est survenue.';
      if (error.code === 'auth/email-already-in-use') {
        message = 'Cet email est déjà utilisé.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Email invalide.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Le mot de passe est trop faible.';
      } else if (error.code === 'auth/network-request-failed') {
        message = 'Erreur réseau. Vérifiez votre connexion.';
      } else {
        message = error.message || 'Une erreur est survenue.';
      }
      Alert.alert('Erreur', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Decorative elements */}
      <View style={styles.decorCircle1} />
      <View style={styles.decorCircle2} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Logo Section with floating animation */}
          <Animated.View 
            style={[
              styles.logoSection,
              {
                opacity: logoAnim,
                transform: [
                  { translateY: logoAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-30, 0]
                  })},
                  { translateY: floatAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -6]
                  })}
                ]
              }
            ]}
          >
            <View style={styles.logoContainer}>
              <Text style={styles.logoEmoji}>🌸</Text>
            </View>
            <Text style={styles.title}>SweetBloom</Text>
            <Text style={styles.tagline}>Créez votre compte</Text>
          </Animated.View>

          {/* Form Section with slide-up animation */}
          <Animated.View 
            style={[
              styles.formSection,
              {
                opacity: formAnim,
                transform: [{ translateY: formAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [40, 0]
                })}]
              }
            ]}
          >
            <Text style={styles.formTitle}>Inscription</Text>
            <Text style={styles.formSubtitle}>Rejoignez notre communauté</Text>

            {/* Email Input */}
            <View style={[styles.inputContainer, emailFocused && styles.inputFocused]}>
              <View style={[styles.inputIconWrapper, emailFocused && styles.inputIconWrapperFocused]}>
                <Ionicons name="mail-outline" size={18} color={emailFocused ? "#fff" : "#E91E63"} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#B0B0B0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
              {email.includes('@') && email.includes('.') && (
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              )}
            </View>

            {/* Password Input */}
            <View style={[styles.inputContainer, passwordFocused && styles.inputFocused]}>
              <View style={[styles.inputIconWrapper, passwordFocused && styles.inputIconWrapperFocused]}>
                <Ionicons name="lock-closed-outline" size={18} color={passwordFocused ? "#fff" : "#E91E63"} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor="#B0B0B0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? "eye-outline" : "eye-off-outline"} 
                  size={20} 
                  color="#999" 
                />
              </TouchableOpacity>
            </View>

            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <View style={styles.strengthContainer}>
                <View style={styles.strengthBars}>
                  {[1, 2, 3].map((level) => (
                    <View 
                      key={level}
                      style={[
                        styles.strengthBar,
                        { backgroundColor: level <= passwordStrength.level ? passwordStrength.color : '#E0E0E0' }
                      ]}
                    />
                  ))}
                </View>
                <Text style={[styles.strengthText, { color: passwordStrength.color }]}>
                  {passwordStrength.text}
                </Text>
              </View>
            )}

            {/* Confirm Password Input */}
            <View style={[styles.inputContainer, confirmFocused && styles.inputFocused]}>
              <View style={[styles.inputIconWrapper, confirmFocused && styles.inputIconWrapperFocused]}>
                <Ionicons name="shield-checkmark-outline" size={18} color={confirmFocused ? "#fff" : "#E91E63"} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Confirmer le mot de passe"
                placeholderTextColor="#B0B0B0"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                onFocus={() => setConfirmFocused(true)}
                onBlur={() => setConfirmFocused(false)}
              />
              {confirmPassword.length > 0 && (
                <Ionicons 
                  name={password === confirmPassword ? "checkmark-circle" : "close-circle"} 
                  size={20} 
                  color={password === confirmPassword ? "#4CAF50" : "#FF5252"} 
                />
              )}
            </View>

            {/* Terms */}
            <Text style={styles.termsText}>
              En vous inscrivant, vous acceptez nos{' '}
              <Text style={styles.termsLink}>Conditions d'utilisation</Text>
              {' '}et notre{' '}
              <Text style={styles.termsLink}>Politique de confidentialité</Text>
            </Text>

            {/* Register Button */}
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleRegister}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={loading}
                activeOpacity={0.9}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Text style={styles.buttonText}>Créer mon compte</Text>
                    <View style={styles.buttonIconWrapper}>
                      <Ionicons name="arrow-forward" size={18} color="#E91E63" />
                    </View>
                  </>
                )}
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

          <Animated.View
            style={{
              opacity: buttonAnim,
              transform: [{ translateY: buttonAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0]
              })}]
            }}
          >
            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.linkText}>
                Déjà un compte ? <Text style={styles.linkTextBold}>Se connecter</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF2F4',
  },
  decorCircle1: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(233, 30, 99, 0.08)',
  },
  decorCircle2: {
    position: 'absolute',
    bottom: 100,
    left: -60,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(233, 30, 99, 0.05)',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    marginBottom: 8,
  },
  logoEmoji: {
    fontSize: 60,
    textShadowColor: 'rgba(233, 30, 99, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: '#E91E63',
    letterSpacing: -1,
    textShadowColor: 'rgba(233, 30, 99, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 24,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 28,
    elevation: 12,
  },
  formTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0)',
  },
  inputFocused: {
    borderColor: '#E91E63',
    backgroundColor: '#FFF5F7',
  },
  inputIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(233, 30, 99, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  inputIconWrapperFocused: {
    backgroundColor: '#E91E63',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#2D3436',
  },
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: -8,
    paddingHorizontal: 8,
  },
  strengthBars: {
    flexDirection: 'row',
    flex: 1,
    gap: 6,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 12,
  },
  termsText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  termsLink: {
    color: '#E91E63',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#E91E63',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginRight: 10,
  },
  buttonIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkButton: {
    marginTop: 24,
    alignItems: 'center',
  },
  linkText: {
    color: '#666',
    fontSize: 15,
  },
  linkTextBold: {
    color: '#E91E63',
    fontWeight: '700',
  },
});

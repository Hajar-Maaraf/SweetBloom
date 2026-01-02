// Ecran de connexion SweetBloom.
// Crée un formulaire avec TextInput pour email et password.
// Récupère login depuis AuthContext (useContext(AuthContext)).
// Au clic sur le bouton "Se connecter", appelle login(email, password).
// Affiche un message d'erreur simple en cas d'échec.

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
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const { login } = useAuth();

  // Animation values
  const logoAnim = useRef(new Animated.Value(0)).current;
  const formAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Staggered entrance animations
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

    // Floating animation for logo
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

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    try {
      console.log('Attempting login with:', email);
      await login(email, password);
      console.log('Login successful!');
      // Après succès, AuthContext met à jour user et la navigation redirige automatiquement
    } catch (error) {
      console.error('Login error:', error.code, error.message);
      let message = 'Une erreur est survenue.';
      if (error.code === 'auth/user-not-found') {
        message = 'Aucun compte trouvé avec cet email.';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Mot de passe incorrect.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Email invalide.';
      } else if (error.code === 'auth/invalid-credential') {
        message = 'Email ou mot de passe incorrect.';
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
      <View style={styles.decorCircle3} />

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
                  outputRange: [0, -8]
                })}
              ]
            }
          ]}
        >
          <View style={styles.logoContainer}>
            <Text style={styles.logoEmoji}>🌸</Text>
            <View style={styles.logoGlow} />
          </View>
          <Text style={styles.title}>SweetBloom</Text>
          <Text style={styles.tagline}>Fleurs • Chocolats • Gâteaux</Text>
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
          <Text style={styles.formTitle}>Bienvenue !</Text>
          <Text style={styles.formSubtitle}>Connectez-vous pour continuer</Text>

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
            {email.length > 0 && (
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            )}
          </View>

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

          <TouchableOpacity style={styles.forgotButton}>
            <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
          </TouchableOpacity>

          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleLogin}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              disabled={loading}
              activeOpacity={0.9}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text style={styles.buttonText}>Se connecter</Text>
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
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.linkText}>
              Pas de compte ? <Text style={styles.linkTextBold}>S'inscrire</Text>
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
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
    top: -100,
    right: -100,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(233, 30, 99, 0.08)',
  },
  decorCircle2: {
    position: 'absolute',
    top: 150,
    left: -80,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(233, 30, 99, 0.05)',
  },
  decorCircle3: {
    position: 'absolute',
    bottom: 50,
    right: -60,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(233, 30, 99, 0.06)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  logoEmoji: {
    fontSize: 70,
    textShadowColor: 'rgba(233, 30, 99, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  logoGlow: {
    position: 'absolute',
    bottom: -5,
    left: '50%',
    marginLeft: -30,
    width: 60,
    height: 20,
    backgroundColor: 'rgba(233, 30, 99, 0.15)',
    borderRadius: 30,
    transform: [{ scaleX: 2 }],
  },
  title: {
    fontSize: 42,
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
    marginTop: 6,
    letterSpacing: 1,
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
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginTop: -8,
  },
  forgotText: {
    color: '#E91E63',
    fontSize: 13,
    fontWeight: '600',
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
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    paddingHorizontal: 16,
    color: '#999',
    fontSize: 13,
    fontWeight: '500',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
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
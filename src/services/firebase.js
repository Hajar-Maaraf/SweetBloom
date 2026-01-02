// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKDpj5Bxgy9u951hdHnZfOfPUtfRIDcj8",
  authDomain: "sweetbloom-6d485.firebaseapp.com",
  projectId: "sweetbloom-6d485",
  storageBucket: "sweetbloom-6d485.firebasestorage.app",
  messagingSenderId: "403575595136",
  appId: "1:403575595136:web:3b677bd4012b6f4e0c8665"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db, app };
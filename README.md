# SweetBloom

Minimal scaffold for SweetBloom — React Native (Expo) app with navigation, contexts, and services.

## Project structure

- App.js
- index.js
- package.json
- /src
  - /navigation
    - AuthStack.js
    - AppTabs.js
    - index.js  (main navigation container)
  - /screens
    - LoginScreen.js
    - RegisterScreen.js
    - CatalogScreen.js
    - ProductDetailScreen.js
    - CartScreen.js
    - FavoritesScreen.js
    - OrdersScreen.js
    - ProfileScreen.js
    - SearchScreen.js
    - ContactScreen.js
  - /contexts
    - AuthContext.js
    - CartContext.js
  - /services
    - firebase.js      // Firebase config (template, currently commented out)
    - productsApi.js   // Products API (mock data + TODO for Firestore)
  - /components
    - ProductCard.js
    - Button.js
    - Input.js

## Setup (recommended)

Install the required navigation and Firebase packages (Expo):

```powershell
# Install React Navigation core (you already installed this earlier)
npm install @react-navigation/native

# Additional navigators
npm install @react-navigation/native-stack @react-navigation/bottom-tabs

# Expo peer dependencies
expo install react-native-screens react-native-safe-area-context

# Optional: Firebase for backend
npm install firebase
```

If you want to use Firebase's Firestore & Auth, open `src/services/firebase.js` and set your project configuration. The file includes a sample (commented) template.

## Run

```powershell
npm start
# or
npm run android
npm run ios
npm run web
```

## Notes

- The auth and product services are set up with simple placeholders to get started. Replace with real Firebase logic as needed.
- This scaffold focuses on structure and minimal, safe defaults to avoid crashing when dependencies or Firebase are not configured yet.

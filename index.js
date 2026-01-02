import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';

import App from './App';

// Suppress known react-native-web warnings before anything else loads
LogBox.ignoreLogs([
  'props.pointerEvents is deprecated',
  '"textShadow*" style props are deprecated',
  '"shadow*" style props are deprecated',
  'Animated: `useNativeDriver` is not supported',
  'Cannot record touch end without a touch start',
]);

// Suppress console warnings for known react-native-web issues
const originalWarn = console.warn;
console.warn = (...args) => {
  const message = args[0];
  if (
    typeof message === 'string' &&
    (message.includes('textShadow*') ||
     message.includes('shadow*') ||
     message.includes('pointerEvents') ||
     message.includes('useNativeDriver') ||
     message.includes('touch end without a touch start'))
  ) {
    return;
  }
  originalWarn(...args);
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

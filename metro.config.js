const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

// Obtiene la configuración predeterminada de Expo
const config = getDefaultConfig(__dirname);

// Envuelve la configuración de Metro con Reanimated y NativeWind
const wrappedConfig = wrapWithReanimatedMetroConfig(config);

// Aplica el plugin de NativeWind y pasa la configuración de Reanimated
module.exports = withNativeWind(wrappedConfig, { input: './global.css' });

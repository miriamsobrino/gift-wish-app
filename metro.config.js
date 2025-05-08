const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
{
  /* const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config'); */
}

const config = getDefaultConfig(__dirname);

//const wrappedConfig = wrapWithReanimatedMetroConfig(config);

// Aplica el plugin de NativeWind y pasa la configuración de Reanimated
module.exports = withNativeWind(config, { input: './global.css' });

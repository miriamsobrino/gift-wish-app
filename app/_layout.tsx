import { Stack } from 'expo-router';

import '../global.css';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { WishlistContextProvider } from '../context/WishlistContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WishlistContextProvider>
        <Stack>
          <Stack.Screen
            name='index'
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='add-wishlist'
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',
              headerBackButtonDisplayMode: 'minimal',
            }}
          />
        </Stack>
      </WishlistContextProvider>
    </GestureHandlerRootView>
  );
}

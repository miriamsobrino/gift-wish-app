import React from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { WishlistContextProvider } from '../context/WishlistContext';

import '../global.css';

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
            }}
          />
          <Stack.Screen
            name='wishlist-detail'
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='add-product'
            options={{
              headerShown: false,
              presentation: 'fullScreenModal',
            }}
          />
        </Stack>
      </WishlistContextProvider>
    </GestureHandlerRootView>
  );
}

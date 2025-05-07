import { Stack } from 'expo-router';

import '../global.css';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { WishListContextProvider } from '../context/WishlistContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <WishListContextProvider>
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
      </WishListContextProvider>
    </GestureHandlerRootView>
  );
}

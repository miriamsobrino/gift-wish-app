import { View, Text, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ThemedView } from '../components/ThemedView';
import { WishlistCard } from '../components/WishlistCard';
import { useWishListContext } from '../context/WishlistContext';
import { FlatList } from 'react-native-gesture-handler';
import { Wishlist } from '../types/types';

export default function HomeScreen() {
  const { wishlists } = useWishListContext();

  const navigationToAddWishlistModal = () => {
    router.push('/add-wishlist');
  };

  const navigationToEditWishlistModal = (item: Wishlist) => {
    router.push(`/add-wishlist?title=${item.title}`);
  };
  return (
    <ThemedView>
      <View className='flex mx-2 flex-row items-center justify-between mt-3 '>
        <Text className=' py-2 text-3xl font-bold'>Wishlists</Text>
        <Pressable onPress={navigationToAddWishlistModal}>
          <Feather name='plus' size={28} color='black' />
        </Pressable>
      </View>
      <FlatList
        data={wishlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WishlistCard
            id={item.id}
            title={item.title}
            emoji={item.emoji}
            color={item.color}
            onPress={() => navigationToEditWishlistModal(item)}
          />
        )}
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'column',
          gap: 20,
          paddingHorizontal: 8,
        }}
      />
    </ThemedView>
  );
}

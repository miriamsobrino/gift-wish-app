import { Feather, MaterialIcons } from '@expo/vector-icons';
import { View, Pressable, FlatList } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import { router, useLocalSearchParams } from 'expo-router';
import { useWishlistContext } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';
import { ThemedText } from '../components/ThemedText';

export default function WishlistDetailScreen() {
  const { title, id } = useLocalSearchParams();
  const { wishlists, deleteProduct } = useWishlistContext();

  const wishlist = wishlists.find((wishlist) => wishlist.id === id);

  const navigationToAddProductModal = () => {
    router.push(`/add-product?id=${id}`);
  };
  const handleDeleteProduct = (productId: string) => {
    if (wishlist) {
      deleteProduct(wishlist?.id, productId);
    }
  };
  return (
    <ThemedView>
      <View className='flex mx-2 flex-row items-start justify-between mt-3 '>
        <Pressable onPress={() => router.dismiss()}>
          <MaterialIcons
            name='arrow-back-ios'
            size={24}
            color='black'
            className='mt-1'
          />
        </Pressable>
        <ThemedText type='title' className='text-2xl'>
          {title}
        </ThemedText>
        <Pressable onPress={navigationToAddProductModal}>
          <Feather name='plus' size={28} color='black' />
        </Pressable>
      </View>
      <FlatList
        data={wishlist?.products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            price={item.price}
            link={item.link}
            id={item.id}
            wishlistId={wishlist?.id ?? ''}
            isPurchased={item.isPurchased}
            onDelete={handleDeleteProduct}
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

import { Pressable, View } from 'react-native';
import { ThemedButton } from '../components/ThemedButton';
import { ThemedInput } from '../components/ThemedInput';
import { ThemedText } from '../components/ThemedText';
import { useState } from 'react';
import { ThemedView } from '../components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import { useWishlistModal } from '../hooks/useWishlistModal';
import { useWishlistContext } from '../context/WishlistContext';
import { useLocalSearchParams } from 'expo-router';
import uuid from 'react-native-uuid';

export default function AddProductModal() {
  const { id } = useLocalSearchParams();
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productLink, setProductLink] = useState('');
  const { goBack } = useWishlistModal();
  const { addProductToWishlist } = useWishlistContext();

  const handleSaveProduct = () => {
    if (productName && productPrice && productLink) {
      const parsedPrice = parseFloat(productPrice);
      const idString = Array.isArray(id) ? id[0] : id;
      const newProduct = {
        id: uuid.v4(),
        name: productName,
        price: parsedPrice,
        link: productLink,
        wishlistId: idString,
      };
      addProductToWishlist(idString, newProduct);
    }
  };
  return (
    <ThemedView className='px-1'>
      <Pressable className='justify-end flex items-end ' onPress={goBack}>
        <MaterialIcons name='close' size={28} color='black' />
      </Pressable>
      <View className='flex flex-col gap-6 mt-4 items-center'>
        <ThemedText type='subtitle'>Nuevo producto</ThemedText>
        <ThemedInput
          placeholder='Nombre...'
          value={productName}
          onChangeText={setProductName}
        />
        <ThemedInput
          keyboardType='decimal-pad'
          placeholder='Precio...'
          value={productPrice}
          onChangeText={setProductPrice}
        />
        <ThemedInput
          placeholder='Link...'
          value={productLink}
          onChangeText={setProductLink}
        />
        <ThemedButton
          className='mt-4 flex items-center  w-60 mx-auto'
          onPress={handleSaveProduct}
        >
          <ThemedText type='text' className='font-bold'>
            Guardar producto
          </ThemedText>
        </ThemedButton>
      </View>
    </ThemedView>
  );
}

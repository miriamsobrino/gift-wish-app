import { Pressable, View } from 'react-native';
import { ThemedButton } from '../components/ThemedButton';
import { ThemedInput } from '../components/ThemedInput';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import { useProductModal } from '../hooks/useProductModal';

export default function AddProductModal() {
  const {
    productName,
    productPrice,
    productLink,
    setProductName,
    setProductPrice,
    setProductLink,
    handleSaveProduct,
    goBack,
  } = useProductModal();
  return (
    <ThemedView className='px-1'>
      <Pressable className='justify-end flex items-end ' onPress={goBack}>
        <MaterialIcons name='close' size={28} color='black' />
      </Pressable>
      <View className='flex flex-col gap-6 mt-4 items-center'>
        <ThemedText type='title'>Nuevo producto</ThemedText>
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
          <ThemedText type='subtitle' className='text-xl'>
            Guardar producto
          </ThemedText>
        </ThemedButton>
      </View>
    </ThemedView>
  );
}

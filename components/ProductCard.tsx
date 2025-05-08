import { Pressable, View, Text, Linking, Modal } from 'react-native';
import { Product } from '../types/types';
import { ThemedButton } from './ThemedButton';
import { Feather, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

export function ProductCard({
  id,
  name,
  price,
  link,
  isPurchased,
  onDelete,
}: Product & { onDelete: (id: string) => void }) {
  const [purchased, setPurchased] = useState(isPurchased);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const handleOpenLink = () => {
    if (link) {
      const url = link.startsWith('http') ? link : `https://${link}`;
      Linking.openURL(url);
    }
  };
  const handleTogglePurchased = () => {
    setPurchased(!purchased);
  };

  const handleDeleteProduct = () => {
    onDelete(id);
    setIsOpenDeleteModal(false);
  };
  return (
    <Pressable
      className={`flex flex-row px-4 bg-background z-10 h-24 mt-2 relative rounded-md border-2 border-black items-center justify-between shadow-hard-black-large ${
        purchased ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <View className='flex flex-row gap-4 items-center'>
        <ThemedButton
          className=' p-2  w-12 h-12'
          onPress={handleTogglePurchased}
        >
          {purchased ? <Feather name='check' size={24} color='black' /> : null}
        </ThemedButton>
        <View>
          <Text className='text-2xl font-bold'>{name}</Text>
          <Text className='text-xl '>{price}€</Text>
        </View>
      </View>
      <View className='flex flex-row gap-6'>
        <ThemedButton className='p-2 bg-blue-300' onPress={handleOpenLink}>
          <Fontisto name='link' size={24} color='black' />
        </ThemedButton>
        <ThemedButton
          className='p-2 bg-red-400'
          onPress={() => setIsOpenDeleteModal(true)}
        >
          <MaterialIcons name='delete' size={24} color='black' />
        </ThemedButton>
      </View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={isOpenDeleteModal}
        onRequestClose={() => {
          setIsOpenDeleteModal(!isOpenDeleteModal);
        }}
      >
        <View className='flex-1 justify-center items-center bg-black/30 '>
          <View className='bg-background border-2 border-black shadow-hard-black-small p-10 flex flex-col gap-4 items-center'>
            <Text className='text-xl font-bold'>
              ¿Eliminar el producto {name}?
            </Text>
            <View className='flex flex-row gap-4'>
              <ThemedButton
                onPress={() => setIsOpenDeleteModal(false)}
                className='w-36'
              >
                <Text className='text-lg'>Cancelar</Text>
              </ThemedButton>
              <ThemedButton
                className='bg-red-400 w-36'
                onPress={handleDeleteProduct}
              >
                <Text className='text-lg'>Aceptar</Text>
              </ThemedButton>
            </View>
          </View>
        </View>
      </Modal>
    </Pressable>
  );
}

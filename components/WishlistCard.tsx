import { View, Text, Pressable, Modal, Alert } from 'react-native';
import { Wishlist } from '../types/types';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useWishlistContext } from '../context/WishlistContext';
import { useState } from 'react';
import { ThemedButton } from './ThemedButton';
export function WishlistCard({
  id,
  title,
  emoji,
  color,
  products,
  totalPrice,
  isOpenMenu,
  onMenuToggle,
}: Wishlist & {
  isOpenMenu: boolean;
  onMenuToggle: (id: string) => void;
}) {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const editWishlist = (item: Wishlist) => {
    router.push(`/add-wishlist?title=${item.title}`);
  };
  const handleDeleteWishlist = () => {
    onMenuToggle(id);
    setIsOpenDeleteModal(true);
  };
  const { deleteWishlist } = useWishlistContext();
  return (
    <>
      <Pressable className='flex flex-row  bg-background  z-10 h-36 mt-2 relative rounded-md border-2 border-black items-center justify-between gap-4 shadow-hard-black-large'>
        <View className='flex flex-row gap-4 items-center'>
          <View
            className=' border-r-2 border-t-2 border-b-2 r rounded-r-none  border-black h-36  items-center flex  justify-center'
            style={{ backgroundColor: color }}
          >
            <Text className='text-5xl px-6 py-2'>{emoji}</Text>
          </View>
          <View className='flex flex-col gap-2'>
            <Text className='text-2xl font-bold'>{title}</Text>
            <Text className='text-xl '>
              Nº productos: {products?.length ?? 0}
            </Text>
            <Text className='text-xl '>Precio total: {totalPrice ?? `0€`}</Text>
          </View>
        </View>
        <Pressable onPress={() => onMenuToggle(id)} className='py-4 px-2'>
          <Entypo name='dots-three-vertical' size={24} color='black' />
        </Pressable>
      </Pressable>
      {isOpenMenu && (
        <View className='absolute top-28 right-4 z-50 bg-background border-2  border-black rounded-md shadow-hard-black-small '>
          <Pressable
            className='p-4 border-b-2 items-end '
            onPress={() =>
              editWishlist({
                id,
                title,
                emoji,
                color,
                products,
                totalPrice,
                isOpenMenu,
                onMenuToggle,
              })
            }
          >
            <MaterialIcons name='mode-edit' size={24} color='black' />
          </Pressable>
          <Pressable
            className='p-4 border-b-2 items-end'
            onPress={handleDeleteWishlist}
          >
            <MaterialIcons name='delete' size={24} color='black' />
          </Pressable>
          <Pressable className='p-4 border-b-2  items-end'>
            <Ionicons name='share-social-sharp' size={24} color='black' />
          </Pressable>
        </View>
      )}

      <Modal
        animationType='fade'
        transparent={true}
        visible={isOpenDeleteModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setIsOpenDeleteModal(!isOpenDeleteModal);
        }}
      >
        <View className='flex-1 justify-center items-center bg-black/30 '>
          <View className='bg-background border-2 border-black shadow-hard-black-small p-10 flex flex-col gap-4 items-center'>
            <Text className='text-xl font-bold'>
              ¿Eliminar la wishlist {title}?
            </Text>
            <View className='flex flex-row gap-4'>
              <ThemedButton
                onPress={() => setIsOpenDeleteModal(false)}
                className='w-36'
              >
                <Text className='text-lg'>Cancelar</Text>
              </ThemedButton>
              <ThemedButton
                onPress={() => deleteWishlist(id)}
                className='bg-red-400 w-36'
              >
                <Text className='text-lg'>Aceptar</Text>
              </ThemedButton>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

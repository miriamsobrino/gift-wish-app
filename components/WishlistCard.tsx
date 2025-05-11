import { View, Text, Pressable, Modal, Linking } from 'react-native';
import { Wishlist } from '../types/types';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useWishlistContext } from '../context/WishlistContext';
import { useState } from 'react';
import { ThemedButton } from './ThemedButton';
import { ThemedText } from './ThemedText';
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
  const { wishlists, deleteWishlist } = useWishlistContext();
  const wishlist = wishlists.find((w) => w.id === id);
  const editWishlist = (item: Wishlist) => {
    router.push(`/add-wishlist?title=${item.title}&id=${id}`);
  };

  const navigationToWishlistDetailScreen = (title: string) => {
    router.push(`/wishlist-detail?title=${title}&id=${id}`);
  };
  const handleDeleteWishlist = () => {
    onMenuToggle(id);
    setIsOpenDeleteModal(true);
  };

  const handleShare = () => {
    if (!wishlist) return;

    let message = `*Wishlist: ${wishlist.title}*\n\n`;

    wishlist?.products?.forEach((product, index) => {
      if (!product.isPurchased) {
        message += `🎁 *${index + 1}. ${product.name}*\n`;
        message += `💶 ${product.price.toFixed(2)}€\n`;
        if (product.link) message += `🔗 ${product.link}`;

        message += '\n';
      }
    });
    message += '\n';
    message += `\nCompartido desde la app GiftWish 🚀`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;

    Linking.openURL(whatsappURL);
  };
  return (
    <>
      <Pressable
        className='flex flex-row  bg-background  z-10 h-36 mt-2 relative rounded-md border-2 border-black items-center justify-between gap-4 shadow-hard-black-large'
        onPress={() => navigationToWishlistDetailScreen(title)}
      >
        <View className='flex flex-row gap-4 items-center'>
          <View
            className=' border-r-2 border-t-2 border-b-2 r rounded-r-none  border-black h-36  items-center flex  justify-center'
            style={{ backgroundColor: color }}
          >
            <Text className='text-5xl px-6 py-2'>{emoji}</Text>
          </View>
          <View className='flex flex-col gap-2'>
            <ThemedText type='subtitle' className='text-2xl font-bold'>
              {title}
            </ThemedText>
            <ThemedText className='text-xl '>
              Productos: {wishlist?.products?.length ?? 0}
            </ThemedText>
            <ThemedText className='text-xl '>
              Total: {wishlist?.totalPrice?.toFixed(2) ?? `0€`}€
            </ThemedText>
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
          <Pressable className='p-4 border-b-2 items-end' onPress={handleShare}>
            <Ionicons name='share-social-sharp' size={24} color='black' />
          </Pressable>
        </View>
      )}

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
            <ThemedText type='subtitle' className='text-xl'>
              ¿Eliminar la wishlist {title}?
            </ThemedText>
            <View className='flex flex-row gap-4'>
              <ThemedButton
                onPress={() => setIsOpenDeleteModal(false)}
                className='w-36'
              >
                <ThemedText>Cancelar</ThemedText>
              </ThemedButton>
              <ThemedButton
                onPress={() => deleteWishlist(id)}
                className='bg-red-400 w-36'
              >
                <ThemedText type='subtitle' className='text-xl'>
                  Aceptar
                </ThemedText>
              </ThemedButton>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

import { View, Text } from 'react-native';
import { Wishlist } from '../types/types';

export function WishlistCard({
  title,
  emoji,
  color,
  products,
  totalPrice,
}: Wishlist) {
  return (
    <View
      style={{ backgroundColor: color }}
      className='flex flex-row p-4 h-36 mt-2 rounded-md border-2 border-black items-center justify-start gap-4 shadow-hard-black-large'
    >
      <Text className='text-5xl p-4'>{emoji}</Text>
      <View className='flex flex-col gap-2'>
        <Text className='text-2xl font-bold'>{title}</Text>
        <Text className='text-xl '>Nº productos: {products?.length ?? 0}</Text>
        <Text className='text-xl '>Precio total: {totalPrice ?? `0€`}</Text>
      </View>
    </View>
  );
}

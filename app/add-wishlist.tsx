import { Pressable, Text, TextInput, View } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import { ThemedButton } from '../components/ThemedButton';
import { ThemedText } from '../components/ThemedText';
import { MaterialIcons } from '@expo/vector-icons';
import EmojiModal from 'react-native-emoji-modal';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { WISHLIST_COLORS } from '../constants/colors';
import { useWishlistModal } from '../hooks/useWishlistModal';
import { ColorPicker } from '../components/ColorPicker';
import { EmojiPicker } from '../components/EmojiPicker';

export default function AddWishlistModal() {
  const {
    wishlistTitle,
    emojiSelected,
    selectedColor,
    isOpenEmojiModal,
    setWishlistTitle,
    setEmojiSelected,
    setSelectedColor,
    openEmojiModal,
    closeEmojiModal,
    backToHome,
    handleAddWishlist,
  } = useWishlistModal();

  return (
    <ThemedView className='px-1'>
      <Pressable className='justify-end flex items-end ' onPress={backToHome}>
        <MaterialIcons name='close' size={28} color='black' />
      </Pressable>
      <View className='text-center flex justify-betweem gap-10 flex-1 items-center   h-[560px]'>
        <ThemedText type='title'>Nueva Wishlist</ThemedText>
        {emojiSelected && (
          <EmojiPicker
            color={selectedColor}
            emoji={emojiSelected}
            onPress={openEmojiModal}
          />
        )}
        {isOpenEmojiModal && (
          <Animated.View entering={FadeInUp.duration(500)}>
            <EmojiModal
              onEmojiSelected={(emoji) => {
                setEmojiSelected(emoji ?? '');
                closeEmojiModal();
              }}
              modalStyle={{
                boxShadow: '7px 7px black',
                borderColor: 'black',
                borderWidth: 2,
                maxHeight: 320,
                minHeight: 320,
                borderRadius: 0,
              }}
            />
          </Animated.View>
        )}
        <View className='flex flex-row gap-6'>
          {WISHLIST_COLORS.map((color, index) => (
            <ColorPicker
              key={`${color}-${index}`}
              color={color}
              index={index}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </View>
        <TextInput
          placeholder='Nombre de la Wishlist...'
          placeholderTextColor='#a1a1a1'
          value={wishlistTitle}
          onChangeText={setWishlistTitle}
          className='border-2  border-black rounded-md shadow-hard-black-small bg-background px-4  w-full text-xl  h-16 pb-2'
        />

        <ThemedButton onPress={handleAddWishlist}>
          <Text className='text-xl font-bold'>Crear Wishlist</Text>
        </ThemedButton>
      </View>
    </ThemedView>
  );
}

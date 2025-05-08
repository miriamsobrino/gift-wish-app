import { Pressable, Text, View } from 'react-native';
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
import { ThemedInput } from '../components/ThemedInput';
import { useLocalSearchParams } from 'expo-router';

export default function AddWishlistModal() {
  const { title } = useLocalSearchParams();
  const {
    wishlistTitle,
    selectedEmoji,
    selectedColor,
    isOpenEmojiModal,
    setSelectedEmoji,
    setWishlistTitle,
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
      <View className='text-center flex justify-betweem gap-8 flex-1 items-center   h-[560px]'>
        <ThemedText type='title'>
          {title ? 'Editar Wishlist' : 'Nueva Wishlist'}
        </ThemedText>
        {selectedEmoji && (
          <EmojiPicker
            color={selectedColor}
            emoji={selectedEmoji}
            onPress={openEmojiModal}
          />
        )}
        {isOpenEmojiModal && (
          <Animated.View entering={FadeInUp.duration(500)}>
            <EmojiModal
              onEmojiSelected={(emoji) => {
                setSelectedEmoji(emoji ?? '');
                closeEmojiModal();
              }}
              modalStyle={{
                boxShadow: '7px 7px black',
                borderColor: 'black',
                borderWidth: 2,
                backgroundColor: 'white',
                maxHeight: 320,
                minHeight: 320,
                borderRadius: 10,
              }}
              emojiSize={36}
            />
          </Animated.View>
        )}
        <View className='flex flex-row gap-6'>
          {WISHLIST_COLORS.map((color, index) => (
            <ColorPicker
              key={`${color}-${index}`}
              isSelected={selectedColor === color}
              color={color}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </View>

        <ThemedInput value={wishlistTitle} onChangeText={setWishlistTitle} />

        <ThemedButton onPress={handleAddWishlist}>
          <Text className='text-xl font-bold'>
            {title ? 'Actualizar Wishlist' : 'Crear Wishlist'}
          </Text>
        </ThemedButton>
      </View>
    </ThemedView>
  );
}

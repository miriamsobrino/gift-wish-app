import { router } from 'expo-router';
import { useState } from 'react';
import { WISHLIST_COLORS } from '../constants/colors';
import { useWishListContext } from '../context/WishlistContext';

export const useWishlistModal = () => {
  const [emojiSelected, setEmojiSelected] = useState('🎁');
  const [isOpenEmojiModal, setIsOpenEmojiModal] = useState(false);
  const [wishlistTitle, setWishlistTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(WISHLIST_COLORS[0]);

  const { addWishlist } = useWishListContext();

  const openEmojiModal = () => setIsOpenEmojiModal((prev) => !prev);
  const closeEmojiModal = () => setIsOpenEmojiModal(false);
  const backToHome = () => router.back();

  const handleAddWishlist = () => {
    if (!wishlistTitle.trim()) return alert('Debes introducir un título');
    addWishlist(wishlistTitle, emojiSelected, selectedColor);
  };

  return {
    emojiSelected,
    isOpenEmojiModal,
    wishlistTitle,
    selectedColor,
    setEmojiSelected,
    setWishlistTitle,
    setSelectedColor,
    openEmojiModal,
    closeEmojiModal,
    backToHome,
    handleAddWishlist,
  };
};

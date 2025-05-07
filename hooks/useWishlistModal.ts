import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { WISHLIST_COLORS } from '../constants/colors';
import { useWishListContext } from '../context/WishlistContext';

export const useWishlistModal = () => {
  const { title } = useLocalSearchParams();
  const { wishlists } = useWishListContext();
  const [wishlistTitle, setWishlistTitle] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🎁');
  const [selectedColor, setSelectedColor] = useState(WISHLIST_COLORS[0]);
  const [isOpenEmojiModal, setIsOpenEmojiModal] = useState(false);
  const { addWishlist } = useWishListContext();

  useEffect(() => {
    const wishlistTitle = Array.isArray(title) ? title[0] : title;
    if (wishlistTitle) {
      const wishlist = wishlists.find((w) => w.title === wishlistTitle);
      if (wishlist) {
        setWishlistTitle(wishlist.title);
        setSelectedEmoji(wishlist.emoji);
        setSelectedColor(wishlist.color);
      }
    }
  }, [title]);

  const openEmojiModal = () => setIsOpenEmojiModal((prev) => !prev);
  const closeEmojiModal = () => setIsOpenEmojiModal(false);
  const backToHome = () => router.back();

  const handleAddWishlist = () => {
    if (!wishlistTitle.trim()) return alert('Debes introducir un título');
    addWishlist(wishlistTitle, selectedEmoji, selectedColor);
  };

  return {
    selectedEmoji,
    isOpenEmojiModal,
    wishlistTitle,
    selectedColor,
    setSelectedEmoji,
    setWishlistTitle,
    setSelectedColor,
    openEmojiModal,
    closeEmojiModal,
    backToHome,
    handleAddWishlist,
  };
};

import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useWishlistContext } from '../context/WishlistContext';
import { useWishlistModal } from './useWishlistModal';
import uuid from 'react-native-uuid';

export const useProductModal = () => {
  const { id } = useLocalSearchParams();
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productLink, setProductLink] = useState('');
  const { goBack } = useWishlistModal();
  const { addProductToWishlist } = useWishlistContext();

  const handleSaveProduct = () => {
    if (productName && productPrice) {
      const normalizedPrice = productPrice.replace(',', '.');
      const parsedPrice = parseFloat(normalizedPrice);
      const idString = Array.isArray(id) ? id[0] : id;
      const newProduct = {
        id: uuid.v4(),
        name: productName,
        price: parsedPrice,
        link: productLink,
        wishlistId: id as string,
        isPurchased: false,
        onDelete: () => {},
      };
      addProductToWishlist(idString, newProduct);
    }
  };
  return {
    productName,
    productPrice,
    productLink,
    setProductName,
    setProductPrice,
    setProductLink,
    handleSaveProduct,
    goBack,
  };
};

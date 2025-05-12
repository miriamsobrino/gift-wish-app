import { createContext, useContext, useEffect, useState } from 'react';
import { Product, Wishlist } from '../types/types';
import uuid from 'react-native-uuid';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WishlistContextType {
  wishlists: Wishlist[];
  addWishlist: (title: string, emoji: string, color: string) => void;
  updateWishlist: (
    id: string,
    title: string,
    emoji: string,
    color: string
  ) => void;
  deleteWishlist: (id: string) => void;
  addProductToWishlist: (wishlistId: string, product: Product) => void;
  updateProduct: (
    wishlistId: string,
    productId: string,
    isPurchased: boolean
  ) => void;
  deleteProduct: (wishlistId: string, productId: string) => void;
}
const WishlistContext = createContext({} as WishlistContextType);
export const useWishlistContext = () => {
  const context = useContext(WishlistContext);
  return context;
};
export const WishlistContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);

  const addWishlist = async (title: string, emoji: string, color: string) => {
    try {
      const newWishlist = {
        id: uuid.v4(),
        title: title,
        emoji: emoji,
        color: color,
        products: [],
        totalPrice: 0,
      };
      const updatedWishlists = [newWishlist, ...wishlists];
      setWishlists(updatedWishlists);
      await AsyncStorage.setItem('wishlists', JSON.stringify(updatedWishlists));
      router.back();
    } catch (error) {
      console.error('Error al añadir wishlist en AsyncStorage:', error);
    }
  };

  const updateWishlist = async (
    id: string,
    title: string,
    emoji: string,
    color: string
  ) => {
    const updatedWishlists = wishlists.map((wishlist) =>
      wishlist.id === id
        ? {
            ...wishlist,
            title: title,
            emoji: emoji,
            color: color,
          }
        : wishlist
    );

    setWishlists(updatedWishlists);

    try {
      await AsyncStorage.setItem('wishlists', JSON.stringify(updatedWishlists));
      router.back();
    } catch (error) {
      console.error('Error al actualizar wishlist en AsyncStorage:', error);
    }
  };

  const deleteWishlist = async (id: string) => {
    try {
      const filteredWishlists = wishlists.filter((w) => w.id !== id);
      setWishlists(filteredWishlists);
      await AsyncStorage.setItem(
        'wishlists',
        JSON.stringify(filteredWishlists)
      );
    } catch (error) {
      console.error('Error al eliminar wishlist de AsyncStorage:', error);
    }
  };

  const addProductToWishlist = async (wishlistId: string, product: Product) => {
    try {
      const updatedWishlists = wishlists.map((wishlist) =>
        wishlist.id === wishlistId
          ? {
              ...wishlist,
              products: [...(wishlist.products ?? []), product],
              totalPrice: (wishlist.totalPrice ?? 0) + product.price,
            }
          : wishlist
      );
      setWishlists(updatedWishlists);

      await AsyncStorage.setItem('wishlists', JSON.stringify(updatedWishlists));
      router.back();
    } catch (error) {
      console.error(
        'Error al añadir producto a la wishlist en AsyncStorage:',
        error
      );
    }
  };

  const updateProduct = async (
    wishlistId: string,
    productId: string,
    isPurchased: boolean
  ) => {
    try {
      const updatedWishlists = wishlists.map((wishlist) =>
        wishlist.id === wishlistId
          ? {
              ...wishlist,
              products: wishlist?.products?.map((product) =>
                product.id === productId ? { ...product, isPurchased } : product
              ),
            }
          : wishlist
      );
      setWishlists(updatedWishlists);

      await AsyncStorage.setItem('wishlists', JSON.stringify(updatedWishlists));
    } catch (error) {
      console.error(
        'Error al añadir producto a la wishlist en AsyncStorage:',
        error
      );
    }
  };
  const deleteProduct = async (wishlistId: string, productId: string) => {
    try {
      const updatedWishlists = wishlists.map((wishlist) => {
        if (wishlist.id === wishlistId) {
          const filteredProducts = wishlist?.products?.filter(
            (product) => product.id !== productId
          );

          let newTotalPrice = 0;
          if (filteredProducts) {
            for (let i = 0; i < filteredProducts?.length; i++) {
              newTotalPrice += filteredProducts[i].price;
            }
          }
          return {
            ...wishlist,
            products: filteredProducts,
            totalPrice: newTotalPrice,
          };
        }
        return wishlist;
      });
      setWishlists(updatedWishlists);
      await AsyncStorage.setItem('wishlists', JSON.stringify(updatedWishlists));
    } catch (error) {
      console.error(
        'Error al eliminar producto de la wishlist en AsyncStorage:',
        error
      );
    }
  };
  const loadWishlists = async () => {
    const storedWishlists = await AsyncStorage.getItem('wishlists');
    if (storedWishlists) {
      setWishlists(JSON.parse(storedWishlists));
    }
  };
  useEffect(() => {
    loadWishlists();
  }, [wishlists]);

  return (
    <WishlistContext.Provider
      value={{
        wishlists,
        addWishlist,
        updateWishlist,
        deleteWishlist,
        addProductToWishlist,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

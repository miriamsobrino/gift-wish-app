import { createContext, useContext, useState } from 'react';
import { Product, Wishlist } from '../types/types';
import uuid from 'react-native-uuid';
import { router } from 'expo-router';

interface WishlistContextType {
  wishlists: Wishlist[];
  addWishlist: (title: string, emoji: string, color: string) => void;
  deleteWishlist: (id: string) => void;
  addProductToWishlist: (wishlistId: string, product: Product) => void;
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
  const addWishlist = (title: string, emoji: string, color: string) => {
    const newWishlist = {
      id: uuid.v4(),
      title: title,
      emoji: emoji,
      color: color,
      products: [],
      totalPrice: 0,
    };
    setWishlists([newWishlist, ...wishlists]);
    router.back();
  };
  const addProductToWishlist = (wishlistId: string, product: Product) => {
    setWishlists((prevWishlists) => {
      const newWishlist = prevWishlists.map((wishlist) =>
        wishlist.id === wishlistId
          ? {
              ...wishlist,
              products: [...(wishlist.products ?? []), product],
              totalPrice: (wishlist.totalPrice ?? 0) + product.price,
            }
          : wishlist
      );
      return newWishlist;
    });
    console.log('producto añadido');
    router.back();
  };

  const deleteWishlist = (id: string) => {
    const filteredWishlists = wishlists.filter((w) => w.id !== id);
    setWishlists(filteredWishlists);
  };
  return (
    <WishlistContext.Provider
      value={{
        wishlists,
        addWishlist,
        deleteWishlist,
        addProductToWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

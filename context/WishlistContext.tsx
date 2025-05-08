import { createContext, useContext, useState } from 'react';
import { Wishlist } from '../types/types';
import uuid from 'react-native-uuid';
import { router } from 'expo-router';

interface WishlistContextType {
  wishlists: Wishlist[];
  addWishlist: (title: string, emoji: string, color: string) => void;
  deleteWishlist: (id: string) => void;
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
    };
    setWishlists([newWishlist, ...wishlists]);
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
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

import { createContext, useContext, useState } from 'react';
import { Wishlist } from '../types/types';
import uuid from 'react-native-uuid';
import { router } from 'expo-router';

interface WishListContextType {
  wishlists: Wishlist[];
  addWishlist: (title: string, emoji: string, color: string) => void;
}
const WishListContext = createContext({} as WishListContextType);
export const useWishListContext = () => {
  const context = useContext(WishListContext);
  return context;
};
export const WishListContextProvider = ({
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
  return (
    <WishListContext.Provider
      value={{
        wishlists,
        addWishlist,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

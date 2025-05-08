export interface Wishlist {
  id: string;
  emoji: string;
  title: string;
  color: string;
  products?: Product[];
  totalPrice?: number;
  isOpenMenu?: boolean;
  onMenuToggle?: (id: string) => void;
  onPress?: (title: string) => void;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  link: string;
  wishlistId: string;
  isPurchased: boolean;
  onDelete?: (id: string) => void;
}

export interface Wishlist {
  id: string;
  emoji: string;
  title: string;
  color: string;
  products?: [];
  totalPrice?: number;
  isOpenMenu?: boolean;
  onMenuToggle?: (id: string) => void;
}

import { TextInput } from 'react-native';

interface Props {
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
}
export function ThemedInput({ value, onChangeText }: Props) {
  return (
    <TextInput
      placeholder='Nombre de la Wishlist...'
      placeholderTextColor='#a1a1a1'
      value={value}
      onChangeText={onChangeText}
      className='border-2  border-black rounded-md shadow-hard-black-small bg-background px-4  w-full text-xl  h-16 pb-2'
    />
  );
}

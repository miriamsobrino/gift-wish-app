import { TextInput, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  // Extiende TextInputProps para aceptar todas las props posibles de TextInput
  placeholder: string;
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
}
export function ThemedInput({
  placeholder,
  value,
  onChangeText,
  ...restProps
}: Props) {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor='#a1a1a1'
      value={value}
      onChangeText={onChangeText}
      className='border-2  border-black rounded-md shadow-hard-black-small bg-background px-4  w-full text-xl  h-16 pb-2'
      {...restProps}
    />
  );
}

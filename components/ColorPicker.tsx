import { Pressable } from 'react-native';

interface Props {
  index: number;
  color: string;
  onPress: () => void;
}

export function ColorPicker({ index, color, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`h-12 w-12 border-black border-2 rounded-md  ${
        color === color ? 'shadow-hard-black-small ' : ''
      }  `}
      style={{ backgroundColor: color }}
    />
  );
}

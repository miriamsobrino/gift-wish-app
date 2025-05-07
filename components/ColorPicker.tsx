import { Pressable } from 'react-native';

interface Props {
  color: string;
  isSelected: boolean;
  onPress: () => void;
}

export function ColorPicker({ color, isSelected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`h-12 w-12 border-black border-2 rounded-md  ${
        isSelected ? 'shadow-hard-black-small ' : ''
      }  `}
      style={{ backgroundColor: color }}
    />
  );
}

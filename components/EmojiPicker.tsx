import { Pressable, Text } from 'react-native';

interface Props {
  color: string;
  emoji: string;
  onPress: () => void;
}
export function EmojiPicker({ color, emoji, onPress }: Props) {
  return (
    <Pressable
      className=' h-24 w-24 flex items-center justify-center border-2 rounded-md shadow-hard-black-small '
      onPress={onPress}
      style={{ backgroundColor: color }}
    >
      <Text className='text-5xl pt-2'>{emoji}</Text>
    </Pressable>
  );
}

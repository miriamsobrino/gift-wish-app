import { Text } from 'react-native';
interface Props {
  children: React.ReactNode;
  type?: 'title' | 'text';
}

export function ThemedText({ children, type = 'text' }: Props) {
  return (
    <Text className={`${type === 'title' ? 'text-3xl font-bold' : 'text-xl '}`}>
      {children}
    </Text>
  );
}

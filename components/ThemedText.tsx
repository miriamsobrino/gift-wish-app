import { Text } from 'react-native';
interface Props {
  children: React.ReactNode;
  type?: 'title' | 'subtitle' | 'text';
  className?: string;
}

export function ThemedText({ children, className, type = 'text' }: Props) {
  return (
    <Text
      className={`${
        type === 'title'
          ? 'text-3xl font-bold'
          : type === 'subtitle'
          ? 'text-2xl font-semibold'
          : 'text-xl '
      } ${className}`}
    >
      {children}
    </Text>
  );
}

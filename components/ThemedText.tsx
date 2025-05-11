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
          ? 'text-4xl  font-manropeBold '
          : type === 'subtitle'
          ? 'text-2xl  font-manropeBold '
          : 'text-xl font-manropeRegular '
      } ${className} `}
    >
      {children}
    </Text>
  );
}

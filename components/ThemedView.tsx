import Constants from 'expo-constants';
import { View } from 'react-native';

interface Props {
  children: React.ReactNode;
  className?: string;
}
export function ThemedView({ children, className }: Props) {
  return (
    <View className='flex-1 bg-background px-4 '>
      <View
        className={`flex-1 mt-4 flex-col gap-4   ${className}`}
        style={{
          paddingTop: Constants.statusBarHeight,
        }}
      >
        {children}
      </View>
    </View>
  );
}

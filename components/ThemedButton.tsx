import React from 'react';
import { Pressable } from 'react-native';

interface Props {
  children: React.ReactNode;
  className?: string;
  withShadow?: boolean;
  onPress?: () => void;
}
export function ThemedButton({ children, className, onPress }: Props) {
  return (
    <Pressable
      className={` shadow-hard-black-small p-4 bg-background rounded-md flex items-center justify-center border-2 border-black ${className}`}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}

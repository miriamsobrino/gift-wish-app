import { Alert, Modal, View, Text } from 'react-native';
import { ThemedButton } from './ThemedButton';
import { useState } from 'react';

interface Props {
  message: string;
}
export function ThemedAlert({ message }: Props) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={isAlertOpen}
      onRequestClose={() => {
        setIsAlertOpen(!isAlertOpen);
      }}
    >
      <View className='flex-1 justify-center items-center bg-black/30 '>
        <View className='bg-background border-2 border-black shadow-hard-black-small p-10 flex flex-col gap-4 items-center'>
          <Text className='text-xl '>{message}</Text>

          <ThemedButton onPress={() => setIsAlertOpen(false)} className='w-36'>
            <Text className='text-lg'>Aceptar</Text>
          </ThemedButton>
        </View>
      </View>
    </Modal>
  );
}

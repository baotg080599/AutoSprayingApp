import React from 'react';
import DeviceList from '../components/deviceList';
import { HStack, VStack } from '@react-native-material/core';
import { Text,View } from 'react-native';


const HomeScreen = () => {
  return (
    <VStack>
      <HStack>
      </HStack>
      <DeviceList/>
    </VStack>
  );
};

export default HomeScreen
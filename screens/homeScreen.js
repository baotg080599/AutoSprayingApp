import React from 'react';
import DeviceList from '../components/deviceList';
import { HStack, VStack } from '@react-native-material/core';
import { Text,View,ScrollView } from 'react-native';


const HomeScreen = () => {
  return (
      <ScrollView>
        <VStack>
          <Text>hello</Text>
          <DeviceList/>
        </VStack>
      </ScrollView>
  );
};

export default HomeScreen
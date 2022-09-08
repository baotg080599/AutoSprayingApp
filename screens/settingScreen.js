import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';


import CycleScreen from './cycleScreen';
import SprayingScreen from './sprayingScreen';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    backgroundColor: '#008EDA',
    borderRadius: 15,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

const List = ({ navigation }) => {
  return(<View style={styles.container}>
    <FlatList
      data={[
        {key: 'cycle'},
        {key: 'spraying'},
      ]}
      renderItem={({item}) => 
      <TouchableWithoutFeedback onPress={ () => navigation.navigate(item.key)}>
      <View style={styles.item}>
        <Text style={{fontSize: 24}}>
          {item.key}
        </Text>
      </View>
      </TouchableWithoutFeedback>}
    />
  </View>);
};

const SettingScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
    >
      <Stack.Screen
        name="Settings"
        component={List}
      />
      <Stack.Screen
        name="cycle"
        component={CycleScreen}
      />
      <Stack.Screen
        name="spraying"
        component={SprayingScreen}
      />
    </Stack.Navigator>
  );
};

export default SettingScreen
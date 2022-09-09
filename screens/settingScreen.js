import React from 'react';
import { IconButton } from "@react-native-material/core";
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList, StyleSheet, Text, View, TouchableWithoutFeedback  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

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

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          onPress={() => navigation.navigate('spraying')}
          icon={(props) => <Icon name='plus' size={30}/>}
        />
      )
    });
  }, [navigation]);
  return(
  <View style={styles.container}>
    <FlatList
      data={[
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
        name="spraying"
        component={SprayingScreen}

      />
    </Stack.Navigator>
  );
};

export default SettingScreen
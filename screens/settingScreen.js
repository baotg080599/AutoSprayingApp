import React, { useState} from 'react';
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

  const [listSpraying,setListSpraying] = useState([{element:0}]);

  const getItemObject = async (keyObject) => {
    try {
      const jsonValue = await AsyncStorage.getItem(keyObject);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // read error
    }
  };

 getAllKeys = async () => {
    let list = [];
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      keys.forEach(async element => {
        list.push(await getItemObject(element));
      });
      if(listSpraying[0].element == 0){
      setListSpraying(list);}
    } catch(e) {
      // read key error
    }
  };

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
    {listSpraying.length == 0 && <Text>no things</Text>}
    {listSpraying.length > 0 &&
    <FlatList
      data={listSpraying}
      renderItem={({item}) => 
      <TouchableWithoutFeedback onPress={ () => navigation.navigate('spraying')}>
      <View style={styles.item}>
        <Text style={{fontSize: 24}}>
          {item.name}
        </Text>
      </View>
      </TouchableWithoutFeedback>}
    />}
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
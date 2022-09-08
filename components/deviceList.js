import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';

const styles = StyleSheet.create({
  container: {
   paddingTop: 22
  },
  item: {
    backgroundColor: '#1F9AD8',
    borderRadius: 15,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});


const DeviceList = () => {

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'device 1'},
          {key: 'device 2'},
        ]}
        renderItem={({item}) => 
        (
        <TouchableWithoutFeedback onPress={ () => console.log('Selected Item :',item)}>
        <View style={styles.item}>
            <Text style={{fontSize: 24}}>{item.key}</Text>
        </View>
        </TouchableWithoutFeedback>)
    }
      />
    </View>
  );
}

export default DeviceList;
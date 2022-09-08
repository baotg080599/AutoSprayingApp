import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        marginTop: 22
      },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
});

const TimePicker = () => {
  return (
    <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <Text>timePicker</Text>
    </View>
    </View>
  );
};

export default TimePicker
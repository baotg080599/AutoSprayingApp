import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { HStack, VStack } from '@react-native-material/core';

const ModalPicker = ({setChange, value, setModalVisible, modalVisible }) => {

  const seconds = [];
  const minutes = [];
  const hours = [];

  for (let index = 0; index < 60; index++) {
    seconds.push(index.toString().padStart(2, '0'));
    minutes.push(index.toString().padStart(2, '0'));
  }

  for (let index = 0; index < 24; index++) {
    hours.push(index.toString().padStart(2, '0'));
  }

  return(
    <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredViewModal}>
            <View style={styles.modalView}>
            <ScrollPicker
              onValueChange={(data, selectedIndex) => {
                setChange(data + ':' + value.substring(3,value.length))
              }}    
              dataSource={hours}
              selectedIndex={0}
              wrapperHeight={180}
              wrapperColor='#FFFFFF'
              itemHeight={60}
              highlightColor='#d8d8d8'
              highlightBorderWidth={2}/>
            <Text>hour</Text>
            <ScrollPicker 
              onValueChange={(data, selectedIndex) => {
                setChange(value.substring(0,3)+ data + value.substring(5,value.length))
              }}
              dataSource={minutes}
              selectedIndex={0}
              wrapperHeight={180}
              wrapperColor='#FFFFFF'
              itemHeight={60}
              highlightColor='#d8d8d8'
              highlightBorderWidth={2}/>
            <Text>minute</Text>
            <ScrollPicker
              onValueChange={(data, selectedIndex) => {
                setChange(value.substring(0,value.length-2)+ data)
              }}
              dataSource={seconds}
              selectedIndex={0}
              wrapperColor='#FFFFFF'
              wrapperHeight={180}
              itemHeight={60}
              highlightColor='#d8d8d8'
              highlightBorderWidth={2}/>
            <Text>seconds</Text>
            </View>
          </View>
        </Modal>
  );
}

const SprayingScreen = () => {  
  const [modalSprayingVisible,setModalSprayingVisible] = useState(false);
  const [modalDistanceVisible,setmodalDistanceVisible] = useState(false);
  const [SprayingText,setSprayingText] = useState('00:00:00');
  const [DistanceText,setDistanceText] = useState('00:00:00');
    return (
      <View style={styles.centeredView}>
        <ModalPicker modalVisible={modalSprayingVisible} setModalVisible={setModalSprayingVisible} setChange={setSprayingText} value={SprayingText}/>
        <ModalPicker modalVisible={modalDistanceVisible} setModalVisible={setmodalDistanceVisible} setChange={setDistanceText} value={DistanceText}/>
        <VStack spacing={'20%'}>
        <HStack spacing={'5%'} style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ fontWeight: "bold", fontSize:28 }}>Spraying:</Text>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalSprayingVisible(true)}
        >
          <Text style={{...styles.textStyle,fontSize:50}}>{SprayingText}</Text>
        </Pressable>
        </HStack>
        <HStack spacing={'5%'} style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ fontWeight: "bold", fontSize:28 }}>Distance:</Text>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setmodalDistanceVisible(true)}
        >
          <Text style={{...styles.textStyle,fontSize:50}}>{DistanceText}</Text>
        </Pressable>
        </HStack>
        </VStack>
      </View>
    );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 22
  },
  centeredViewModal: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "stretch",
    marginTop: 22
  },
  modalView: {
    alignItems: "center",
    flexDirection: 'row',
    backgroundColor: "white",
    borderRadius: 25,
    paddingBottom: '20%',
    paddingTop:'15%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: '2%',
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default SprayingScreen;
import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { HStack, VStack } from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { IconButton } from "@react-native-material/core";
import { getDatabase, ref, onValue, set, get } from 'firebase/database';
import myApp from '../firebase';

const ModalPicker = ({ setChange, value, setModalVisible, modalVisible }) => {

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
              selectedIndex={parseInt(value.substring(0,3))}
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
              selectedIndex={parseInt(value.substring(3,5))}
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
              selectedIndex={parseInt(value.substring(6,value.length))}
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

const ModalPickerMethod = ({ setChange, value, setModalVisible, modalVisible }) => {

  const [listSpraying,setListSpraying] = useState([]);

  const getItemObject = async (keyObject) => {
    try {
      const jsonValue = await AsyncStorage.getItem(keyObject);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // read error
    }
  };

  useEffect(() => {
    const loadSprayingWay = async () => {
      await getAllKeys();
    }
    loadSprayingWay();
  },[]);

  const getAllKeys = async () => {
    let list = [];
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      list = await Promise.all(keys.map(async value=>{
        return await getItemObject(value)
      }));
      setListSpraying(state => [...list]);
    } catch(e) {
      // read key error
    }
  };

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
              renderItem={(data,index) => {
                return (<Text>{data.name}</Text>)
              }}
              onValueChange={(data, selectedIndex) => {
                setChange(state => data.name);
              }}
              dataSource={listSpraying}
              selectedIndex={0}
              wrapperHeight={180}
              wrapperColor='#FFFFFF'
              itemHeight={60}
              highlightColor='#d8d8d8'
              highlightBorderWidth={2}/>
            </View>
          </View>
        </Modal>
  );
}

const PickerTimeScreen = ({ route, navigation }) => {
  const { dateString } = route.params != null ? route.params : {dateString: null};
  const [modalSelectTimeVisible,setModalSelectTimeVisible] = useState(false);
  const [modalSprayingMethod,setModalSprayingMethod] = useState(false);
  const [SelectTimeText,setSelectTimeText] = useState('00:00:00');
  const [sprayingMethod,setPrayingMethod] = useState('None');

  const setData = (key, value) => {
    const db = getDatabase(myApp);
    const reference = ref(db, '/calendarSpraying/'+key+'/'+value+'/');
    set(reference, 0);
  }
 
  const initSpraying = () => {

  }

  const getItemObject = async (keyObject) => {
    try {
      const jsonValue = await AsyncStorage.getItem(keyObject);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // read error
    }
  };

    return (
      <View style={styles.centeredView}>
        <ModalPicker modalVisible={modalSelectTimeVisible} setModalVisible={setModalSelectTimeVisible} setChange={setSelectTimeText} value={SelectTimeText}/>
        <ModalPickerMethod value={sprayingMethod} modalVisible={modalSprayingMethod} setModalVisible={setModalSprayingMethod} setChange={setPrayingMethod}/>
        <VStack spacing={'20%'}>
        <HStack spacing={'5%'} style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ fontWeight: "bold", fontSize:28 }}>Time:</Text>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalSelectTimeVisible(true)}
        >
          <Text style={{...styles.textStyle,fontSize:50}}>{SelectTimeText}</Text>
        </Pressable>
        </HStack>
        <HStack spacing={'5%'} style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ fontWeight: "bold", fontSize:28 }}>Spraying Method:</Text>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalSprayingMethod(true)}
        >
          <Text style={{...styles.textStyle,fontSize:50}}>{sprayingMethod}</Text>
        </Pressable>
        </HStack>
        <HStack justify='center'>
        <Pressable
          style={{...styles.button, borderRadius:12,...styles.buttonOpen}}
          onPress={() => {
            setData(dateString,SelectTimeText);
            navigation.navigate('timeListScreen');
          }}
        >
          <Text style={{...styles.textStyle,fontSize:32}}>Finish</Text>
        </Pressable>
        </HStack>
        </VStack>
      </View>
    );
};

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

export default PickerTimeScreen;
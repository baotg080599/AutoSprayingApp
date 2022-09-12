import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Platformm, Modal } from 'react-native';
import {Agenda, Calendar, LocaleConfig} from 'react-native-calendars';
import { IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalSetUpCalendar = ({ value, navigation, setModalVisible, modalVisible }) => {
  return(
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}
    >
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
      }}>
        <View>

        </View>
      </View>
    </Modal>
  );
}

const CalendarScreen = () => {
  const [modalSetUpCalendarVisible,setModalSetUpCalendarVisible] = useState(false);
  const [timeValue,setTimeValue] = useState('');
  const [markDateList,setMarkDateList] = useState({});

  var currentdate = new Date();

  const getItemObject = async (keyObject) => {
    try {
      const jsonValue = await AsyncStorage.getItem(keyObject);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // read error
    }
  };

  const getAllKeys = async () => {
    let list = [];
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      keys.forEach(async element => {
        let item = await getItemObject(element);
        list.push({...item,key: element});
        setListSpraying(list);
      });
    } catch(e) {
      // read key error
    }
  };

  return(
    <View>
      <ModalSetUpCalendar value={timeValue} setModalVisible={setModalSetUpCalendarVisible} modalVisible={modalSetUpCalendarVisible}/>
      <Calendar
        markedDates = {
          markDateList
        }
        minDate={currentdate.getFullYear()+'-'+(currentdate.getMonth()+1).toString().padStart(2, '0')+'-'+currentdate.getDate().toString().padStart(2, '0')}
        onDayPress={day => {
          setTimeValue(day);
          setModalSetUpCalendarVisible(true);
        }}
        onDayLongPress={day => {
          console.log('selected day', day);
        }}
        monthFormat={'MM-yyyy'}
        onMonthChange={month => {
          console.log('month changed', month);
        }}
        disableMonthChange={true}
        hideExtraDays={true}
        firstDay={1}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        disableAllTouchEventsForDisabledDays={true}
        enableSwipeMonths={true}
      />
    </View>
  );
};

export default CalendarScreen;


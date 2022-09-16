import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback } from "react-native";
import { IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { getDatabase, ref, get } from 'firebase/database';
import myApp from '../firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

const TimeListScreen = ({ navigation, route }) => {

  const [timeList, setTimeList] = useState([]);

  const { dateString } = route.params != null ? route.params : {dateString: null};

  const getDataDate = async (key) => {
    const db = getDatabase(myApp);
    const reference = ref(db, '/calendarSpraying/');
    const calendarRef = await get(reference);
    if(calendarRef.hasChild(key)){
      const child = calendarRef.child(key+'/timeList/');
      const data = Object.keys(child.toJSON()).map(x => ({ key: x }));
      setTimeList(state => [ ...data]);
    }
  }

  useEffect(() => {
    const getData = async () => {
      await getDataDate(dateString);
    }
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={timeList}
        renderItem={({ item }) =>
        (
          <TouchableWithoutFeedback onPress={() => navigation.navigate("setupTime",{
            dateString: dateString
          })} key={item.key}>
            <View style={styles.item}>
              <Text style={{ fontSize: 24 }}>{item.key}</Text>
            </View>
          </TouchableWithoutFeedback>)
        }
      />
      <IconButton style={{
        position:'absolute',
        alignSelf:'flex-end',
        bottom:120,
        right:20,
        borderRadius:30,
        backgroundColor:'#1BCA50',
        padding:28,shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        }
        }} 
        onPress={() => navigation.navigate('setupTime',{
            dateString:dateString
         }) } 
            icon={(props) => <Icon 
            name='plus' 
            size={30} 
            color='white'
        />}/>
    </View>
  );
};

export default TimeListScreen;
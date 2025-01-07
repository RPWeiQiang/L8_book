import React,{useState} from 'react';
import { StatusBar, View, Button, Text, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { datasource } from './Data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({navigation,route}) => {
  const[title,setTitle] = useState("");
  const[isbn,setIsbn] = useState("");
  const[copies,setCopies] = useState("");
  const[img,setImg] = useState("");

    const setData=async(value)=>{
        AsyncStorage.setItem("bookdata",value);
        navigation.navigate("Home");
    }
  return (
    <View>
      <StatusBar/>
        <Text>Title:</Text>
        <TextInput value={title}  style={{borderWidth:1}} onChangeText={(text)=>setTitle(text)}/>
        <Text>ISBN:</Text>
        <TextInput value={isbn}  style={{borderWidth:1}} onChangeText={(text)=>setIsbn(text)}/>
        <Text>Copies Owned:</Text>
        <TextInput value={copies}  style={{borderWidth:1}} onChangeText={(text)=>setCopies(text)}/>
        <Text>Image link:</Text>
        <TextInput value={img}  style={{borderWidth:1}} onChangeText={(text)=>setImg(text)}/>

      <Button title='Submit'
      onPress={()=>{
          let mydata=JSON.parse(route.params.datastring);
          let item = {key:title,isbn:isbn,copies:copies,img:img};
          mydata.push(item);
          let stringdata=JSON.stringify(mydata);
          setData(stringdata);
        }
      }
      />
    </View>
  );
};

export default Add;

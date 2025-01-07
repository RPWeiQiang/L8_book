import React,{useState} from 'react';
import { Alert, View, Button, Text, TextInput } from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Edit = ({navigation, route}) => {
    let mydata=JSON.parse(route.params.datastring);
    let myindex=route.params.index;

    const[title,setTitle] = useState(route.params.key);
    const[isbn,setIsbn] = useState(route.params.isbn);
    const[copies,setCopies] = useState(route.params.copies);
    const[img,setImg] = useState(route.params.img);

    const setData=async(value)=>{
        AsyncStorage.setItem("bookdata",value);
        navigation.navigate("Home");
    }
  return (
    <View>
        <Text>Title:</Text>
        <TextInput value={title}  style={{borderWidth:1}} onChangeText={(text)=>setTitle(text)}/>
        <Text>ISBN:</Text>
        <TextInput value={isbn}  style={{borderWidth:1}} onChangeText={(text)=>setIsbn(text)}/>
        <Text>Copies Owned:</Text>
        <TextInput value={copies}  style={{borderWidth:1}} onChangeText={(text)=>setCopies(text)}/>
        <Text>Image link:</Text>
        <TextInput value={img}  style={{borderWidth:1}} onChangeText={(text)=>setImg(text)}/>
      <View style={{flexDirection:"row"}}>
        <View style={{margin:10,flex:1}}>
        <Button title='Save'
          onPress={()=>{
              mydata[myindex].key=title;
              mydata[myindex].isbn=isbn;
              mydata[myindex].copies=copies;
              mydata[myindex].img=img;
              let stringdata=JSON.stringify(mydata);
              setData(stringdata);
          }
        }
        />
        </View>
        <View style={{margin:10,flex:1}}>
        <Button title='Delete'
          onPress={()=>{
            Alert.alert("Are you sure?",'',
              [{text:'Yes', onPress:()=>{
                mydata.splice(myindex,1);
                let stringdata=JSON.stringify(mydata);
                setData(stringdata);
              }},
              {text:'No'}])
          }
        }
        />
        </View>
      </View>
    </View>
  );
};

export default Edit;

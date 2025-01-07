import React, {useState} from 'react';
import {StatusBar, Button, SectionList, StyleSheet, Text, TouchableOpacity, View, FlatList,Image} from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin:20
    },
    image: {
        width: 100,
        height: 150,
    },
	textStyle: {
    	fontSize: 15,
   		textAlign: 'left',
        marginBottom:10
 	 },
    bookDes:{
      width:200,
        marginRight:20
    },
   opacityStyle: {
      borderWidth: 1,
   },
   headerText: {
    fontSize: 16,
    fontWeight:'bold',
       marginBottom:10,
    fontFamily:'impact',
  },
});

const Home = ({navigation}) => {
    const [mydata, setMyData] = useState([])
    const getData = async () => {
        let datastr = await AsyncStorage.getItem('bookdata');
        if (datastr !== null) {
            jsondata= JSON.parse(datastr);
            setMyData(jsondata);
        }
        else{
            setMyData(datasource)
        }
    };
    getData();
  const renderItem = ({item, index}) => {
    return (
    <TouchableOpacity style={styles.opacityStyle}
    onPress={()=>
      {
          let datastr=JSON.stringify(mydata);
          navigation.navigate("Edit",{index:index, isbn:item.isbn, key:item.key,copies:item.copies,img:item.img,datastring:datastr});
      }
    }
    >
        <View style={styles.container}>
            <View style={styles.bookDes}>
                <Text style={styles.headerText}>{item.key}</Text>
                <Text style={styles.textStyle}>ISBN: {item.isbn}</Text>
                <Text style={styles.textStyle}>Copies Owned: {item.copies}</Text>
            </View>
            <Image
                source={{ uri: item.img }}
                style={styles.image}
            />
        </View>

    </TouchableOpacity>
    );
  };

   return (
    <View>
      <StatusBar/>
	  <Button title='New Book' onPress={()=>{
          let datastr=JSON.stringify(mydata);
          navigation.navigate("Add",{datastring:datastr})
      }}/>
      <FlatList data={mydata} renderItem={renderItem}/>
    </View>
  );
};

export default Home;

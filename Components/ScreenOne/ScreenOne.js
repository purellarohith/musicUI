import React from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import Header from '../Header';
import ListItems from './ListItems';
import Middle from './Middle';

import { CurrentSong, DataApi, MetaData } from './../../Hooks/ContextAPi'



const ScreenOne = ({ navigation }) => {

  const [data, setData] = React.useContext(DataApi);
  const [currentSong,setCurrentSong] = React.useContext(CurrentSong)

  

  return (
    <SafeAreaView style={styles.mainComponent}>
      <StatusBar hidden />
      <Header>
        <Middle OnPress={() => navigation.navigate('screenTwo')} />
        <ListItems data={data}  />
      </Header>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainComponent: {
    flex: 1
  }
});
export default ScreenOne;

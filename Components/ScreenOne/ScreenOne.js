import React from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView,ActivityIndicator  } from 'react-native';
import Header from '../Header';
import ListItems from './ListItems';
import Middle from './Middle';

import { CurrentSong, DataApi, Loaded, MetaData } from './../../Hooks/ContextAPi'
import { colors } from '../constants';




const ScreenOne = ({ navigation }) => {

  const [data, setData] = React.useContext(DataApi);
  const [currentSong, setCurrentSong] = React.useContext(CurrentSong)
  const [isLoaded,setLoaded] = React.useContext(Loaded)
  React.useEffect(() => {
    console.log("SuccessFull");
  }, [data])


  return (
    <SafeAreaView style={styles.mainComponent}>
      <StatusBar hidden />
      <Header>
        <Middle OnPress={() => navigation.navigate('screenTwo')} />
        {isLoaded ? 
         ( <ListItems data={data} />)
          :(
            <ActivityIndicator size="large" color={colors.boldText} />
          )
        }
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

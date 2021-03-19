import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, SafeAreaView, StatusBar } from 'react-native';


import { DataApi, MetaData } from '../Hooks/ContextAPi';
import { spalshImage, width } from './constants';





const SplashScreen = ({ navigation }) => {
  const [data, setData] = React.useContext(DataApi);
  // const [metaData, setMetaData] = React.useContext(MetaData);
  
  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace('screenOne')
    }, 750)
  }, [])

  return (
    <SafeAreaView style={Styles.SplashMain}>
      <StatusBar backgroundColor='#000' />
      <ImageBackground
        style={StyleSheet.absoluteFill}
        source={{ uri: spalshImage }}
      >
        <View style={Styles.InnerContainer}>
          <Text style={Styles.Title}>MUSIC_UI</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  SplashMain: {
    flex: 1,
  },
  InnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Title: {
    color: 'darkgray',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '600',
    width: width,
    fontFamily: 'monospace'
  }
});

export default SplashScreen;


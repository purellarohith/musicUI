import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, SafeAreaView, StatusBar } from 'react-native';


import { DataApi, SplashScreenLoading } from '../Hooks/ContextAPi';
import { spalshImage, width } from './constants';





const SplashScreen = ({ navigation }) => {
  const [data, setData] = React.useContext(DataApi);
  const [isSplashLoaded, setSplashLoaded] = React.useContext(SplashScreenLoading);

  React.useEffect(() => {
    if (isSplashLoaded === true) {
      setTimeout(() => {
        navigation.replace('screenOne')
      }, 750)
    }
  }, [isSplashLoaded])

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


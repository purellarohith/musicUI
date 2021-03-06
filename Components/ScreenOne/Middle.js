import React from 'react'
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Neomorph } from 'react-native-neomorph-shadows'
import LikeIcon from 'react-native-vector-icons/AntDesign';
import DetailsIcon from 'react-native-vector-icons/Entypo';
import { CurrentSong } from '../../Hooks/ContextAPi';

let { width, height } = Dimensions.get('window')

const Middle = ({OnPress}) => {
  const [currentSong,setCurrentSong] = React.useContext(CurrentSong)
  return (
    <View style={styles.mainComponent}>
      <View>
        <TouchableOpacity >
          <Neomorph
            inner // <- enable shadow inside of Neomorph
            swapShadows // <- change zIndex of each shadow color
            style={styles.icon}>
            <LikeIcon name="heart" size={20} color="#A2B1CA" />
          </Neomorph>
        </TouchableOpacity>
      </View>
      <Animated.View>
        <TouchableOpacity  onPress={OnPress}>
          <Neomorph
            inner // <- enable shadow inside of Neomorph
            swapShadows // <- change zIndex of each shadow color
            // eslint-disable-next-line react-native/no-inline-styles
            style={styles.imageOuter}>
            <Image
              source={{
                uri:currentSong.image,
                width: width / 2,
                height: width / 2,
              }}
              resizeMode="cover"
              style={styles.imageInner}
            />
          </Neomorph>
        </TouchableOpacity>
      </Animated.View>
      <View>
        <TouchableOpacity >
          <Neomorph
            inner // <- enable shadow inside of Neomorph
            swapShadows // <- change zIndex of each shadow color
            style={styles.icon}>
            <DetailsIcon name="dots-three-horizontal" size={20} color="#A2B1CA" />
          </Neomorph>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Middle

const styles = StyleSheet.create({
  mainComponent: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  imageOuter: {
    width: width / 2,
    height: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DEE9F7',
    shadowRadius: 6,
    borderRadius: width / 2 / 2,
    padding: 20
  },
  imageInner: {
    borderRadius: (width / 2 / 2) + 50,
    width: width / 2 - 10,
    height: width / 2 - 10,
  }, icon: {
    width: 30, shadowRadius: 6,
    borderRadius: 25, width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DEE9F7',
  }
})

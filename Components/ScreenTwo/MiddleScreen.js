import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, Animated } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Neomorph } from 'react-native-neomorph-shadows'
import { CurrentSong } from '../../Hooks/ContextAPi';

let { width, height } = Dimensions.get('window');



const MiddleScreen = () => {
  const [currentSong, setCurrentSong] = React.useContext(CurrentSong)
 
  return (
    <View style={styles.mainContainer}>
      <Animated.View style={styles.animView}>
        <TouchableOpacity>
          <Neomorph
            inner // <- enable shadow inside of Neomorph
            swapShadows // <- change zIndex of each shadow color
            // eslint-disable-next-line react-native/no-inline-styles
            style={styles.imageOuter}>
            <Image
              source={{
                uri: currentSong.image,
                width: width / 2,
                height: width / 2,
              }}
              resizeMode="cover"
              style={styles.imageInner}
            />
          </Neomorph>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center'
  }, imageOuter: {
    width: width / 2 + width / 3,
    height: width / 2 + width / 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DEE9F7',
    shadowRadius: 6,
    borderRadius: (width / 2 + width / 3) / 2,
    padding: 20
  },
  imageInner: {
    borderRadius: ((width / 2 + width / 3) / 2) + 50,
    width: width / 2 + width / 3 - 10,
    height: width / 2 + width / 3 - 10,
  },
  animView: {
    width: width / 2 + width / 3,
    height: width / 2 + width / 3,
    borderRadius: (width / 2 + width / 3) / 2
  }
})

export default MiddleScreen

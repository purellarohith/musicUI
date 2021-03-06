import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { CurrentSong } from '../../Hooks/ContextAPi'

const MiddleBelow = () => {
  const [currentSong, setCurrentSong] = React.useContext(CurrentSong)
  return (
    <View style={styles.mainContainer}>
      <Text numberOfLines={1} style={styles.upperText}>{currentSong.name}</Text>
      <Text numberOfLines={1} style={styles.lowerText}>{currentSong.artist}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  upperText: {
    textAlign: 'center',
    fontSize: 24,
    width: Dimensions.get('window').width - 100,
    color: '#79889f',
    fontWeight: '600'
  },
  lowerText: {
    textAlign: 'center',
    width: Dimensions.get('window').width - 100,
    fontSize: 20,
    color: '#9aa8bf'
  }
})

export default MiddleBelow

import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import SkipIcons from 'react-native-vector-icons/Ionicons';
import SongIcon from 'react-native-vector-icons/Foundation';
import { Neomorph } from 'react-native-neomorph-shadows';
import { CurrentSong } from '../../Hooks/ContextAPi';
import { colors } from '../constants';
import TrackPlayer from 'react-native-track-player';

const BottomContaollers = () => {

  const [currentSong, setCurrentSong] = React.useContext(CurrentSong)

  const actionIcon = currentSong.isPlaying === true ? 'pause' : 'play'
  let activeColor = currentSong.isPlaying === true ? colors.active : "#DEE9F7"
  let activeIconColor = currentSong.isPlaying === true ? colors.three : colors.two

  const playButtonhandler = () => {
    currentSong.isPlaying ? TrackPlayer.pause() : TrackPlayer.play()
  }
  const nextButtonhandler = () => {
    TrackPlayer.skipToNext()
  }
  const prevButtonhandler = () => {
    TrackPlayer.skipToPrevious()
  }

  return (
    <View style={styles.mainContainer}>
      <View>
        <TouchableOpacity onPress={() => prevButtonhandler()} >
          <Neomorph
            inner // <- enable shadow inside of Neomorph
            swapShadows // <- change zIndex of each shadow color
            style={
              styles.icon
            }>
            <SkipIcons name="play-back" size={20}
              color="#A2B1CA"
            />
          </Neomorph>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => playButtonhandler()} >
          <Neomorph
            inner // <- enable shadow inside of Neomorph
            swapShadows // <- change zIndex of each shadow color
            style={{
              ...styles.icon, backgroundColor: activeColor
            }}>
            {/* <SongIcon name={item.iconsChange ? 'play' : 'pause'} size={20} /> */}
            <SongIcon name={actionIcon} size={20}
              // color={'#A2B1CA'}
              color={activeIconColor}
            />
          </Neomorph>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => nextButtonhandler()}>
          <Neomorph
            inner // <- enable shadow inside of Neomorph
            swapShadows // <- change zIndex of each shadow color
            style={
              styles.icon
            }>
            {/* <SongIcon name={item.iconsChange ? 'play' : 'pause'} size={20} /> */}
            <SkipIcons name="play-forward" size={20} color="#A2B1CA" />
          </Neomorph>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  icon: {
    height: 80,
    shadowRadius: 6,
    borderRadius: 40,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DEE9F7',
  }
});

export default BottomContaollers

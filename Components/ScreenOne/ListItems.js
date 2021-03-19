import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Neomorph } from 'react-native-neomorph-shadows';
import SongIcon from 'react-native-vector-icons/Foundation';
import { colors, width } from '../constants';

import TrackPlayer from 'react-native-track-player';
import TrackPlayerEvents from 'react-native-track-player/lib/eventTypes';
import { useTrackPlayerEvents } from 'react-native-track-player/lib/hooks'
import { CurrentSong } from '../../Hooks/ContextAPi';


const events = [
  TrackPlayerEvents.PLAYBACK_STATE,
  TrackPlayerEvents.PLAYBACK_ERROR,
  TrackPlayerEvents.PLAYBACK_QUEUE_ENDED,
  TrackPlayerEvents.PLAYBACK_TRACK_CHANGED,
  TrackPlayerEvents.REMOTE_BOOKMARK,
  TrackPlayerEvents.REMOTE_DISLIKE,
  TrackPlayerEvents.REMOTE_DUCK,
  TrackPlayerEvents.REMOTE_JUMP_BACKWARD,
  TrackPlayerEvents.REMOTE_JUMP_FORWARD,
  TrackPlayerEvents.REMOTE_LIKE,
  TrackPlayerEvents.REMOTE_PAUSE,
  TrackPlayerEvents.REMOTE_PLAY,
  TrackPlayerEvents.REMOTE_PLAY_ID,
  TrackPlayerEvents.REMOTE_PLAY_SEARCH,
  TrackPlayerEvents.REMOTE_PREVIOUS,
  TrackPlayerEvents.REMOTE_SEEK,
  TrackPlayerEvents.REMOTE_SET_RATING,
  TrackPlayerEvents.REMOTE_SKIP,
  TrackPlayerEvents.REMOTE_STOP,
];







const ListItems = ({ data }) => {

  const [currentSong, setCurrentSong] = React.useContext(CurrentSong)

  //HOOKS
  useTrackPlayerEvents(events, (e) => {
    TrackPlayer.getState().then((state) => {
      console.log('State => ', state);
      if (state === 3) {
        TrackPlayer.getCurrentTrack().then((current) => {
          TrackPlayer.getTrack(current).then((res) => {
            if (res.artwork.startsWith('http')) {
              setCurrentSong({ ...currentSong, index: Number(res.id), isPlaying: true, image: res.artwork, name: res.title, artist: res.artist, endLength: data.length })
            } else {
              setCurrentSong({ ...currentSong, index: Number(res.id), isPlaying: true, image: "data:image/png;base64," + res.artwork, name: res.title, artist: res.artist, endLength: data.length })
            }
          });
        });
      }
      if (state === 2) {
        if (currentSong.index !== null) {
          TrackPlayer.getCurrentTrack().then((current) => {
            TrackPlayer.getTrack(current).then((res) => {
              // console.log(res.artwork);
              if (res.artwork.startsWith('http')) {
                setCurrentSong({ ...currentSong, index: Number(res.id), isPlaying: false, image: res.artwork, name: res.title, artist: res.artist })
              } else {
                setCurrentSong({ ...currentSong, index: Number(res.id), isPlaying: false, image: "data:image/png;base64," + res.artwork, name: res.title, artist: res.artist })
              }
            });
          });
        }
      }
      if (state === 1) {
        ToastAndroid.showWithGravity(
          'PlayBack In List Have Completed...',
          5000,
          ToastAndroid.CENTER,
        );
        setCurrentSong({ ...currentSong, index: null, isPlaying: false })
        TrackPlayer.stop();
      }
    });


  })

  //Hooks

  const PlayerController = (item, index, fuctionType) => {
    // console.log(item)
    console.log(`index => ${index}`);
    console.log(`currentSong.index => ${currentSong.index}`);
    if (fuctionType === 'play') {
      // setSong({ ...song, index: index, isPlaying: true })
      if (currentSong.index === index) {
        TrackPlayer.play()
      }
      if (currentSong.index !== index) {
        TrackPlayer.skip(index.toString())
          .then(() => TrackPlayer.play())
          .catch((err) => {
            console.log(err);
          })
      }
    }
    if (fuctionType === 'pause') {
      TrackPlayer.pause()
    }

  }













  const renderItems = ({ item, index }) => {

    let colorOne = index === currentSong.index ? '#ccd9f0' : '#e4edfc';
    let colorTwo = index === currentSong.index ? '#d7e4f9' : '#e4edfc';
    let activeColor = index === currentSong.index && currentSong.isPlaying === true ? colors.active : "#DEE9F7"
    let activeIconColor = index === currentSong.index && currentSong.isPlaying === true ? colors.three : colors.two
    let activeButton = index === currentSong.index && currentSong.isPlaying === true ? "pause" : "play"
    let title = item.title === undefined ? item.name : item.title

    return (
      <TouchableOpacity onPress={() => {
        index === currentSong.index && currentSong.isPlaying === true ? PlayerController(item, index, "pause") : PlayerController(item, index, "play")
      }}>
        <LinearGradient colors={[colorOne, colorTwo]} style={styles.itemMainContainer}>
          <View style={styles.iteminnerComponent}>
            <Text numberOfLines={1} style={styles.upperText}>{title}</Text>
            <Text numberOfLines={1} style={styles.lowerText}>{item.artist}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                index === currentSong.index && currentSong.isPlaying === true ? PlayerController(item, index, "pause") : PlayerController(item, index, "play")
              }}
            >
              <Neomorph
                inner // <- enable shadow inside of Neomorph
                swapShadows // <- change zIndex of each shadow color
                style={
                  { ...styles.icon, backgroundColor: activeColor }
                }>
                {/* <currentSongIcon name={item.iconsChange ? 'play' : 'pause'} size={20} /> */}
                <SongIcon
                  name={
                    activeButton
                  }
                  color={activeIconColor}
                  size={20}
                />
              </Neomorph>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    )
  }


  return (
    <View style={styles.mainContainer}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={data}
        renderItem={renderItems}
        contentContainerStyle={{ padding: 6 }}
        // ItemSeparatorComponent={lineSuparator}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // pagingEnabled={true}
        bounces={false}
        decelerationRate="fast"
        scrollEventThrottle={6}
      // refreshControl
      // onRefresh
      // refreshing
      // fadingEdgeLength={1}
      />
    </View>
  )
}

export default ListItems

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0.6,
    // backgroundColor: 'red',
  },
  itemMainContainer: {
    backgroundColor: 'pink',
    height: width / 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 16
  },
  iteminnerComponent: {
    width: width - 100,
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  }, icon: {
    width: 30, shadowRadius: 6,
    borderRadius: 25, width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperText: {
    width: width - 100,
    fontSize: 22,
    color: '#79889f',
    fontWeight: '600'
  },
  lowerText: {
    width: width - 100,
    fontSize: 20,
    color: '#9aa8bf'
  }
})

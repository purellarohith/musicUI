import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Slider } from 'react-native-elements';
import ThumbImage from './../image/Image.jpg';
import { width, colors } from './../constants';
import { useTrackPlayerProgress } from 'react-native-track-player/lib/hooks';
import TrackPlayer from 'react-native-track-player';

const Progress = () => {

  const thumb = {
    Component: Animated.Image,
    source: ThumbImage
  }







  const [value, setValue] = React.useState(0)
  const [runningDuration, setRunningDuration] = React.useState("0:00")
  const [durationTotal, setTotalDuration] = React.useState("0:00")
  const { position, duration } = useTrackPlayerProgress(1000)








  React.useEffect(() => {
    let a, b, c, d, e, f, g, h, i, j, k
    a = (position / 60).toString()
    b = a.slice(a.indexOf('.'))
    c = Math.floor(Number(b) * 60)
    e = (duration / 60).toString()
    f = e.slice(a.indexOf('.'))
    if (Math.floor(Number(a)).toLocaleString().length === 1) {
      k = `0${Math.floor(Number(a))}`
    }
    if (Math.floor(Number(a)).toLocaleString().length >= 2) {
      k = `${Math.floor(Number(a))}`
    }
    if (c.toLocaleString().length === 1) {
      d = `${k}:0${c}`
    }
    if (c.toLocaleString().length >= 2) {
      d = `${k}:${c}`
    }

    if (Math.floor(Number(e)).toLocaleString().length === 1) {
      j = `0${Math.floor(Number(e))}`
    }
    if (Math.floor(Number(e)).toLocaleString().length >= 2) {
      j = `${Math.floor(Number(e))}`
    }
    g = Math.floor(Number(f) * 60)
    if (g.toLocaleString().length === 1) {
      h = `${Math.floor(Number(e))}:0${g}`
    }
    if (g.toLocaleString().length >= 2) {
      h = `${j}:${g}`
    }
    i = position / duration
    setValue(i)
    setRunningDuration(d)
    setTotalDuration(h)
  }, [position, duration])


  const onSliderMove = (values) => {
    setValue(values)
  }

  const onSliderCompleted = async (value) => {
    console.log("Sliding Complete =>", value)
    let sliderDuration = duration * value
    TrackPlayer.seekTo(sliderDuration).then(() => {
      TrackPlayer.play()
    }).catch((err) => alert("error While playing"))
  }

  const onSliderStart = () => {
    TrackPlayer.pause()
  }

  return (
    <View style={styles.maincontainer}>
      <View style={styles.durationStyles}>
        <Text style={[styles.durationText, { marginLeft: 10 }]}>{runningDuration}</Text>
        <Text style={[styles.durationText, { marginRight: 10 }]}>{durationTotal}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Slider
          value={value || 0}
          minimumValue={0}
          maximumValue={1}
          style={styles.sliderMainContainer}
          thumbProps={thumb}
          thumbStyle={styles.sliderThumbStyle}
          trackStyle={styles.sliderTrackStyle}
          minimumTrackTintColor={colors.min}
          maximumTrackTintColor={'#FFF'}
          onValueChange={onSliderMove}
          onSlidingStart={onSliderStart}
          onSlidingComplete={onSliderCompleted}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  durationStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  durationText: {
    color: 'gray',
    textAlign: 'center'
  },
  sliderMainContainer: {
    flex: 1,
    width: width - 40,
    alignSelf: 'center'
  },
  sliderThumbStyle: {
    width: 25,
    height: 25,
  },
  sliderTrackStyle: {
    height: 5,
    borderRadius: 3
  }

})

export default Progress
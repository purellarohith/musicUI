import TrackPlayer from 'react-native-track-player';

const TrackplayerServices = async () => {
  TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());
  TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());
  TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.stop());
  TrackPlayer.addEventListener('playback-state', (state) => {
    // console.log('playback state : ', state);
  });
  TrackPlayer.addEventListener('playback-track-changed', () => {
    console.log('TrackChanged');
  });
  TrackPlayer.addEventListener('remote-next', () =>
    TrackPlayer.skipToNext().finally(() => TrackPlayer.play()),
  );
  TrackPlayer.addEventListener('remote-previous', () =>
    TrackPlayer.skipToPrevious().finally(() => TrackPlayer.play()),
  );
};

export default TrackplayerServices;

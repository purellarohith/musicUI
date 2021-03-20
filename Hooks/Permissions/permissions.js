import { Alert, ToastAndroid, Linking } from "react-native";
import { check, request, RESULTS } from "react-native-permissions"
import RNFS from 'react-native-fs';
import MediaMeta from 'react-native-media-meta';
import TrackPlayer from 'react-native-track-player';
import { imageUri } from "../../Components/constants";
import { BackHandler } from "react-native";

export const androidCheckPermission = (permission, setState, setLoaded, setSplashLoaded) => {
  check(permission).then((res) => {
    console.log(res)
    switch (res) {
      case RESULTS.BLOCKED:
        {
          Alert.alert(
            'Storage Permisions are Blocked',
            'Allow Storage Permission in App Settings and Restart the App',
            [
              {
                text: 'Cancel',
                onPress: () => BackHandler.exitApp(),
                style: 'cancel',
              },
              {
                text: 'Ok',
                onPress: () => Linking.openSettings()
                ,
                style: 'default',
              },
            ],
          );
        }
        break;
      case RESULTS.DENIED:
        {
          Alert.alert(
            'Storage Permissions Denied',
            'Allow Storage Permission ',
            [
              {
                text: 'Cancel',
                onPress: () => BackHandler.exitApp(),
                style: 'cancel',
              },
              {
                text: 'Ok',
                onPress: () => {
                  request(permission).then((PR) => {
                    if (PR === RESULTS.GRANTED) {
                      setSplashLoaded(true)
                      ToastAndroid.showWithGravityAndOffset("Permission Granted", 500, ToastAndroid.BOTTOM, 0, 80)
                      FileReader(RNFS.ExternalStorageDirectoryPath, setState, setLoaded)
                    }
                    if (PR === RESULTS.DENIED) {
                      BackHandler.exitApp()
                    }
                    if (PR === RESULTS.BLOCKED) {
                      BackHandler.exitApp()
                    }
                    // console.log(PR)
                  }).catch(err => console.log(err));
                },
                style: 'default',
              },
            ],
          );
        }
        break;

      case RESULTS.LIMITED:
        {
          Alert.alert(
            'Storage Permissions Limited',
            'Allow Storage Permission ',
            [
              {
                text: 'Ok',
                style: 'default',
              },
            ],
          );
        }
        break;

      case RESULTS.UNAVAILABLE:
        {
          Alert.alert(
            'Storage Permissions Unavailable',
            'Allow Storage Permission ',
            [
              {
                text: 'Ok',
                style: 'default',
              },
            ],
          );
        }
        break;

      case RESULTS.GRANTED:
        {
          setSplashLoaded(true)
          ToastAndroid.showWithGravityAndOffset("Permission Granted", 500, ToastAndroid.BOTTOM, 0, 80)
          FileReader(RNFS.ExternalStorageDirectoryPath, setState, setLoaded)
        }

        break;

      default:
        console.log("default permission settings");
        break;
    }
  })
}


const playerData = async (data) => {
  await TrackPlayer.setupPlayer({})
  await TrackPlayer.updateOptions({
    stopWithApp: true,
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      // TrackPlayer.CAPABILITY_STOP,
    ],
    // compactCapabilities: [
    //   TrackPlayer.CAPABILITY_PLAY,
    //   TrackPlayer.CAPABILITY_PAUSE,
    //   TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
    //   TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
    // TrackPlayer.CAPABILITY_STOP,
    // ],
  });
  await TrackPlayer.reset()
  await TrackPlayer.add(data)

}



export const FileReader = async (mainFolder, setState, setLoaded) => {
  let dummyArray = [];
  let dummyreqArray = [];
  let dummyMetaData = [];
  let dummyTrackData = [];
  let dummyFinalData = [];
  let final = [];
  await RNFS.readDir(mainFolder)
    .then((res) => {
      [...dummyArray] = [...res]
    }
    ).then(async () => {
      // console.table(dummyArray);
    }).then(async () => {
      if (Array.isArray(dummyArray)) {
        for (let a of dummyArray) {
          // console.log(dummyArray.length);
          if (a.isDirectory()) {
            let check = await RNFS.readDir(a.path)
            if (Array.isArray(check)) {
              for (let b of check) {
                if (b.isDirectory()) {
                  dummyArray.push(b)
                }
                if (b.isFile()) {
                  if (b.path.endsWith('.mp3')) {
                    dummyreqArray.push(b)
                  }
                }
              }
            }
          }
          if (a.isFile()) {
            if (a.path.endsWith('.mp3')) {
              dummyreqArray.push(a)
            }
          }
        }
      }
    }).then(() => {
      // console.log(dummyArray.length);
      // console.table(dummyreqArray.length);
    })
    .then(async () => {
      for (let a = 0; a <= dummyreqArray.length - 1; a++) {
        let something = await MediaMeta.get(dummyreqArray[a].path)
        dummyMetaData[a] = await something
      }
    }).then(() => {
      // console.table(dummyMetaData);
      for (let a = 0; a <= dummyMetaData.length - 1; a++) {
        dummyFinalData[a] = { ...dummyreqArray[a], ...dummyMetaData[a] }
      }
    })
    .then(() => {
      let TrackLoop = (index, item, mainitem) => {
        let trackList = {
          id: index.toString(), // Must be a string, required
          url: `file://${mainitem.path}`, // Load media from the network , appBundle , Location
          title: item.title || mainitem.name,
          artist: item.artist || 'Self',
          album: item.album || 'while(1<2)',
          genre: 'Songs',
          date: mainitem.mtime.toString(), // RFC 3339
          artwork: item.thumb || imageUri,
        };
        dummyTrackData[index] = trackList
      };
      for (let a = 0; a <= dummyMetaData.length - 1; a++) {
        TrackLoop(a, dummyMetaData[a], dummyreqArray[a])
      }

    }).then(() => {
      // console.table(dummyTrackData);
      // console.table(dummyFinalData);
    }).then(async () => {
      await playerData(dummyTrackData)
    }).then(() => {
      console.log("Completed");
    }).then(() => {
      if (dummyFinalData.length <= 0) {
        Alert.alert(
          'Alert',
          'No Music Tracks Found ',
          [
            {
              text: 'Ok',
              style: 'default',
            },
          ],
        );
      } else {
        setState(dummyFinalData)
        setLoaded(true)
      }
    })
    .catch((err) => {
      console.log(err);
    })
}
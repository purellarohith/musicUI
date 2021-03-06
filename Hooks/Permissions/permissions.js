import { Alert, ToastAndroid, Linking } from "react-native";
import { check, request, RESULTS } from "react-native-permissions"
import RNFS from 'react-native-fs';
import TrackPlayer from 'react-native-track-player'
import MediaMeta from 'react-native-media-meta';


export const androidCheckPermission = (permission, setState) => {
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
                onPress: () => console.log('Canceled'),
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
                onPress: () => console.log('Canceled'),
                style: 'cancel',
              },
              {
                text: 'Ok',
                onPress: () => {
                  request(permission).then((PR) => {
                    if (PR === RESULTS.GRANTED) {
                      ToastAndroid.showWithGravityAndOffset("Permission Granted", 500, ToastAndroid.BOTTOM, 0, 80)
                      FileReader(RNFS.ExternalStorageDirectoryPath, setState)
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
          ToastAndroid.showWithGravityAndOffset("Permission Granted", 500, ToastAndroid.BOTTOM, 0, 80)
          FileReader(RNFS.ExternalStorageDirectoryPath, setState)
        }

        break;

      default:
        console.log("default permission settings");
        break;
    }
  })
}

let loadinga = 0;

const loading = () => {
  ToastAndroid.showWithGravityAndOffset(`Loading${loadinga}`, 500, ToastAndroid.BOTTOM, 0, 80)
  loadinga++
}






export const FileReader = (mainFolder, setState) => {

  let image = "https://images.unsplash.com/photo-1607304021641-5cd8b6f6f894?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"

  let dummyArray = [];
  let dummyreqArray = [];
  let dummyMetaData = [];
  let dummyFinalData = [];
  let dummyTrackData = [];
  let testArray = [];
  RNFS.readDir(mainFolder)
    .then((res) => {

      for (let a = 0; a <= res.length - 1; a++) {
        dummyArray[a] = res[a]
      }
    }
    ).then(async () => {
      let length = 0;
      do {
        length = dummyArray.length
        for (let a = 0; a <= dummyArray.length - 1; a++) {

          if (dummyArray[a].isDirectory()) {
            await RNFS.readDir(dummyArray[a].path).then((res) => {
              try {
                if (res.length > 0) {
                  for (let b of res) {
                    testArray.push(b)
                  }
                }
              } catch (error) {
                console.log("errrororor");
              }
            })
          }
          if (a === dummyArray.length - 1) {
            if (testArray.length > 0) {
              for (let d = 0; d <= testArray.length - 1; d++) {
                dummyArray[dummyArray.length + d] = testArray[d]
              }
            }
          }
        }
        console.log(" tes:", testArray.length);
        console.log("dumm :", dummyArray.length);
        console.log(" len:", length);

      } while (length !== dummyArray.length)



    }).then(() => {
      console.log(dummyArray.length);
    })
    .catch((err) => {
      console.log(err);
    })
}
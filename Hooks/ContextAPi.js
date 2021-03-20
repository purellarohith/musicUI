// Lib
import React from 'react'
import { PERMISSIONS } from 'react-native-permissions'
import { imageUri } from '../Components/constants';
// Files
import { androidCheckPermission } from './Permissions/permissions'


export const DataApi = React.createContext();
export const MetaData = React.createContext();
export const ImageApi = React.createContext();
export const CurrentSong = React.createContext();
export const Loaded = React.createContext();
export const SplashScreenLoading = React.createContext();


const ContextAPi = ({ children }) => {

  const [data, setData] = React.useState([])
  const [metaData, setMetaData] = React.useState([])
  const [currentSong, setCurrentSong] = React.useState({ index: null, isPlaying: false, image: imageUri, name: '', artist: '', endLength: '' })
  const [isLoaded, setLoaded] = React.useState(false)
  const [isSplashLoaded, setSplashLoaded] = React.useState(false)
  React.useEffect(() => {
    (async () => {
      await androidCheckPermission(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        setData,
        setLoaded,
        setSplashLoaded
      );
    })();
  }, [])



  return (
    <>
      <SplashScreenLoading.Provider value={[isSplashLoaded, setSplashLoaded]} >
        <Loaded.Provider value={[isLoaded, setLoaded]} >
          <DataApi.Provider value={[data, setData]}>
            <MetaData.Provider value={[metaData, setMetaData]}>
              <CurrentSong.Provider value={[currentSong, setCurrentSong]}>
                {children}
              </CurrentSong.Provider>
            </MetaData.Provider>
          </DataApi.Provider>
        </Loaded.Provider>
      </SplashScreenLoading.Provider>
    </>
  )
}

export default ContextAPi

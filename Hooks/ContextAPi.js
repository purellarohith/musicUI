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

const ContextAPi = ({ children }) => {

  const [data, setData] = React.useState([])
  const [metaData, setMetaData] = React.useState([])
  const [currentSong, setCurrentSong] = React.useState({ index: null, isPlaying: false, image: imageUri ,name:'',artist:'' })

  React.useEffect(() => {
    (async () => {
      await androidCheckPermission(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        setData,
      );
    })();
  }, [])



  return (
    <>
      <DataApi.Provider value={[data, setData]}>
        <MetaData.Provider value={[metaData, setMetaData]}>
          <CurrentSong.Provider value={[currentSong, setCurrentSong]}>
            {children}
          </CurrentSong.Provider>
        </MetaData.Provider>
      </DataApi.Provider>
    </>
  )
}

export default ContextAPi

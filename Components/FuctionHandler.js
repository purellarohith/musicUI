import MediaMeta from 'react-native-media-meta';




export const metadataExtract = (data, setMetaData) => {
  if (data.length !== 0) {
    let DummyData = [...data]
    DummyData.forEach(async(item, index) => {
      if (item.path) {
        let Some = {};
       await MediaMeta.get(item.path)
          .then((metadata) => {
            Some.album = metadata.album;
            Some.artist = metadata.artist;
            Some.comment = metadata.comment;
            Some.duration = metadata.duration;
            Some.encoder = metadata.encoder;
            Some.metaHeight = metadata.height;
            Some.thumb = metadata.thumb;
            Some.title = metadata.title;
            Some.metaWidth = metadata.width;
            console.log(Some);
          })
          .catch((err) => console.error(err));
      }
    })
  }

}
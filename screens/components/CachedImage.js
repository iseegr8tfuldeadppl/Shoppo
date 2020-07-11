import React, { useState } from 'react';
import { View, Image, ActivityIndicator, Dimensions, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

const CachedImage = props => {

    const [imguri, setImgeUri] = useState('');
    const [run, setRun] = useState(true);

    const prepareLink = url => {
        let clean = url.replace(/\-/g, "")
                    .replace(/\//g, "")
                    .replace(/\:/g, "")
                    .replace(/\-/g, "")
                    .replace(/\./g, "")
                    .replace(/\+/g, "")
                    .replace(/\%/g, "")
                    .replace(/\=/g, "");
        if(clean.length>100){
            return clean.substring(0, 99);
        }
        return clean;
    };

    const ddo = async () => {
        if(props.source.substring(0, 5)==="data:"){
            setImgeUri(props.source);
            return;
        }
        let title = prepareLink(props.source);
        let extension = props.source.slice((props.source.lastIndexOf(".") - 1 >>> 0) + 2);
        if ((extension.toLowerCase() !== 'jpg') && (extension.toLowerCase() !== 'png') && (extension.toLowerCase() !== 'gif')) {
            extension = "jpg";
        }
        loadLocal(`${FileSystem.cacheDirectory + title}.${ extension }`, true, extension);
    };

    const loadLocal = (uri, download, extension) => {
        Image.getSize(uri, (width, height) => {
            // once we have the original image dimensions, set the state to the relative ones
            setImgeUri(uri);
            //setWidth(Dimensions.get('window').width);
            //setHeight((height/width)*Dimensions.get('window').width);
        }, (e) => {
            // As always include an error fallback
            //console.log('getSize error:', e);
            if(e.contains("Unsupported uri")){
                setImgeUri(uri);
            } else {
                let title = prepareLink(props.source);
                ;(async () => {
                    await FileSystem.downloadAsync(
                        props.source,
                        `${FileSystem.cacheDirectory + title}.${ extension }`
                    )
                    .then(({ uri }) => {
                        loadLocal(Platform.OS === 'ios'? uri : title, false, extension);
                    });
                })();
            }
        });
    };

    if(run){
        setRun(false);
        ddo();
    }

    const page = () => {
        if (!imguri) {
          // while the image is being checked and downloading
          return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator
                size='large'
              />
            </View>
          );
        }
      // otherwise display the image
      return(
          <Image
            style={props.style}
            source={{ uri: imguri }}
          />
      );
    };

    return(page());
};

export default CachedImage;

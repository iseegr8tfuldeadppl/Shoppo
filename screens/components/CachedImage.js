import React, { useState } from 'react';
import { View, Image, ActivityIndicator, Dimensions, Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'


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
                    .replace(/\=/g, "")
                    .replace(/\?/g, "")
                    .replace(/\&/g, "");
        if(clean.length>100){
            return clean.substring(0, 99);
        }
        return clean;
    };

    const ddo = async () => {

        try {
            if(props.source.substring(0, 5)==="data:"){
                setImgeUri(props.source);
                return;
            }

            const { config, fs } = RNFetchBlob;
            let extension = props.source.slice((props.source.lastIndexOf(".") - 1 >>> 0) + 2);
            if ((extension.toLowerCase() !== 'jpg') && (extension.toLowerCase() !== 'png') && (extension.toLowerCase() !== 'gif')) {
                extension = "jpg";
            }
            let title = prepareLink(props.source);

            var options = {
              addAndroidDownloads: {
                //Related to the Android only
                useDownloadManager: true,
                notification: false,
                path: `${fs.dirs.DownloadDir + "/" + title}.${ extension }`,
              },
            };

            loadLocal( options, config);
        } catch(e){
        }
    };

    const loadLocal = (options, config) => {
        Image.getSize("file://" + options.addAndroidDownloads.path, (width, height) => {
            setImgeUri("file://" + options.addAndroidDownloads.path);
        }, (e) => {
            if(String(e).includes("Unsupported uri")){
                setImgeUri("file://" + options.addAndroidDownloads.path);
            } else {
                // As always include an error fallback
                config(options)
                    .fetch('GET', props.source)
                    .then(res => {
                        options = {
                            addAndroidDownloads: {
                                useDownloadManager: true,
                                notification: false,
                                path: res.data,
                            },
                        }

                        loadLocal(options, config);
                    })
                    .catch(e => {
                });
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

import React, {useState} from 'react';
import {Image, TouchableOpacity, Modal, View, StyleSheet} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Banner = props => {

    const [preview, setPreview] = useState(false);

    // source: https://github.com/ascoders/react-native-image-viewer
    const images = [{
        url: props.images,
    }];

    return(
        <View style={{flex: 1, width:"100%"}}>
            <Modal visible={preview} transparent={true}>
                <ImageViewer imageUrls={images}/>
                <View style={{flexDirection:"row", position:"absolute", alignItems:"center"}}>
                    <TouchableOpacity
                        activeOpacity={0.60}
                        onPress={() => {setPreview(false);}}>
                        <MaterialCommunityIcons style={{paddingStart: 9, paddingVertical: 18}} name={"arrow-left"} color={"white"} size={30} />
                    </TouchableOpacity>
                </View>
            </Modal>
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => {setPreview(true);}}>
                <Image
                    style={props.style}
                    source={{uri:props.images}} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    display: {
        width:"100%",
        flex: 1,
    },
});

export default Banner;

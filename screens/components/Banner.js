import React, {useState} from 'react';
import { TouchableOpacity, Modal, View, StyleSheet, Text, BackHandler } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CachedImage from './CachedImage';
import {
    pressToViewPictureString
} from '../constants/strings';


const Banner = props => {

    // source: https://github.com/ascoders/react-native-image-viewer

    if(props.preview){
    	BackHandler.addEventListener('hardwareBackPress', function() {
    		props.setPreview(false);
    	    return true;
    	});
    }

    const urls = () => {
        let urlss = [];
        for(let i=0; i<props.images.length; i++){
            urlss.push({url: props.images[i]});
        }
        return urlss;
    };

    const thumbnailOrNot = () => {
        if(props.showThumbnail)
            return(
                <CachedImage
                    source={props.images[0]}
                    style={props.style}/>
            );

        return(
            <View style={{...{alignItems:"center", backgroundColor:"gray", justifyContent:"center"}, ...props.style}}>
                <Text style={{fontSize: 20, fontWeight:"bold", color:"white"}}>{pressToViewPictureString[props.language]}</Text>
            </View>
        );
    };

    const display = () => {
        if(props.preview){
            return(
                <>
                <ImageViewer imageUrls={urls()}/>
                <View style={styles.header}>
                    <TouchableOpacity
                        activeOpacity={0.60}
                        onPress={() => {props.setPreview(false);}}>
                        <MaterialCommunityIcons style={styles.icon} name={"arrow-left"} color={"white"} size={30} />
                    </TouchableOpacity>
                </View>
                </>
            );
        }

        return(
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => {props.setPreview(props.url? props.url : true);}}>
                {thumbnailOrNot()}
            </TouchableOpacity>
        );
    };

    return(
    <View style={styles.page}>
        {display()}
    </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection:"row",
        position:"absolute",
        alignItems:"center"
    },
    icon: {
        paddingStart: 9,
        paddingVertical: 32
    },
    page: {
        flex: 1,
        width:"100%"
    },
});

export default Banner;

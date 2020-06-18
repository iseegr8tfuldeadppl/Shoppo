import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

const MainProductItem = props => {
    return(
        <TouchableOpacity
            onPress={() => {props.setProductPreviewed(props.item);}}
            activeOpacity={.7}
            style={styles.productItem}>

            <Image
                style={styles.image}
                source={{
                    uri:props.item.data.banner,
                }} />

            <View style={styles.texts}>
                <View style={{flexDirection:'row'}}>
                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.title}>{props.item.data.title}</Text>
                </View>
                <View style={{flexDirection:'row', marginTop:3, }}>
                    <Text
                        style={styles.price}>
                        {props.item.data.cost} DA</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    productItem: {
        justifyContent:'center',
        marginTop:7,
        marginHorizontal:7,
        alignItems:'center',
        flex:0.5,
        height:100,
        borderRadius:25,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 0,
        backgroundColor: Colors.Primary,
        elevation: 5,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 25,
    },
    price: {
        flexWrap: 'wrap',
        backgroundColor: Colors.TransBlack,
        fontSize: 17,
        color: '#FFFFFF'
    },
    title: {
        flexWrap: 'wrap',
        backgroundColor: Colors.TransBlack,
        fontSize: 15,
        color: '#FFFFFF',
    },
    texts: {
        position:'absolute',
        alignItems:"center",
    },

});

export default MainProductItem;

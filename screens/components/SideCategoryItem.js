import React from 'react';
import {View, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';
import MainProductItem from './MainProductItem';
import Colors from '../constants/Colors';

const SideCategoryItem = props => {

    const productCount = () =>  {
        let productCountos = props.item.products.length;
        if(productCountos===0)
            return "No Product";
        else
            return "+ " + productCountos;
    };

    return(
        <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {props.setCategoryPreviewed(props.item); } }
                style={styles.holder}>
            <Text style={styles.text}>{props.item.category}</Text>

            <View style={styles.countContainer}>
                <Text style={styles.countText}>{productCount()}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    countContainer: {
        backgroundColor:"white",
        borderRadius: 10,
        paddingHorizontal:10,
        paddingVertical: 6,
        marginHorizontal: 10,
        marginVertical: 11,
    },
    countText: {
        color: Colors.Accent,
        fontSize: 14,
    },
    holder: {
        flexDirection:"row",
        backgroundColor: Colors.Accent,
        marginVertical: 6,
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius: 7,

        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 0,
        elevation: 5,
    },
    text: {
        marginHorizontal: 10,
        color:"white",
        fontSize:20,
    },
});

export default SideCategoryItem;
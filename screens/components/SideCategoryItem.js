import React from 'react';
import {View, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';
import MainProductItem from './MainProductItem';
import Colors from '../constants/Colors';
import Card from './Card';

const SideCategoryItem = props => {

    const productCount = () =>  {
        let productCountos = props.item.products.length;
        if(productCountos===0)
            return "No Product";
        else
            return "+ " + productCountos;
    };

    return(
        <Card
            onPress={() => {props.setCategoryPreviewed(props.item); } }
            style={styles.holder}>
            <Text style={styles.text}>{props.item.category}</Text>

            <View style={styles.countContainer}>
                <Text style={styles.countText}>{productCount()}</Text>
            </View>
        </Card>
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
        borderRadius: 7,
    },
    text: {
        marginHorizontal: 10,
        color:"white",
        fontSize:20,
    },
});

export default SideCategoryItem;

import React from 'react';
import {View, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';
import MainProductItem from './MainProductItem';


const MainCategoryItem = props => {

    const setProductPreviewed = item => {
        item.category = {key: props.item.key, name: props.item.category};
        props.setProductPreviewed(item);
    };

    return(
        <View style={{flex:1, }}>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.category}>{props.item.category}</Text>
                <TouchableOpacity
                    style={styles.addProductHolder}
                    onPress={() => {props.setNewItemPage(true); let nigger = props.item; nigger.nigger=true; props.setData(nigger); }}>
                    {props.addProductButton()}
                </TouchableOpacity>
            </View>

            <FlatList
                numColumns={2}
                style={styles.list}
                data={props.item.products}
                renderItem={singleProductData =>
                    <MainProductItem
                        setProductPreviewed={setProductPreviewed}
                        item={singleProductData.item}/>
                }/>
        </View>
    );
};

const styles = StyleSheet.create({
    addProductHolder: {
        justifyContent:'center',
        alignItems:'center',
    },
    category: {
        color:"black",
        fontSize:20,
    },
    list: {
        paddingBottom: 16,
    },
});

export default MainCategoryItem;

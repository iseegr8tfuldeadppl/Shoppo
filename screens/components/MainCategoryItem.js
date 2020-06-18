import React from 'react';
import {View, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';
import MainProductItem from './MainProductItem';

const MainCategoryItem = props => {

    return(
        <View style={{flex:1, }}>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.category}>{props.item.category}</Text>
                <TouchableOpacity
                    style={styles.addProductHolder}
                    onPress={() => {setNewItemPage(true); setData(props.item); }}>
                    {props.addProductButton()}
                </TouchableOpacity>
            </View>

            <FlatList
                numColumns={2}
                style={styles.list}
                data={props.item.products}
                renderItem={singleProductData =>
                    <MainProductItem
                        setProductPreviewed={props.setProductPreviewed}
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

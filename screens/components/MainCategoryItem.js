import React from 'react';
import {View, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';
import MainProductItem from './MainProductItem';


const MainCategoryItem = props => {

    const setProductPreviewed = item => {
        item.category = {key: props.item.key, name: props.item.category};
        props.setProductPreviewed(item);
    };

    const setCategoryPreviewed = () => {
        props.setCategoryPreviewed(props.item);
    };

    // this function to limit products to a maximum of 5 or else specified
    const products = () => {
        const max = 5;
        if(props.item.products.length<=max+1) return props.item.products;
        else {
            return [...props.item.products.subarray(0, max-1), ...props.item.products[max]];
        }
    };

    return(
        <View style={{...{ flex:1 }, ...props.style}}>
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
                data={products()}
                renderItem={singleProductData =>
                    <MainProductItem
                        setCategoryPreviewed={setCategoryPreviewed}
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

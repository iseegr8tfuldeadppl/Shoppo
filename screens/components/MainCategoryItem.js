import React from 'react';
import {View, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';
import MainProductItem from './MainProductItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';


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

    const openAddProductModal = () => {
        props.setNewItemPage(true); let nigger = props.item; nigger.nigger=true; props.setData(nigger);
    };

    const adminCategorySettings = () => {
        if(props.adminList.includes(props.uid))
            return(
                <>
                <TouchableOpacity onPress={() => {props.setCategorySettings(props.item);}}>
                    <MaterialCommunityIcons style={{marginStart: 5}} name={"settings"} color={Colors.Primary} size={25} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {openAddProductModal(); }}>
                    <MaterialCommunityIcons style={{marginStart: 5}}name={"plus-circle"} color={Colors.Primary} size={25} />
                </TouchableOpacity>
                </>
            );
    };

    // admin stuff function
    const invisibilityIndicator = () => {
        if(props.adminList.includes(props.uid))
            if(props.item.invisible)
                return(
                    <MaterialCommunityIcons style={{marginEnd: 7}} name="eye-off" color={"black"} size={25} />
                );
    };

    return(
        <View style={{...{ flex:1 }, ...props.style}}>
            <View style={{flexDirection:'row'}}>
                {invisibilityIndicator()}
                <Text style={styles.category}>{props.item.category}</Text>
                {adminCategorySettings()}
            </View>

            <FlatList
                numColumns={2}
                style={styles.list}
                data={products()}
                renderItem={singleProductData =>
                    <MainProductItem
                        adminList={props.adminList}
                        uid={props.uid}
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

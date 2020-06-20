import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import SideItem from './SideItem';


const CategoryPreview = props => {

    return(
        <FlatList
            style={styles.list}
            data={props.item.products}
            renderItem={productData =>
                <SideItem
                    setProductPreviewed={props.setProductPreviewed}
                    item={productData.item} />
            }/>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        paddingTop: 7 
    },
});

export default CategoryPreview;

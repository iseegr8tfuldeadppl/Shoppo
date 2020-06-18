import React from 'react';
import { View, FlatList } from 'react-native';
import SideItem from './SideItem';


const CategoryPreview = props => {

    return(
        <View style={{ flex: 1 }}>
            <FlatList
                style={{ flex: 1, paddingTop: 7 }}
                data={props.item.products}
                renderItem={productData =>
                    <SideItem
                        setProductPreviewed={props.setProductPreviewed}
                        item={productData.item} />
                }/>
        </View>
    );
};

export default CategoryPreview;

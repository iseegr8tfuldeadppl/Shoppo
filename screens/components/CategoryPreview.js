import React from 'react';
import { FlatList, StyleSheet, BackHandler } from 'react-native';
import SideItem from './SideItem';


const CategoryPreview = props => {

	BackHandler.addEventListener('hardwareBackPress', function() {
		if(props.productPreviewed)
			props.setProductPreviewed();
		else
            props.setCategoryPreviewed();
	    return true;
	});

    const data = () => {
        let products = props.item.products.slice();
        return products.splice(0, 1);
    };

    return(
        <FlatList
            style={styles.list}
            data={data()}
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

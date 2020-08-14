import React from 'react';
import { FlatList, StyleSheet, BackHandler } from 'react-native';
import SideItem from './SideItem';


const CategoryPreview = props => {

	BackHandler.addEventListener('hardwareBackPress', function() {
		if(props.productPreviewed){
			props.setProductPreviewed();
			return true;
		}
        props.setCategoryPreviewed();
	    return true;
	});

    const data = () => {

		// remove the showmore button
        let products = [];
		for(let i=0; i<props.item.products.length; i++){
			if(!props.item.products[i].showmore){
				products.push(props.item.products[i]);
			}
		}
        return products;
    };

    return(
        <FlatList
            style={styles.list}
            data={data()}
            renderItem={productData =>
                <SideItem
					language={props.language}
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

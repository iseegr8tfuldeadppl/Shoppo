import React from 'react';
import { FlatList, StyleSheet, BackHandler } from 'react-native';
import MainProductItem from './MainProductItem';


const CategoryPreview = props => {

	BackHandler.addEventListener('hardwareBackPress', function() {
		if(props.productPreviewed){
			props.setProductPreviewed();
			return true;
		}

        // if this preview was opened from search then take us back there
		if(props.item.iscategory!==undefined && props.setSearch)
			props.setSearch(true);

		// hide category
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

	const setProductPreviewed = item => {
		item.category = {key: props.item.key, name: props.item.category};
		props.setProductPreviewed(item);
	};

    const setCategoryPreviewed = () => {
        props.setCategoryPreviewed(props.item);
    };

    return(
        <FlatList
			numColumns={2}
            style={styles.list}
            data={data()}
            renderItem={productData =>

            <MainProductItem
                language={props.language}
                adminList={props.adminList}
                uid={props.uid}
                setCategoryPreviewed={setCategoryPreviewed}
                setProductPreviewed={setProductPreviewed}
                item={productData.item}/>
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

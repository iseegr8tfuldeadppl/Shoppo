// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import React, {useState} from 'react';
import { TouchableOpacity, StyleSheet, View, Text, SafeAreaView, FlatList, BackHandler } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerActions } from '@react-navigation/native';
import Header from '../components/Header';
import SideCategoryItem from '../components/SideCategoryItem';
import CategoryPreview from '../components/CategoryPreview';
import ProductPreviewModal from '../components/ProductPreviewModal';
import Taboo from '../components/Taboo';
import { categoriesString } from '../constants/strings';


const Categories = props => {

	BackHandler.addEventListener('hardwareBackPress', function() {
	    if(props.categoryPreviewed)
            props.setCategoryPreviewed();
	    return true;
	});

    const doubleTabPress = () => {
        if(props.productPreviewed){
            props.setProductPreviewed();
            return;
        }
        if(props.categoryPreviewed)
            props.setCategoryPreviewed();
    };


    const list = () => {
        return(
            <FlatList
        		style={styles.flatlist}
        		data={props.categories}
        		renderItem={categoryData =>
                    <SideCategoryItem
						language={props.language}
                        setCategoryPreviewed={props.setCategoryPreviewed}
                        item={categoryData.item}/>
        		}/>
        );
    };

    const categoryPreviewedTitle = () =>{
        if(props.categoryPreviewed)
            return props.categoryPreviewed.category;
        return "";
    };

    const title = () => {
        if(props.categoryPreviewed)
            return categoryPreviewedTitle();
        return categoriesString[props.language];
    };

    const page = () => {
        if(props.productPreviewed && props.navigation.isFocused())
            return(
			  	<ProductPreviewModal
				  	navigation={props.navigation}
				  	language={props.language}
				  	setRemoteOrdersOpen={props.setRemoteOrdersOpen}
				  	checkoutList={props.checkoutList}
				  	setCheckoutList={props.setCheckoutList}
				  	adminList={props.adminList}
				  	uid={props.uid}
				  	userInfo={props.userInfo}
				  	navigation={props.navigation}
				  	addToCart={props.addToCart}
				  	cart={props.cart}
				  	updateCart={props.updateCart}
				  	setProductPreviewed={props.setProductPreviewed}
				  	productPreviewed={props.productPreviewed}/>
            );

        if(props.categoryPreviewed)
            return(
                <>
                <Header style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
							if(props.categoryPreviewed){
								props.setCategoryPreviewed();
								return;
							}
							props.navigation.dispatch(DrawerActions.openDrawer());
						} }>
                        <MaterialCommunityIcons name={headerIcon()} color={"white"} size={30} />
                    </TouchableOpacity>
                    <View style={styles.headertitleholder}><Text style={styles.headertitle}>{title()}</Text></View>
                </Header>
                <CategoryPreview
					uid={props.uid}
                    adminList={props.adminList}
                    language={props.language}
                    setCategoryPreviewed={props.setCategoryPreviewed}
                    item={props.categoryPreviewed}
                    setProductPreviewed={props.setProductPreviewed}/>
                </>
            );

        return(
            <>
            <Header style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
						if(props.categoryPreviewed){
							props.setCategoryPreviewed();
							return;
						}
						props.navigation.dispatch(DrawerActions.openDrawer());
						} }>
                    <MaterialCommunityIcons name={headerIcon()} color={"white"} size={30} />
                </TouchableOpacity>
                <View style={styles.headertitleholder}><Text style={styles.headertitle}>{title()}</Text></View>
            </Header>
            {list()}
            </>
        );
    };

    const headerIcon = () => {
        if(props.categoryPreviewed)
            return "arrow-left";
        return "menu";
    };

  return (
    <SafeAreaView style={styles.holder}>
		{page()}
        <Taboo
			language={props.language}
			focus={categoriesString[props.language]}
			navigation={props.navigation}
			doubleTabPress={doubleTabPress}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
	header: {
		height: 70,
        paddingTop: 5,
	},
    headertitleholder: {
        justifyContent:"center",
        alignItems:"flex-start",
        flex: 1
    },
    headertitle: {
        textAlign:"center",
        fontSize: 23,
        color:"white",
        marginHorizontal: 11,
    },
	holder: {
		flex: 1
	},
	flatlist: {
		paddingHorizontal: 8,
		paddingTop:10,
		flex:1
	},
});
export default Categories;

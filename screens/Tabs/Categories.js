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


const Categories = props => {

    const [categoryPreviewed, setCategoryPreviewed] = useState();

    if(props.tabPressedWhileWereStillInThePage){
        setCategoryPreviewed();
    }

	BackHandler.addEventListener('hardwareBackPress', function() {
	    if(categoryPreviewed)
            setCategoryPreviewed();
	    return true;
	});

    const doubleTabPress = () => {
        if(props.productPreviewed){
            props.setProductPreviewed();
            return;
        }
        if(categoryPreviewed)
            setCategoryPreviewed();
    };

    const list = () => {
        return(
            <FlatList
        		style={{paddingHorizontal: 8, paddingTop:10, flex:1 }}
        		data={props.categories}
        		renderItem={categoryData =>
                    <SideCategoryItem
                        setCategoryPreviewed={setCategoryPreviewed}
                        item={categoryData.item}/>
        		}/>
        );
    };

    const categoryPreviewedTitle = () =>{
        if(categoryPreviewed)
            return categoryPreviewed.category;
        return "";
    };

    const title = () => {
        if(categoryPreviewed)
            return categoryPreviewedTitle();
        return "Categories";
    };

    const page = () => {
        if(props.productPreviewed && props.navigation.isFocused())
            return(
			  <ProductPreviewModal
				  navigation={props.navigation}
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
        else if(categoryPreviewed)
            return(
                <>
                <Header style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {if(categoryPreviewed) setCategoryPreviewed(); else props.navigation.dispatch(DrawerActions.openDrawer());} }>
                        <MaterialCommunityIcons name={headerIcon()} color={"white"} size={30} />
                    </TouchableOpacity>
                    <View style={styles.headertitleholder}><Text style={styles.headertitle}>{title()}</Text></View>
                </Header>
                <CategoryPreview
                    setCategoryPreviewed={setCategoryPreviewed}
                    item={categoryPreviewed}
                    setProductPreviewed={props.setProductPreviewed}/>
                </>
            );

        return(
            <>
            <Header style={styles.header}>
                <TouchableOpacity
                    onPress={() => {if(categoryPreviewed) setCategoryPreviewed(); else props.navigation.dispatch(DrawerActions.openDrawer());} }>
                    <MaterialCommunityIcons name={headerIcon()} color={"white"} size={30} />
                </TouchableOpacity>
                <View style={styles.headertitleholder}><Text style={styles.headertitle}>{title()}</Text></View>
            </Header>
            {list()}
            </>
        );
    };

    const headerIcon = () => {
        if(categoryPreviewed)
            return "arrow-left";
        return "menu";
    };

  return (
    <SafeAreaView style={{ flex: 1 }}>
		{page()}
        <Taboo focus={"Categories"} navigation={props.navigation} doubleTabPress={doubleTabPress}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
	header:{
		height: 90,
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
});
export default Categories;

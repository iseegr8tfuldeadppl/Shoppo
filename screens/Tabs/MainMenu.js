// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import React, {useState} from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator, BackHandler } from 'react-native';
import Colors from '../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerActions } from '@react-navigation/native';
import Card from '../components/Card';
import AddNewItemModal from '../components/Admins/AddNewItemModal';
import Header from '../components/Header';
import ProductPreviewModal from '../components/ProductPreviewModal';
import MainCategoryItem from '../components/MainCategoryItem';


const MainMenu = props => {

	BackHandler.addEventListener('hardwareBackPress', function() {
	    return true;
	});

  // Admin Stuff
  const [data, setData] = useState();
  const [NewItemPage, setNewItemPage] = useState(false);

    const addCategoryButton = () => {
      if(props.adminList.includes(props.uid)){
          return(<TouchableOpacity
    				style={styles.addCategory}
    				onPress={() => {setNewItemPage(true);}}>
    				<Text style={{color:"blue", fontSize:15}}>Add Category</Text>
    			</TouchableOpacity>);
      } else
          return(null);
    };

    const addProductButton = () => {
        if(props.adminList.includes(props.uid)){
            return(<Text style={{color:"blue", marginStart:5, fontSize:14}}>Add Product</Text>);
        } else
            return(null);
    };


  // show loader until we have checked firebase
  const loading = () => {
    if(props.finishedLoadingFromFirebase){
        return(null);
    }  else {
        return(<View style={{marginTop:20}}><ActivityIndicator color={Colors.Accent} size="large" /></View>);
    }
  };

  // this function is needed cz the modal's code only needs to be run if it's visible and in this case it is being run on launch of mainmenu
  const productPreviewModalVisibility = () => {
    if(props.productPreviewed){
        return(<ProductPreviewModal
            checkoutList={props.checkoutList}
            setCheckoutList={props.setCheckoutList}
            uid={props.uid}
		  	userInfo={props.userInfo}
            navigation={props.navigation}
            buyNow={props.buyNow}
            addToCart={props.addToCart}
            cart={props.cart}
            updateCart={props.updateCart}
            setProductPreviewed={props.setProductPreviewed}
            productPreviewed={props.productPreviewed}/>);
    } else return(null);
  };

  return (
    <SafeAreaView style={{ flex: 1}} forceInset={{ bottom: 'never' }}>

        <AddNewItemModal
          setData={setData}
          data={data}
          doIShowUp={NewItemPage}
          onCancel={() => {setNewItemPage(false);}} />

      {productPreviewModalVisibility()}

    	<Header style={{height: 90,}}>
            <TouchableOpacity
    			onPress={() => {props.navigation.dispatch(DrawerActions.openDrawer());} }>
    			<MaterialCommunityIcons name="menu" color={"white"} size={30} />
    		</TouchableOpacity>
    		<Card style={styles.searchHolder}>
    			<MaterialCommunityIcons name="magnify" color={"black"} size={20} />
    			<Text style={styles.searchText}>Search</Text>
    		</Card>
    	</Header>

    	{addCategoryButton()}
    	{loading()}

    	<FlatList
    		style={styles.list}
    		data={props.categories}
    		renderItem={categoryData =>
                <MainCategoryItem
                    setNewItemPage={setNewItemPage}
                    setData={setData}
                    setProductPreviewed={props.setProductPreviewed}
                    addProductButton={addProductButton}
                    item={categoryData.item}/>
    		}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
	list: {
		paddingHorizontal: 8,
		paddingTop:15
	},
	addCategory: {
		padding:10,
		width:"100%",
		justifyContent:'center',
		alignItems:'center'
	},
    searchHolder: {
		backgroundColor:"white",
        marginStart:10,
        paddingVertical: 10,
        flexDirection: 'row',
        flex:1,
		padding: 15,
    },
    searchText: {
		color:"black",
        textAlign:'center',
        fontSize:16,
        marginStart:10,
    },
});
export default MainMenu;

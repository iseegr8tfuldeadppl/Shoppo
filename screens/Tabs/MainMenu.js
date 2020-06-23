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
import CategoryPreview from '../components/CategoryPreview';


const MainMenu = props => {

  const [categoryPreviewed, setCategoryPreviewed] = useState();

	BackHandler.addEventListener('hardwareBackPress', function() {
		if(props.productPreviewed)
			props.setProductPreviewed();
		else if(categoryPreviewed){
			setCategoryPreviewed();
		}
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

  const categoryPreviewedTitle = () =>{
      if(categoryPreviewed)
          return categoryPreviewed.category;
      else
          return "";
  };

  const page = () => {
	  // category preview
	  if(props.productPreviewed){
		return(
		  	<SafeAreaView style={{ flex: 1}} forceInset={{ bottom: 'never' }}>
			  	<ProductPreviewModal
  	            	checkoutList={props.checkoutList}
  	            	setCheckoutList={props.setCheckoutList}
  					adminListt={props.adminList}
  	            	uid={props.uid}
  			  		userInfo={props.userInfo}
  	            	navigation={props.navigation}
  	            	buyNow={props.buyNow}
  	            	addToCart={props.addToCart}
  	            	cart={props.cart}
  	            	updateCart={props.updateCart}
  	            	setProductPreviewed={props.setProductPreviewed}
  	            	productPreviewed={props.productPreviewed}/>
			</SafeAreaView>
		);
	  } else if(categoryPreviewed){
		  return(
			  <SafeAreaView style={{ flex: 1}} forceInset={{ bottom: 'never' }}>
	              <Header style={styles.header}>
	                  <TouchableOpacity
	                      onPress={() => {setCategoryPreviewed();} }>
	                      <MaterialCommunityIcons name="arrow-left" color={"white"} size={30} />
	                  </TouchableOpacity>
	                  <View style={styles.headertitleholder}><Text style={styles.headertitle}>{categoryPreviewedTitle()}</Text></View>
	              </Header>
	              <CategoryPreview
				  	setCategoryPreviewed={setCategoryPreviewed}
	                  item={categoryPreviewed}
	                  setProductPreviewed={props.setProductPreviewed}/>
			  </SafeAreaView>
		  );
	  } else {

		  // main page
		  return(
			  <SafeAreaView style={{ flex: 1}} forceInset={{ bottom: 'never' }}>

		          <AddNewItemModal
		            setData={setData}
		  		  categories={props.categories}
		            data={data}
		            doIShowUp={NewItemPage}
		            onCancel={() => {setNewItemPage(false); setData();}} />

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
						  	style={styles.mainCategoryItem}
		  					setCategoryPreviewed={setCategoryPreviewed}
		                      setNewItemPage={setNewItemPage}
		                      setData={setData}
		                      setProductPreviewed={props.setProductPreviewed}
		                      addProductButton={addProductButton}
		                      item={categoryData.item}/>
		      		}/>
		      </SafeAreaView>
		  );
	  }
  };

  return (
    	page()
  );
}

const styles = StyleSheet.create({
	mainCategoryItem: {
		paddingBottom: 10,
	},
	list: {
		paddingHorizontal: 8,
		paddingTop:15,
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
export default MainMenu;

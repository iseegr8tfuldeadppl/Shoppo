// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import React, {useState} from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import Header from '../components/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerActions } from '@react-navigation/native';
import Card from '../components/Card';
import AddNewItemModal from '../components/Admins/AddNewItemModal';
import ProductPreviewModal from '../components/ProductPreviewModal';
import MainCategoryItem from '../components/MainCategoryItem';


const MainMenu = props => {

  // Admin Stuff
  const [data, setData] = useState();
  const [NewItemPage, setNewItemPage] = useState(false);

    const addCategoryButton = () => {
      if(props.adminList.includes(props.uid)){
          return(<TouchableOpacity
      							style={{padding:10, width:"100%", justifyContent:'center', alignItems:'center'}}
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
    		<Card style={styles.customCard}>
    			<MaterialCommunityIcons name="magnify" color={"black"} size={20} />
    			<Text style={styles.searchText}>Search</Text>
    		</Card>
    	</Header>

    	{addCategoryButton()}
    	{loading()}

    	<FlatList
    		style={{paddingHorizontal: 8, paddingTop:5 }}
    		data={props.categories}
    		renderItem={categoryData =>
                <MainCategoryItem
                    setProductPreviewed={props.setProductPreviewed}
                    addProductButton={addProductButton}
                    item={categoryData.item}/>
    		}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    customCard: {
        marginStart:10,
        paddingVertical: 10,
        flexDirection: 'row',
        flex:1,
        color: 'white',
        fontSize: 18,
    },
    searchText: {
        textAlign:'center',
        fontSize:16,
        marginStart:10,
    },
});
export default MainMenu;

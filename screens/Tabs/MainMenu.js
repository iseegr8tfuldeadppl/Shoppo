// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import React, {useState} from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Colors from '../constants/colors';
import Header from '../components/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerActions } from '@react-navigation/native';
import Card from '../components/Card';
import AddNewItemModal from '../components/AddNewItemModal';
import firebase from 'firebase';

import TextStroke from '../components/TextStroke';
import {Dimensions} from "react-native";

const {width, height} = Dimensions.get("window");

const MainMenu = props => {
  const [categories, setCategories] = useState([]);
  const [NewItemPage, setNewItemPage] = useState(false);
  const [NewItem, setNewItem] = useState();
  const [finishedLoadingFromFirebase, setFinishedLoadingFromFirebase] = useState(false);
  
  const pokeFirebase = () => {
	
	firebase.database().ref('/categories').on('value', querySnapShot => {
		let data = querySnapShot.val() ? querySnapShot.val() : {};
		let cateogoriesSnapshot = {...data};
		let categoriesList = [];
		let KeysOfCategories = Object.keys(cateogoriesSnapshot);
		for(var i=0; i<KeysOfCategories.length; i++){
			let productList = [];
			let productsInCategory = Object.values(cateogoriesSnapshot)[i].products;
			if(productsInCategory){
				let KeysOfproductsInCategory = Object.keys(productsInCategory);
				productsInCategory = Object.values(productsInCategory);
				for(var j=0; j<KeysOfproductsInCategory.length; j++){
					productList.push({ key: KeysOfproductsInCategory[j], name: productsInCategory[j].name });
				}
			}
			
			let nameOfCategory = Object.values(cateogoriesSnapshot)[i].name;
			categoriesList.push({ key: KeysOfCategories[i], category: nameOfCategory, products: productList });
		}
		if(categoriesList.length>0)
			setCategories(categoriesList);
		if(!finishedLoadingFromFirebase){
			setFinishedLoadingFromFirebase(true);
		}
    });

  };

  if(categories.length===0){
	  pokeFirebase();
  }
  
  const AddNewItem = (name, isProduct) => {
	if(isProduct){
		firebase.database()
			.ref('/categories/' + NewItem.key + "/products")
			.push({
				name: name,
			})
			.then(function(snapshot) {
				setNewItem();
				setAddNewProduct(false);
				console.log('Snapshot', snapshot);
			});
	} else {
		firebase.database()
			.ref('/categories/')
			.push({
				name: name,
			})
			.then(function(snapshot) {
				setNewItem();
				setNewItemPage(false);
				console.log('Snapshot', snapshot);
			});
	}

  };

  
  let addModal;
  let addProductButton;
  let addCategoryButton;
  if("hv9C4ao07LgbWkNdu4R6INn3JpK2" === props.uid){
	  if(NewItemPage){
  		  addModal = <AddNewItemModal 
						data={NewItem} 
						doIShowUp={NewItemPage} 
						onAdd={AddNewItem} 
						onCancel={() => {setNewItemPage(false);}} />;
	  } else {
		addModal = null;
	  }

		  
	addProductButton = <Text style={{color:"blue", marginStart:5, fontSize:12}}>Add Product</Text>;
	addCategoryButton = <TouchableOpacity 
							style={{padding:10, width:"100%", justifyContent:'center', alignItems:'center'}}
							onPress={() => {setNewItemPage(true);}}>
							<Text style={{color:"blue", fontSize:15}}>Add Category</Text>
						</TouchableOpacity>
  }

  // show loader until we have checked firebase
  let loading;
  if(!finishedLoadingFromFirebase){
  	  loading = <ActivityIndicator />;
  }


  return (
    <SafeAreaView style={{ flex: 1}} forceInset={{ bottom: 'never' }}>
	<Header>
        <TouchableOpacity
			onPress={() => {props.navigation.dispatch(DrawerActions.openDrawer());} }>
			<MaterialCommunityIcons name="menu" color={"white"} size={30} />
		</TouchableOpacity>
		<Card style={{
			marginStart:10,
			paddingVertical: 10,
			flexDirection: 'row',
			flex:1,
			color: 'white',
			fontSize: 18, }}>
			<MaterialCommunityIcons name="magnify" color={"black"} size={20} />
			<Text style={{textAlign:'center', fontSize:16, marginStart:10,}}>Search</Text>
		</Card>
	</Header>
		{addCategoryButton}
		{addModal}
		{loading}
		<FlatList 
			style={{paddingHorizontal: 8, paddingTop:5}}
			data={categories} 
			renderItem={categoryData => 
				<View>

					<View style={{flexDirection:'row'}}>
						<Text style={{color:"black", fontSize:20}}>{categoryData.item.category}</Text>
						<TouchableOpacity 
							style={{justifyContent:'center', alignItems:'center'}}
							onPress={() => {setNewItemPage(true); setNewItem(categoryData.item); }}>
							{addProductButton}
						</TouchableOpacity>
					</View> 

					<FlatList 
						numColumns={2}
						style={{paddingBottom:16}}
						data={categoryData.item.products} 
						renderItem={singleProductData => 
						<TouchableOpacity 
							activeOpacity={.7}
							style={{
								justifyContent:'center', marginTop:7,marginHorizontal:7,
								alignItems:'center', 
								flex:0.5,
								height:100, 
								borderRadius:25,
								shadowColor: 'black',
								shadowOffset: { width: 0, height: 2},
								shadowOpacity: 0.26,
								shadowRadius: 0,
								backgroundColor: 'white',
								elevation: 5,}}
							onPress={() => {}}>
							<Image 
								style={{width:"100%", height:"100%", borderRadius:25}}
								source={{
									uri:'https://i.imgur.com/wd9Yt30.jpg', }} />
							<View style={{position:'absolute'}}>
								<TextStroke stroke={ 1 } color={ '#000000' } >
									<Text style={ {
									fontSize: 21,
									color: '#FFFFFF'
									} }>{singleProductData.item.name}</Text>
								</TextStroke>
							</View>
						</TouchableOpacity>
						}
					/>

				</View>
			}
		/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});
export default MainMenu;
// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import React, {useState} from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import Header from '../components/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerActions } from '@react-navigation/native';
import Card from '../components/Card';
import AddNewItemModal from '../components/Admins/AddNewItemModal';
import ProductPreviewModal from '../components/ProductPreviewModal';
import {Dimensions} from "react-native";

const {width, height} = Dimensions.get("window");

const MainMenu = props => {
  
  // Admin Stuff
  const [data, setData] = useState();
  const [NewItemPage, setNewItemPage] = useState(false);

  
  let addModal;
  let addProductButton;
  let addCategoryButton;
  if(props.adminList.includes(props.uid)){
	  if(NewItemPage){
  		  addModal = <AddNewItemModal 
						setData={setData} 
						data={data} 
						doIShowUp={NewItemPage} 
						onCancel={() => {setNewItemPage(false);}} />;
	  } else {
		addModal = null;
	  }

		  
	addProductButton = <Text style={{color:"blue", marginStart:5, fontSize:14}}>Add Product</Text>;
	addCategoryButton = <TouchableOpacity 
							style={{padding:10, width:"100%", justifyContent:'center', alignItems:'center'}}
							onPress={() => {setNewItemPage(true);}}>
							<Text style={{color:"blue", fontSize:15}}>Add Category</Text>
						</TouchableOpacity>
  }

  // show loader until we have checked firebase
  let loading;
  if(!props.finishedLoadingFromFirebase){
  	  loading = <View style={{marginTop:20}}><ActivityIndicator color={Colors.Accent} size="large" /></View>;
  }

  // productPreviewModal ---------------------------------------------------------------------------------------------------
  let productPreviewModal;
  if(props.productPreviewed){
	productPreviewModal = 
		<ProductPreviewModal 
			navigation={props.navigation}
			buyNow={props.buyNow}
			addToCart={props.addToCart}
			cart={props.cart}
			updateCart={props.updateCart}
			setProductPreviewed={props.setProductPreviewed}
			productPreviewed={props.productPreviewed}/>;
  }


  return (
    <SafeAreaView style={{ flex: 1}} forceInset={{ bottom: 'never' }}>
	<Header style={{height: 90,}}>
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
	{productPreviewModal}
	{addModal}
	{loading}
	<FlatList 
		style={{
			paddingHorizontal: 8, 
			paddingTop:5
		}}
		data={props.categories} 
		renderItem={categoryData => 
		<View>

			<View style={{flexDirection:'row'}}>
				<Text style={{color:"black", fontSize:20}}>{categoryData.item.category}</Text>
				<TouchableOpacity 
					style={{justifyContent:'center', alignItems:'center'}}
					onPress={() => {setNewItemPage(true); setData(categoryData.item); }}>
					{addProductButton}
				</TouchableOpacity>
			</View> 

			<FlatList 
				numColumns={2}
				style={{
					paddingBottom:16
				}}
				data={categoryData.item.products} 
				renderItem={singleProductData => 
				<TouchableOpacity 
					onPress={() => {props.setProductPreviewed(singleProductData.item);}}
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
						backgroundColor: Colors.Primary,
						elevation: 5,
					}}>

					<Image 
						style={{width:"100%", height:"100%", borderRadius:25}}
						source={{
							uri:singleProductData.item.data.banner, 
						}} />

					<View style={{position:'absolute', alignItems:"center", }}>
						<View style={{flexDirection:'row'}}>
							<Text  numberOfLines={2} ellipsizeMode='tail' 
								style={{
									flexWrap: 'wrap',
									backgroundColor: Colors.TransBlack,
									fontSize: 15,
									color: '#FFFFFF'}}>
								{singleProductData.item.data.title}</Text>
						</View>
						<View style={{flexDirection:'row', marginTop:3, }}>
							<Text 
								style={{ 
									flexWrap: 'wrap',
									backgroundColor: Colors.TransBlack,
									fontSize: 17,
									color: '#FFFFFF'
								}}>
								{singleProductData.item.data.cost} DA</Text>
						</View>
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
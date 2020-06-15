// React Native Bottom Navigation - Example using React Navigation V5 //
// https://aboutreact.com/react-native-bottom-navigation //
import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Image, CheckBox } from 'react-native';
import Header from '../components/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';

const Cart = props => {

	const update = key => {
	
		let cartCopy = props.cart.slice();
		for(let i=0; i<cartCopy.length; i++){
			if(cartCopy[i].key===key){
				cartCopy[i].selected_in_cart = ! cartCopy[i].selected_in_cart;
				break;
			}
		}
		props.updateCart(cartCopy);
	};

	return (
	<SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'never' }}>
	
		<Header style={{height: 90,}}>
			<TouchableOpacity
				onPress={() => {props.navigation.dispatch(DrawerActions.openDrawer());} }>
				<MaterialCommunityIcons name="menu" color={"white"} size={30} />
			</TouchableOpacity>
		</Header>

		<FlatList 
			data={props.cart} 
			renderItem={singleProductData => 
			<TouchableOpacity 
				onPress={() => {}}
				activeOpacity={.7}
				style={{
					width:"100%",
					paddingVertical:10,
					paddingHorizontal:5,
				}}>
				<View 
					style={{
						alignItems:"center", 
						flexDirection:"row", 
						flex:1,
					}}>
					<CheckBox
						value={singleProductData.item.selected_in_cart}
						onValueChange={() => {
							update(singleProductData.item.key);
						}}
						style={{alignSelf: "center"}}
					/>
					<Image 
						style={{
							width:100, 
							height:50, 
							borderRadius:1,
							marginStart:5,
						}}
						source={{
							uri:singleProductData.item.data.banner, 
						}} />
					<Text 
						numberOfLines={1} 
						ellipsizeMode='tail'
						style={{
							marginStart: 10, 
							fontSize: 14,
						}}>
						{singleProductData.item.data.title}</Text>
				</View>
			</TouchableOpacity>

			}
		/>
	</SafeAreaView>
	);
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
export default Cart;
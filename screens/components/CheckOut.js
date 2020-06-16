import React, {useState} from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, FlatList, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import Colors from '../constants/Colors';

const CheckOut = props => {
	
	const calculateTotal = () => {
		let total = 0.00;

		if(props.checkoutList)
			for(let i=0; i<props.checkoutList.length; i++){
				if(props.checkoutList)
					total += parseFloat(calculateTotalForThisProduct(props.checkoutList[i]));;
			}

		return Math.round(total).toString();
	};

	const calculateTotalForThisProduct = item => {
		return (parseFloat(item.data.cost) * parseFloat(item.quantity)).toString();
	};

	const cleanCart = () => {
		let cartCopy = props.cart.slice();
		let clean = false;
		while(!clean){
			clean = true;
			for(let i=0; i<cartCopy.length; i++){
				for(let j=0; j<props.checkoutList.length; j++){
					if(cartCopy[i].key===props.checkoutList[j].key && cartCopy[i].quantity===props.checkoutList[j].quantity){
						cartCopy.splice(i, 1);
						clean = false;
						break;
					}
				}
				if(!clean)
					break;
			}
		}

		props.updateCart(cartCopy);
	};

	const Buy = () => {

		cleanCart();
		props.setCheckoutList();
	};

	return(
		<Modal visible={props.checkoutList!==undefined} animationType="slide">
			<Header style={{paddingTop:18, paddingBottom:12, }}>
				<TouchableOpacity
					onPress={() => {props.setCheckoutList();} }>
					<MaterialCommunityIcons name="arrow-left" color={"white"} size={30} />
				</TouchableOpacity>
			</Header>

			<Text style={{ fontSize:29, paddingHorizontal: 15, paddingTop:10, paddingBottom: 11, }}>Confirm Purchase</Text>

			<FlatList 
				data={props.checkoutList} 
				renderItem={singleProductData => 
					<View 
						style={{
							paddingHorizontal: 10,
							paddingTop: 15, 
							alignItems:"center", 
							flexDirection:"row", 
						}}>
						<Image 
							style={{
								width:100, 
								height:50, 
								borderRadius:1,
							}}
							source={{
								uri:singleProductData.item.data.banner, 
							}} />

						<Text 
							numberOfLines={1} 
							ellipsizeMode='tail'
							style={{
								flex: 1,
								marginStart: 10, 
								fontSize: 14,
							}}>
							{singleProductData.item.data.title}</Text>

						<View 
							style={{
								backgroundColor: Colors.Accent, 
								padding:10, 
								borderRadius:5,
							}}>
							<Text style={{color:"white", }}>Quantity: {singleProductData.item.quantity}</Text>
							<Text style={{color:"white", }}>Cost: {calculateTotalForThisProduct(singleProductData.item)} DA</Text>
						</View>
					</View>
				}
			/>
			
			<View style={{ width:"100%", paddingBottom:8, paddingHorizontal:20, }}>
				<View style={{flexDirection:"row", justifyContent:"center", alignItems:"center", }}>
					<Text style={{flex:1, textAlign:"right", fontSize:19, paddingHorizontal:30}}>Total: {calculateTotal()} DA</Text>
			
					<TouchableOpacity 
						onPress={Buy}
						style={{
							backgroundColor: Colors.Accent, 
							padding:10, 
							borderRadius:5,
						}}>
						<Text style={{ color:"white", paddingHorizontal:10, paddingVertical:1, fontSize: 15}}>Confirm</Text>
					</TouchableOpacity>
				</View>
			</View>


		</Modal>
	);
};

export default CheckOut;


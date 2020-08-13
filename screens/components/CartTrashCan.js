import React from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { areYouSureString, removeCartItemConfirmString, noString, yesString } from '../constants/strings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CartTrashCan = props => {


	const deleteSelectedOnes = () => {

		let cartCopy = props.cart.slice();
		let allClean = false;
		while(!allClean){
			allClean = true;
			for(let i=0; i<cartCopy.length; i++){
				if(cartCopy[i].selected_in_cart){
					allClean = false;
					cartCopy.splice(i, 1);
					break;
				}
			}
		}

		props.updateCart(cartCopy);
	};

	const deleteSelectedOnesConfirmation = () =>{
		Alert.alert(
			areYouSureString[props.language],
			removeCartItemConfirmString[props.language],
			[
				{text: noString[props.language], style: 'cancel'},
				{text: yesString[props.language], style: 'destructive',
					onPress: deleteSelectedOnes
				}
			],
			{ cancelable: true }
		);
	};


	for(let i=0; i<props.cart.length; i++){
		if(props.cart[i].selected_in_cart){

			return (
				<TouchableOpacity
					onPress={deleteSelectedOnesConfirmation}>
					<MaterialCommunityIcons name="trash-can-outline" color={"red"} size={34} />
				</TouchableOpacity>
			);

			return;
		}
	}

	return (null);

};

export default CartTrashCan;

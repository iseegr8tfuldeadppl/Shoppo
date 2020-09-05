import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from '@react-native-community/checkbox';
import Colors from '../constants/Colors';
import { selectAllString } from '../constants/strings';


const SelectAllBar = props => {

	const areTheyAllSelected = () => {
		for(let i=0; i<props.cart.length; i++){
			if(!props.cart[i].selected_in_cart){
				return false;
			}
		}

		return true;
	};

	const toggleAllSelected = () => {

		let allSelectedInverse = !areTheyAllSelected();

		let cartCopy = props.cart.slice();
		for(let i=0; i<props.cart.length; i++){
			props.cart[i].selected_in_cart = allSelectedInverse;
		}

		props.updateCart(cartCopy);
		props.setAllSelected(allSelectedInverse);
	};


	const toggleSelectAll = () => {

		let cartCopy = props.cart.slice();
		for(let i=0; i<cartCopy.length; i++){
			cartCopy[i].selected_in_cart = ! selectAll;
		}
		props.updateCart(cartCopy);
		setSelectAll(!selectAll);
	};

	if(props.cart.length==0)
		return(<></>);
	return(
		<View style={styles.holder}>
			<CheckBox
				value={props.allSelected}
				onValueChange={toggleAllSelected}
			/>
			<Text style={styles.text}>{selectAllString[props.language]}</Text>
		</View>
	);

};

const styles = StyleSheet.create({
	holder: {
		width:"100%",
		flexDirection:"row",
		alignItems:"center",
		backgroundColor:Colors.Primary,
		paddingHorizontal:5,
		paddingVertical:10,
	},
	text: {
		flex:1,
		paddingHorizontal:20,
		fontSize:15,
		color:"white",
	}
});

export default SelectAllBar;

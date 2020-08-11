import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, CheckBox, TextInput} from 'react-native';
import Colors from '../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SelectAllBar from './SelectAllBar';


const CartItem = props => {

	const areTheyAllSelected = () => {
		for(let i=0; i<props.cart.length; i++){
			if(!props.cart[i].selected_in_cart){
				return false;
			}
		}

		return true;
	};

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

	const IsOriginallyCurrency = originaltype => {
		return originaltype==="currency" || originaltype==="account-charging";
	};

	const updateQuantity = (key, quantity, update_original) => {
		let cartCopy = props.cart.slice();
		for(let i=0; i<cartCopy.length; i++){
			if(cartCopy[i].key===key){
				cartCopy[i].quantity = quantity;
				if(update_original)
					cartCopy[i].original_quantity = quantity;
				props.updateCart(cartCopy);
				return;
			}
		}
	};

	const cleanQuantity = (operand, enteredText, update_original) => {
		if(!IsOriginallyCurrency(operand.data.originaltype)){
			enteredText = enteredText.replace(",", "");
			enteredText = enteredText.replace(".", "");
		}
		enteredText = enteredText.replace(",", ".");
		enteredText = enteredText.replace("-", "");
		enteredText = enteredText.replace(/\s/g, "");

		updateQuantity(operand.key, enteredText, update_original);
	};

	const textInput = operand =>{
		if(IsOriginallyCurrency(operand.data.originaltype)){
			return(
				<TextInput
					maxLength={10}
					style={styles.quantityInputCurrency}
					blurOnSubmit
					autoCapitalize="none"
					autoCorrect={false}
					keyboardType="number-pad"
					onChangeText={ (enteredText) => {cleanQuantity(operand, enteredText, false);}}
					value={operand.quantity} />
			);
		} else {
			return(
				<TextInput
					maxLength={10}
					style={styles.quantityInput}
					blurOnSubmit
					autoCapitalize="none"
					autoCorrect={false}
					keyboardType="number-pad"
					onChangeText={ (enteredText) => {cleanQuantity(operand, enteredText, false);} }
					value={operand.quantity} />
			);
		}
	};

	const display_quantity = (operand) => {
		return(
			<View style={styles.quantityHolder}>
				<TouchableOpacity
					onPress={() => {
						if(parseFloat(operand.quantity)>1) {
							if(IsOriginallyCurrency(operand.data.originaltype))
								cleanQuantity(operand, (parseFloat(operand.quantity)-1).toFixed(2).toString(), true);
							else
								cleanQuantity(operand, Math.round(parseFloat(operand.quantity)-1).toString(), true);
						}
					}}
					style={styles.quantitychanger}>
					<MaterialCommunityIcons name="minus" color={"white"} size={23} />
				</TouchableOpacity>
				<View style={styles.centerer}>
					{textInput(operand)}
				</View>
				<TouchableOpacity
					onPress={() => {
						if(IsOriginallyCurrency(operand.data.originaltype))
							cleanQuantity(operand, (parseFloat(operand.quantity)+1).toFixed(2).toString(), true);
						else
							cleanQuantity(operand, Math.round(parseFloat(operand.quantity)+1).toString(), true);
					}}
					style={styles.quantitychanger}>
					<MaterialCommunityIcons name="plus" color={"white"} size={23} />
				</TouchableOpacity>
			</View>
		);
	};


	return(
		<View
			style={styles.holder}>
			<View
				style={styles.horizontal}>
				<CheckBox
					value={props.item.selected_in_cart}
					onValueChange={() => {
						update(props.item.key);
						props.setAllSelected(areTheyAllSelected());
					}} />
				<TouchableOpacity onPress={() => {props.setProductPreviewed(props.item);}}>
					<View
						style={styles.horizontal}>
						<Image
							style={styles.image}
							source={{ uri:props.item.data.banner }} />
						<Text
							numberOfLines={1}
							ellipsizeMode='tail'
							style={styles.title}>
							{props.item.data.title}</Text>
					</View>
				</TouchableOpacity>

			</View>

			{display_quantity(props.item)}
		</View>
	);
};

const styles = StyleSheet.create({
	centerer: {
		alignItems:'center',
		justifyContent:'center',
	},
	quantitychanger: {
		width:35,
		height:35,
		borderRadius:50,
		backgroundColor:Colors.Primary,
		alignItems:'center',
		justifyContent:'center',
	},
	quantityHolder: {
		flexDirection:'row',
		justifyContent:"flex-end",
		marginHorizontal:19,
		marginTop:-10,
		alignItems:"center",
	},
	quantityInputCurrency : {
		borderColor:Colors.Primary,
		borderRadius: 10,

		paddingVertical: 3,
		fontWeight: "bold",
		paddingHorizontal: 8,
		borderWidth: 1,
		fontSize:16,
		textAlign:'center',
		marginHorizontal: 5,
	},
	holder: {
		width:"100%",
		paddingTop:15,
		paddingHorizontal:5,
		flex:1,
	},
	horizontal: {
		alignItems:"center",
		flexDirection:"row",
	},
	title: {
		marginStart: 10,
		fontSize: 14,
	},
	image: {
		width:100,
		height:50,
		borderRadius:1,
		marginStart:5,
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#DDDDDD',
		padding: 10,
		width: 300,
		marginTop: 16,
	},
	quantityInput : {
		borderColor:Colors.Primary,
		fontSize:16,
		minWidth:30,
		textAlign:'center',
		marginHorizontal: 5,
	},
});

export default CartItem;
